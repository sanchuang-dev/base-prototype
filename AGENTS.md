# Repository instructions — Lingnan prototype branch

Before modifying this demo, read the current Organization `sanchuang-dev/.github/AGENTS.md` and this repository's `main/AGENTS.md` (the shared local charter). This file contains only Lingnan-specific constraints.

This branch owns a standalone Chinese herbal heritage / gifts / enterprise showcase prototype.

- This is **not** the community family-health product in `main`. Never merge this branch's business source into `main`. Routine product work must not alter the centralized Pages publisher owned by `main`; explicitly authorized publisher maintenance happens separately on `main`.
- Keep an independently maintainable HTML/CSS/JS static prototype without live credentials, payment, customer data submission, or back-end dependency.
- Visual reference: user-supplied five Stitch screens and Lingnan botanical design tokens; prefer design fidelity, clear story, and working demo journeys.
- Do not fabricate verified health efficacy, government certifications, actual charitable figures, partner testimonials, or successful orders. Clearly identify synthetic demo facts and all simulated interactions.
- Basic checks: HTML IDs and local assets resolve, `node --check app.js`, test navigation/click paths in browser before calling it accepted. External imagery needs independent online verification.
- Branch exception to Sanchuang's usual feat→dev→test→prod: this `feat/*` is a long-lived **standalone prototype branch**, not a candidate for code promotion into the unrelated main product. Its static files may be included under `/lingnan/` in the repository's unified **public demo** Pages artifact; this is not a real production business deployment.
