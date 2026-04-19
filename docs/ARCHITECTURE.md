# Architecture

This is the `SulagnaSasmal/SulagnaSasmal` GitHub profile repository. It serves two purposes:

1. **GitHub profile README** — `README.md` renders at [github.com/SulagnaSasmal](https://github.com/SulagnaSasmal) and is refreshed daily by a GitHub Actions workflow.
2. **GitHub Pages hub** — static HTML pages deployed to `sulagnasasmal.github.io` (Vercel alias: `sulagnasasmal.com`).

---

## Static Pages

| File | Purpose |
|---|---|
| `portfolio.html` | Portfolio hub — 8 documentation projects with sidebar navigation |
| `index.html` | Live GitHub profile analytics dashboard (dark theme, GitHub REST API) |
| `content-pipeline-health-checker.html` | Interactive diagnostic tool — identifies where a documentation pipeline breaks across delivery surfaces |
| `docs/writing-philosophy.html` | Writing craft meta-doc |
| `docs/information-architecture.html` | IA decisions meta-doc |
| `docs/doc-as-code-workflow.html` | Docs-as-Code workflow meta-doc |

All pages are plain HTML/CSS/JS — no build step, no framework dependency.
Design system: Inter + JetBrains Mono fonts, teal brand (`#0d9488`), CSS custom properties for light/dark mode, defined in `assets/hub-style.css`.

---

## Automation Scripts (`scripts/`)

| Script | Purpose |
|---|---|
| `generate-profile.js` | **Entry point.** Fetches GitHub data, writes updated sections to `README.md` |
| `github-api-queries.js` | GitHub GraphQL API helpers — `getUserStats`, `getTopRepositories`, `getRecentActivity` |
| `profile-template.js` | README section generators — stats table, top repos list, language chart |
| `metrics-collector.js` | Collects current stats and appends to `metrics/analytics.json` |
| `analytics-report.js` | Generates `metrics/REPORT.md` from collected history |
| `analytics-server.js` | Local Node.js server for analytics event collection (dev only, port 3001) |
| `generate-documentation.js` | Validates and regenerates `docs/` structure files |
| `generate-badges.js` | Repository badge generation utilities |
| `repo-validator.js` | Checks for required files in this repo (`package.json`, `.gitignore`, `README.md`) |
| `repo-standards-validator.js` | Validates all public repos against documentation standards |
| `sync-repo-metadata.js` | Syncs GitHub repository topics and descriptions via API |
| `github-analytics-tracker.js` | Client-side analytics event tracker (used by `index.html`) |
| `test-automation.js` | Test suite — run with `node scripts/test-automation.js` |

All scripts run in Node.js 18+ with zero npm dependencies (uses built-in `fetch`).

---

## CI Workflows (`.github/workflows/`)

| Workflow | Schedule | What it does |
|---|---|---|
| `update-profile.yml` | Daily at 00:00 UTC | Runs `generate-profile.js` and `metrics-collector.js`; auto-commits `README.md` and `metrics/` |
| `documentation.yml` | Weekly, Sunday 04:00 UTC | Validates docs structure; commits any generated files |
| `metrics.yml` | Weekly, Sunday 05:00 UTC | Full metrics collection and analytics report |
| `repo-maintenance.yml` | Weekly, Sunday 02:00 UTC | Standards validation and link checking |
| `standardize-repos.yml` | Weekly, Sunday 03:00 UTC | Metadata standards check across all repositories |

All workflows use `actions/checkout@v4` and `actions/setup-node@v4` (Node 18).
Auto-commits use `stefanzweifel/git-auto-commit-action@v5` with `[skip ci]` to prevent loops.

---

## Data Flow

```
GitHub GraphQL API
      │
      ▼
generate-profile.js
      │
      ├─→ profile-template.js ─→ README.md (auto-committed daily)
      │
      └─→ metrics-collector.js ─→ metrics/analytics.json
                                        │
                                        └─→ analytics-report.js ─→ metrics/REPORT.md
```

---

## Environment Variables

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `GITHUB_TOKEN` | Yes | — | GitHub API access. In Actions: auto-injected. Locally: set in `.env`. |
| `GITHUB_USERNAME` | No | `SulagnaSasmal` | Target GitHub account |

See `.env.example` for setup instructions.

---

## Deployment

- **GitHub Pages**: Served from the `main` branch root. No build step.
- **Vercel**: `vercel.json` at root configures static serving with security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) for the custom domain.

---

Last updated: 2026-04-19
