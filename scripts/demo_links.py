"""Allowlisted links for externally hosted Sanchuang demo previews.

Central validation shared by rendering and staging. Never fetch external source.
"""
from html import escape
from urllib.parse import urlparse


def verified_external_urls(demo):
    """Return HTML-safe preview/repository links after validating both targets."""
    if demo.get("builder") != "external-link":
        raise ValueError("Not an external-link entry")
    expected = demo["id"]
    destination = urlparse(demo["external_url"])
    repo = urlparse(demo["source_repository"])
    expected_demo_path = "/ai-mirror/dev/" if expected == "jianqu" else f"/{expected}/"
    expected_repo_path = f"/sanchuang-dev/{'ai-mirror' if expected == 'jianqu' else expected}"
    if (destination.scheme != "https" or destination.netloc != "sanchuang-dev.github.io"
            or destination.path != expected_demo_path or destination.params
            or destination.query or destination.fragment or destination.username
            or destination.password):
        raise ValueError(f"Unapproved external demo URL: {expected}")
    if (repo.scheme != "https" or repo.netloc != "github.com"
            or repo.path != expected_repo_path or repo.params or repo.query
            or repo.fragment or repo.username or repo.password):
        raise ValueError(f"Unapproved source URL: {expected}")
    return escape(demo["external_url"], quote=True), escape(demo["source_repository"], quote=True)
