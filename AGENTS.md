# Local-life demo — project instructions

Before engineering work, read current `sanchuang-dev/.github/AGENTS.md` and this repository's `main/AGENTS.md` (shared charter). This file holds only the local-life project's own constraints.

- This long-lived `demo/local-life` branch is the **sole source branch** for the original community/local-life prototype. Do not merge its business code into `main` or a different customer's branch.
- Product contract: `docs/PRD-V0.3.md`. Keep its five tabs, community broadcasting, visible TV/broadband/mobile offers, family-health and benefits structure unless a product decision changes it.
- Current historical source is under `source/`, `patches/`, `release/`; centralized trusted publisher on `main` reconstructs the current V0.3.3 demo from `release/v0.3.1` and the legacy compatibility transforms.
- This is demonstration content, not a real community service or government endorsement; simulated actions must remain unmistakable.
- After changes, compare the resulting demo route/interaction behavior and confirm the published `/local-life/` path. The repository root `/` belongs to the shared demo portal.
- Repo-level `.github/workflows/pages.yml` inherited from older history is not the publisher for this branch; the actual publisher is `main`.
