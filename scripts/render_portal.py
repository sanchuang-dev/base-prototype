#!/usr/bin/env python3
"""Render public demo directory from the canonical manifest."""
from html import escape
import json
from pathlib import Path
import re
from urllib.parse import urlparse

data = json.loads(Path("demos.json").read_text(encoding="utf-8"))
items = data["demos"]
if not items:
    raise SystemExit("At least one registered demo is required")


def verified_external_urls(demo):
    """External entries link only to this organization's published demo and repo."""
    if demo.get("builder") != "external-link":
        raise ValueError("Not an external-link entry")
    destination = urlparse(demo["external_url"])
    repo = urlparse(demo["source_repository"])
    expected = demo["id"]
    if (destination.scheme != "https" or destination.netloc != "sanchuang-dev.github.io"
            or destination.path not in (f"/{expected}/", "/ai-mirror/dev/")
            or destination.params or destination.query or destination.fragment):
        raise SystemExit(f"Unapproved external demo URL: {expected}")
    if (expected == "jianqu") != (destination.path == "/ai-mirror/dev/"):
        raise SystemExit("External demo ID and URL mismatch")
    if (repo.scheme != "https" or repo.netloc != "github.com"
            or repo.path != f"/sanchuang-dev/{'ai-mirror' if expected == 'jianqu' else expected}"
            or repo.params or repo.query or repo.fragment):
        raise SystemExit(f"Unapproved source URL: {expected}")
    return escape(demo["external_url"], quote=True), escape(demo["source_repository"], quote=True)


cards = []
for index, demo in enumerate(items, 1):
    slug = demo["publish_path"]
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug):
        raise SystemExit("Unsafe demo path")
    theme = demo["theme"]
    if theme not in ("local", "botanical", "mirror"):
        raise SystemExit("Unknown card theme")
    chips = "".join('<span class="chip">' + escape(x) + '</span>' for x in demo["features"])
    label = "外部工程预览" if demo.get("builder") == "external-link" else "交互原型"
    inner = f"""<div class="art" aria-hidden="true"></div>
      <div class="project-top"><span class="project-id">PROJECT / {index:02d}</span><span class="project-type">{label}</span></div>
      <div class="project-content"><span class="category">{escape(demo["category"])}</span>
        <h3>{escape(demo["title"])}</h3><p class="project-description">{escape(demo["summary"])}</p>
        <div class="chips">{chips}</div>"""
    if demo.get("builder") == "external-link":
        link, source = verified_external_urls(demo)
        cards.append(f"""<article class="project {theme}">
      {inner}
        <a class="open-link" href="{link}" aria-label="打开{escape(demo["title"], quote=True)}在线预览"><span>打开预览</span><span aria-hidden="true">↗</span></a>
        <a class="project-repo" href="{source}" aria-label="查看{escape(demo["title"], quote=True)}GitHub 仓库">GitHub 项目仓库 ↗</a>
      </div></article>""")
    else:
        cards.append(f"""<a class="project {theme}" href="./{slug}/" aria-label="进入{escape(demo["title"], quote=True)}交互演示">
      {inner}
        <div class="open-link"><span>进入体验</span><span aria-hidden="true">↗</span></div>
      </div></a>""")
template = Path("portal/index.html").read_text(encoding="utf-8")
if template.count("<!--DEMO_CARDS-->") != 1 or template.count("<!--DEMO_COUNT-->") != 1:
    raise SystemExit("Portal slots missing")
rendered = template.replace("<!--DEMO_CARDS-->", "\n".join(cards)).replace(
    "<!--DEMO_COUNT-->", f"{len(items):02d} 个公开原型")
Path("_site").mkdir(exist_ok=True)
Path("_site/index.html").write_text(rendered, encoding="utf-8")
print("portal built with", len(items), "demo links:", ", ".join(x["id"] for x in items))
