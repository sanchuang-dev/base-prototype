#!/usr/bin/env python3
"""Render unlisted, project-specific proposal covers from the existing demo registry.

These are public static URLs, not access control. No client identities or credentials.
"""
from html import escape
import json
from pathlib import Path
import re

ROOT = Path("_site")
TEMPLATE = Path("portal/invitation.html")
MANIFEST = Path("demos.json")
SLUG = re.compile(r"[a-z0-9]+(?:-[a-z0-9]+)*\Z")
SYMBOLS = {"local": "邻", "botanical": "艾"}


def main():
    source = json.loads(MANIFEST.read_text(encoding="utf-8"))
    if source.get("schema_version") != 1 or not isinstance(source.get("demos"), list):
        raise SystemExit("Unsupported demo manifest")
    template = TEMPLATE.read_text(encoding="utf-8")
    if 'name="robots" content="noindex,nofollow,noarchive"' not in template:
        raise SystemExit("Proposal covers should discourage search indexing")
    public_index = (ROOT / "index.html").read_text(encoding="utf-8")
    if "/proposal/" in public_index:
        raise SystemExit("Proposal invitation paths must not be listed on the public lobby")

    projects = source["demos"]
    for index, demo in enumerate(projects, 1):
        slug = demo["publish_path"]
        if not isinstance(slug, str) or not SLUG.fullmatch(slug) or slug == "proposal":
            raise SystemExit(f"Unsafe invitation slug: {slug!r}")
        if not (ROOT / slug / "index.html").is_file():
            raise SystemExit(f"Demo must exist before invitation is rendered: {slug}")
        theme = demo["theme"]
        if theme not in SYMBOLS:
            raise SystemExit(f"Unknown invitation theme for {slug}: {theme}")
        features = demo.get("features", [])
        if not isinstance(features, list) or not features or not all(
            isinstance(value, str) for value in features
        ):
            raise SystemExit(f"Invalid demo features: {slug}")

        slots = {
            "<!--THEME-->": theme,
            "<!--TITLE-->": escape(demo["title"], quote=True),
            "<!--SUMMARY-->": escape(demo["summary"], quote=True),
            "<!--FEATURES-->": "".join(
                f'<span class="pill">{escape(value, quote=True)}</span>'
                for value in features
            ),
            "<!--PATH-->": slug,
            "<!--SYMBOL-->": SYMBOLS[theme],
            "<!--NUMBER-->": f"{index:02d}",
        }
        page = template
        for marker, value in slots.items():
            if marker not in page:
                raise SystemExit(f"Missing invitation template marker: {marker}")
            page = page.replace(marker, value)
        if "<!--" in page:
            raise SystemExit(f"Unresolved invitation template placeholder: {slug}")

        output = ROOT / "proposal" / slug / "index.html"
        output.parent.mkdir(parents=True, exist_ok=False)
        output.write_text(page, encoding="utf-8")
        expected_entry = f'href="../../{slug}/"'
        if expected_entry not in page:
            raise SystemExit(f"Invitation entry link invalid: {slug}")
        print(f"proposal={slug} entry=/{slug}/ cover=/proposal/{slug}/")

    print(f"Rendered {len(projects)} unlisted proposal covers")


if __name__ == "__main__":
    main()
