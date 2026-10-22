"""Allowlisted links for externally hosted Sanchuang demo previews.

Central validation shared by rendering and staging. Never fetch external source.
"""
from html import escape
from urllib.parse import urlparse


def verified_external_urls(demo):
    """Return HTML-safe preview/repository links after validating both targets."""
    # Keep the already-published legacy /local-life/ path intact while its
    # directory card opens the newer, independently maintained prototype.
    external = demo.get("builder") == "external-link"
    legacy_preview = demo.get("builder") == "legacy-community" and demo.get("id") == "local-life"
    if not (external or legacy_preview) or not demo.get("external_url"):
        raise ValueError("Not an approved external preview entry")
    expected = demo["id"]
    destination = urlparse(demo["external_url"])
    repo = urlparse(demo["source_repository"])
    destinations = {
        # local-life is an intentionally retained public legacy preview.
        "local-life": ("sanchuang-dev.github.io", "/local-life/"),
        "jianqu": ("ai-mirror.proto.3cgroup.cn", "/"),
        "ai-hair-mirror": ("hair-mirror.proto.3cgroup.cn", "/"),
        "ai-fitting-mirror": ("fitting-mirror.proto.3cgroup.cn", "/"),
        "ai-beauty-mirror": ("beauty-mirror.proto.3cgroup.cn", "/"),
    }
    if expected not in destinations:
        raise ValueError(f"Unapproved external demo ID: {expected}")
    expected_host, expected_demo_path = destinations[expected]
    expected_repo_path = f"/sanchuang-dev/{'ai-mirror' if expected == 'jianqu' else expected}"
    if (destination.scheme != "https" or destination.netloc != expected_host
            or destination.path != expected_demo_path or destination.params
            or destination.query or destination.fragment or destination.username
            or destination.password):
        raise ValueError(f"Unapproved external demo URL: {expected}")
    if (repo.scheme != "https" or repo.netloc != "github.com"
            or repo.path != expected_repo_path or repo.params or repo.query
            or repo.fragment or repo.username or repo.password):
        raise ValueError(f"Unapproved source URL: {expected}")
    return escape(demo["external_url"], quote=True), escape(demo["source_repository"], quote=True)
