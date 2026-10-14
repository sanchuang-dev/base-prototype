#!/usr/bin/env python3
"""Verify the demo is self-contained and the migrated Stitch imagery is served locally."""
from pathlib import Path
import json
import re

root = Path(__file__).resolve().parents[1]
html = (root / "index.html").read_text(encoding="utf-8")
css = (root / "app.css").read_text(encoding="utf-8")
js = (root / "app.js").read_text(encoding="utf-8")
assert "lh3.googleusercontent.com" not in html + css + js, "Google image hotlink reintroduced"
assert "fonts.googleapis.com" not in css, "Google Fonts dependency reintroduced"

refs = re.findall(r"\./assets/images/([a-z0-9-]+\.webp)", html)
assert len(refs) >= 9, f"Expected nine demo images; got {len(refs)} refs"
unique = set(refs)
assert len(unique) == 9, f"Expected nine unique demo images; got {len(unique)}"
for name in sorted(unique):
    file = root / "assets" / "images" / name
    assert file.is_file(), f"Missing image: {file}"
    payload = file.read_bytes()
    assert len(payload) >= 1000, f"Image too small: {name}"
    assert payload[:4] == b"RIFF" and payload[8:12] == b"WEBP", f"Invalid WebP: {name}"

sources = json.loads((root / "assets/images/sources.json").read_text(encoding="utf-8"))
assert {item["file"] for item in sources} == unique, "Image source manifest differs from rendered assets"
print(f"Verified {len(unique)} local WebP assets and {len(refs)} HTML references")
