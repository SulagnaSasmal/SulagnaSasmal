# Getting Started

This guide will help you get the project up and running.

## Prerequisites

- Node.js 18+
- npm or yarn package manager
- Git for version control

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/SulagnaSasmal/SulagnaSasmal.git
cd SulagnaSasmal
```

### Step 2: Set Up Environment Variables

This repo has **no npm dependencies** — Node.js 18+ is the only requirement.

```bash
cp .env.example .env
# Edit .env and add your GitHub personal access token
```

Create a token at [github.com/settings/tokens](https://github.com/settings/tokens) with `read:user` and `public_repo` scopes.

### Step 3: Generate the Profile

```bash
npm run generate-profile
```

This fetches GitHub API data and updates `README.md` with fresh stats.

### Step 4: Collect Metrics

```bash
npm run collect-metrics
```

Writes current stats to `metrics/analytics.json`.

## Available Commands

| Command | What it does |
|---|---|
| `npm run generate-profile` | Fetch GitHub data and update README.md |
| `npm run collect-metrics` | Collect and save GitHub metrics |
| `npm run validate-repos` | Check repository standards |
| `npm run test-api` | Test GitHub API connection |

## Running Tests

```bash
node scripts/test-automation.js
```

Expected: 15 passed, 0 failed.

## Viewing the Static Pages Locally

Open any of the HTML files directly in a browser — no build step required:

| Page | File |
|---|---|
| Portfolio Hub | `portfolio.html` |
| GitHub Analytics | `index.html` |
| Content Pipeline Health Checker | `content-pipeline-health-checker.html` |

## Troubleshooting

**Error: GITHUB_TOKEN environment variable not set**
Make sure you have copied `.env.example` to `.env` and filled in a valid token.

**Error: GraphQL Error**
Your token may not have the `read:user` scope. Check [github.com/settings/tokens](https://github.com/settings/tokens).

## Getting Help

- 🐛 [Report an issue](https://github.com/SulagnaSasmal/SulagnaSasmal/issues)
- 📖 [Architecture Guide](./ARCHITECTURE.md)

---

Last updated: 2026-04-19
