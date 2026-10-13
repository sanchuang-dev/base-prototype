#!/usr/bin/env python3
"""Assemble explicit public static demo files from independent repository branches.

Source-of-truth: demos.json. No cross-project merge or secondary publishing repo.
"""
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path, PurePosixPath
import re
import subprocess

SITE = Path("_site")
MANIFEST = Path("demos.json")
BRANCH_RE = re.compile(r"[A-Za-z0-9][A-Za-z0-9/_-]*\Z")
SLUG_RE = re.compile(r"[a-z0-9]+(?:-[a-z0-9]+)*\Z")


def run(*args):
    return subprocess.check_output(args, stderr=subprocess.STDOUT)


def safe_path(value, *, directory=False):
    if not isinstance(value, str) or not value or "\\" in value:
        raise ValueError(f"invalid path: {value!r}")
    stripped = value[:-1] if directory and value.endswith("/") else value
    parts = PurePosixPath(stripped).parts
    if not parts or any(p in ("", ".", "..") for p in parts) or stripped.startswith("/"):
        raise ValueError(f"unsafe path: {value!r}")
    return stripped


class LocalAssets(HTMLParser):
    def __init__(self):
        super().__init__()
        self.references = []

    def handle_starttag(self, tag, attrs):
        for key, val in attrs:
            if key not in ("src", "href") or not val:
                continue
            if val.startswith(("http:", "https:", "//", "#", "data:", "mailto:", "tel:")):
                continue
            self.references.append(val.split("#", 1)[0].split("?", 1)[0])


def main():
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    if data.get("schema_version") != 1 or not isinstance(data.get("demos"), list):
        raise ValueError("unsupported demos.json schema")
    if not (SITE / "index.html").is_file():
        raise ValueError("portal index must be rendered before assembling demos")
    original_root_hash = hashlib.sha256((SITE / "index.html").read_bytes()).hexdigest()
    seen = set()

    for demo in data["demos"]:
        demo_id, branch, target = demo["id"], demo["branch"], demo["publish_path"]
        if not SLUG_RE.fullmatch(demo_id) or target != demo_id or target in seen:
            raise ValueError(f"invalid/duplicate publish path: {target}")
        seen.add(target)
        if not BRANCH_RE.fullmatch(branch) or ".." in branch or "//" in branch:
            raise ValueError(f"unsafe branch: {branch}")
        if demo.get("builder") == "legacy-community":
            if demo_id != "local-life" or branch != "demo/local-life":
                raise ValueError("unsupported legacy builder mapping")
            published = SITE / target / "index.html"
            if not published.is_file():
                raise ValueError("local-life must be built before static staging")
            digest = hashlib.sha256(published.read_bytes()).hexdigest()
            if digest != demo["expected_sha256"]:
                raise ValueError("local-life content is not the verified release")
            print(f"demo={demo_id} existing-built sha256={digest} path=/{target}/")
            continue
        if "builder" in demo:
            raise ValueError("unknown demo builder")
        source = demo.get("source_dir", ".")
        if source != ".":
            source = safe_path(source)
        includes = demo["include"]
        if not isinstance(includes, list) or not includes:
            raise ValueError(f"empty include list: {demo_id}")
        # Only the named source branch is fetched; its business files never merge into main.
        run("git", "fetch", "--no-tags", "--depth=1", "origin", "refs/heads/" + branch)
        rev = run("git", "rev-parse", "FETCH_HEAD").decode().strip()
        records = run("git", "ls-tree", "-rz", rev).split(b"\x00")
        all_files = {}
        for record in filter(None, records):
            meta, name = record.split(b"\t", 1)
            mode, objtype, _sha = meta.decode().split()
            if objtype == "blob":
                all_files[name.decode()] = mode

        selected = {}
        for item in includes:
            is_dir = isinstance(item, str) and item.endswith("/")
            rule = safe_path(item, directory=is_dir)
            file_prefix = "" if source == "." else source + "/"
            source_rule = file_prefix + rule
            if is_dir:
                source_rule += "/"
            matches = ([f for f in all_files if f.startswith(source_rule)] if is_dir
                       else ([source_rule] if source_rule in all_files else []))
            if not matches:
                raise ValueError(f"{demo_id}: missing included source: {item}")
            for filename in matches:
                rel = filename[len(file_prefix):]
                if all_files[filename] not in ("100644", "100755"):
                    raise ValueError(f"{demo_id}: symlink or unsupported file: {filename}")
                selected[filename] = rel

        if "index.html" not in selected.values():
            raise ValueError(f"{demo_id}: index.html must be explicitly included")

        dst = SITE / target
        dst.mkdir(parents=True, exist_ok=False)
        for source_file, relative_file in selected.items():
            path = dst / relative_file
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(run("git", "show", rev + ":" + source_file))

        parser = LocalAssets()
        parser.feed((dst / "index.html").read_text(encoding="utf-8"))
        for rel in parser.references:
            rel = rel[2:] if rel.startswith("./") else rel
            rel = safe_path(rel)
            if not (dst / rel).is_file():
                raise ValueError(f"{demo_id}: unresolved local HTML asset: {rel}")
        for js in dst.rglob("*.js"):
            run("node", "--check", str(js))
        print(f"demo={demo_id} branch={branch} rev={rev} files={len(selected)} path=/{target}/")

    if original_root_hash != hashlib.sha256((SITE / "index.html").read_bytes()).hexdigest():
        raise ValueError("portal index was unexpectedly modified")
    print(f"root portal preserved: sha256={original_root_hash}")


if __name__ == "__main__":
    main()
