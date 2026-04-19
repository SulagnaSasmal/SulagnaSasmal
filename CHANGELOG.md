<!-- markdownlint-disable MD024 -->
# Changelog

All notable changes to this repository are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/). Versioning follows [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

---

## [2.1.0] — 2026-04-19

### Added

- `content-pipeline-health-checker.html` — interactive 4-step diagnostic tool; based on Despopoulos's source-to-delivery model and Iantosca's two-gate quality model
- `.env.example` — documents required environment variables (`GITHUB_TOKEN`, `GITHUB_USERNAME`)
- `LICENSE` — MIT license

### Changed

- `docs/SETUP.md` — replaced placeholder `[username]/[repo-name]` URLs with real repo path; rewrote commands to match actual script names
- `docs/ARCHITECTURE.md` — replaced generic template with accurate description of all scripts, workflows, pages, and data flow
- `scripts/test-automation.js` — fixed broken `require` paths for `github-api-queries` and `profile-template` (tests 1 and 2 now pass; 15/15 pass)
- Design system applied consistently across all static pages: shared teal brand tokens, Inter + JetBrains Mono fonts, dark/light mode

### Removed

- `ALL_PRODUCTS_SHIPMENT_PLAN.md` — internal planning doc removed from public repo
- `PORTFOLIO_PLAN.md` — internal planning doc removed from public repo

---

## [2.0.0] — 2026-04-07

### Added

- `content-pipeline-health-checker.html` initial version — multi-step wizard with diagnostic engine
- Checkbox `change` event fix for Step 2 delivery surfaces

---

## [1.5.0] — 2026-03-30

### Added

- `portfolio.html` — full portfolio hub with sidebar navigation, project cards, skills inventory, and craft meta-docs
- `assets/hub-style.css` — design system with light/dark mode tokens, responsive layout, component library
- `assets/hub-scripts.js` — theme toggle, mobile sidebar, copy-to-clipboard, active link detection
- `index.html` — live GitHub analytics dashboard (GitHub public REST API, dark theme)
- Five GitHub Actions workflows: `update-profile.yml`, `documentation.yml`, `metrics.yml`, `repo-maintenance.yml`, `standardize-repos.yml`
- `docs/` — writing-philosophy, information-architecture, doc-as-code-workflow HTML pages
- `scripts/` — 13 Node.js automation scripts for profile generation, metrics, and repo validation
- `vercel.json` — static serving config with security headers

### Changed

- README rebuilt as full-featured GitHub profile page with portfolio table (30+ projects), skill badges, and auto-updated stats

---

## [1.0.0] — 2026-03-04

### Added

- Initial repository setup with `README.md`, `package.json`, `.gitignore`
