#!/usr/bin/env python3
"""Render public demo directory from the canonical manifest."""
from html import escape
import json
from pathlib import Path
import re

data = json.loads(Path("demos.json").read_text(encoding="utf-8"))
items = data["demos"]
if not items:
    raise SystemExit("At least one registered demo is required")
cards = []
for index, demo in enumerate(items, 1):
    slug = demo["publish_path"]
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug):
        raise SystemExit("Unsafe demo path")
    theme = demo["theme"]
    if theme not in ("local", "botanical"):
        raise SystemExit("Unknown card theme")
    chips = "".join('<span class="chip">' + escape(x) + '</span>' for x in demo["features"])
    cards.append(f'''<a class="project {theme}" href="./{slug}/" aria-label="进入{escape(demo["title"])}交互演示">
      <div class="art" aria-hidden="true"></div>
      <div class="project-top"><span class="project-id">PROJECT / {index:02d}</span><span class="project-type">交互原型</span></div>
      <div class="project-content"><span class="category">{escape(demo["category"])}</span>
        <h3>{escape(demo["title"])}</h3><p class="project-description">{escape(demo["summary"])}</p>
        <div class="chips">{chips}</div>
        <div class="open-link"><span>进入体验</span><span aria-hidden="true">↗</span></div>
      </div></a>''')
template = Path("portal/index.html").read_text(encoding="utf-8")
if template.count("<!--DEMO_CARDS-->") != 1 or template.count("<!--DEMO_COUNT-->") != 1:
    raise SystemExit("Portal slots missing")
rendered = template.replace("<!--DEMO_CARDS-->", "\n".join(cards)).replace(
    "<!--DEMO_COUNT-->", f"{len(items):02d} 个公开原型")
Path("_site").mkdir(exist_ok=True)
Path("_site/index.html").write_text(rendered, encoding="utf-8")
print("portal built with", len(items), "demo links:", ", ".join(x["publish_path"] for x in items))
