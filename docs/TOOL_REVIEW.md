# Tool Repository Review — Maturity, Gaps & Improvement Plan

*Review date: 2026-03-05 · Scope: all tool-category repositories*

---

## Overview

This document audits the five tool repositories, assessing their current maturity, identifying what remains pending against each project's specification, and proposing a prioritized improvement roadmap for each.

| Tool | Stack | Maturity | Status | Live |
|------|-------|----------|--------|------|
| [DocCraft AI](#1-doccraft-ai) | Next.js 14 · TypeScript · GPT-4o | ⭐⭐⭐⭐⭐ Production | Deployed on Vercel | [doccraft-ten.vercel.app](https://doccraft-ten.vercel.app/) |
| [PPT → MP4](#2-ppt--mp4-documentation-automation) | Python · FastAPI · Azure TTS · FFmpeg | ⭐⭐⭐⭐ Mature | Fully functional | Windows-only |
| [SpecFlow](#3-specflow--openapi-developer-portal) | Next.js 14 · TypeScript · swagger-parser | ⭐⭐⭐ Beta | Active development | [sulagnasasmal.github.io/specflow](https://sulagnasasmal.github.io/specflow/) |
| [DocQuery](#4-docquery--rag-documentation-chatbot) | Python · FastAPI · LangChain · ChromaDB | ⭐⭐⭐ Beta | Active development | [sulagnasasmal.github.io/docquery](https://sulagnasasmal.github.io/docquery/) |
| [DocPulse](#5-docpulse--documentation-analytics-dashboard) | Python · FastAPI · SQLite · Next.js 14 | ⭐⭐⭐ Beta | Active development | [sulagnasasmal.github.io/docpulse](https://sulagnasasmal.github.io/docpulse/) |

---

## Maturity Rating Scale

| Rating | Label | Definition |
|--------|-------|------------|
| ⭐⭐⭐⭐⭐ | **Production** | Deployed, stable, tested, publicly accessible |
| ⭐⭐⭐⭐ | **Mature** | Fully functional locally, deployable, no known blocking issues |
| ⭐⭐⭐ | **Beta** | Core features built, integration in progress, not yet production-hardened |
| ⭐⭐ | **Alpha** | Key scaffolding in place, major components still under development |
| ⭐ | **Prototype** | Proof-of-concept, significant work remaining |

---

## 1. DocCraft AI

**Repository:** [SulagnaSasmal/Doccraft](https://github.com/SulagnaSasmal/Doccraft)  
**Maturity:** ⭐⭐⭐⭐⭐ Production  
**Created:** December 2017 (significantly updated 2025–2026)

### What's complete

| Feature | Status |
|---------|--------|
| Multi-format text input (paste, file upload) | ✅ Complete |
| AI gap analysis before writing | ✅ Complete |
| Interactive clarifying Q&A loop | ✅ Complete |
| 5 document templates (User Guide, Quick Start, API Reference, Troubleshooting, Release Notes) | ✅ Complete |
| Audience-aware generation (technical / non-technical / mixed) | ✅ Complete |
| Inline AI editing (Simplify, Expand, Add Example, Make Concise) | ✅ Complete |
| Live split editor (Markdown source + styled preview) | ✅ Complete |
| MSTP compliance checking with one-click fixes | ✅ Complete |
| Context layer (upload style guide, glossary, OpenAPI spec) | ✅ Complete |
| Export to HTML and Markdown | ✅ Complete |
| Vercel deployment | ✅ Complete |

### Pending items (from README Roadmap)

| Item | Priority | Effort |
|------|----------|--------|
| PDF and DOCX file parsing (backend ingestion) | High | Medium |
| Image analysis via GPT-4o Vision | High | Medium |
| Rich text editor replacement (TipTap or Lexical) | Medium | Medium |
| Git integration — version history + diff view | Medium | High |
| Publish API — push to Confluence, Notion, GitBook | Medium | High |
| DOCX export | Medium | Low |
| Team collaboration and async review workflows | Low | High |
| Custom style guide upload and enforcement | Medium | Medium |

### Improvement plan

**Sprint 1 (1–2 weeks):**
- Add DOCX export using `mammoth` or `docx` npm package — low effort, high user value
- Add PDF parsing via `pdf-parse` for document ingestion

**Sprint 2 (2–3 weeks):**
- Integrate GPT-4o Vision for screenshot / diagram ingestion
- Allow users to upload `.pdf` and `.docx` files as source material

**Sprint 3 (3–4 weeks):**
- Replace the current Markdown textarea with TipTap rich text editor
- Add inline formatting, tables, and callout block support

**Future (post-Sprint 3):**
- Git integration for diff-based documentation updates
- Publish API connectors (start with Confluence since it's highest enterprise demand)
- Team review workflows

---

## 2. PPT → MP4 Documentation Automation

**Repository:** [SulagnaSasmal/ppt-to-mp4-doc-automation](https://github.com/SulagnaSasmal/ppt-to-mp4-doc-automation)  
**Maturity:** ⭐⭐⭐⭐ Mature  
**Created:** February 2026

### What's complete

| Feature | Status |
|---------|--------|
| Web UI — upload PPT, track progress, download MP4 | ✅ Complete |
| Slide note extraction (python-pptx) | ✅ Complete |
| Azure TTS narration — Jenny Neural voice | ✅ Complete |
| Per-slide timing matched to audio duration | ✅ Complete |
| PowerPoint COM automation for video export | ✅ Complete |
| FFmpeg audio/video mux | ✅ Complete |
| Job tracking with progress polling | ✅ Complete |
| Job history UI | ✅ Complete |
| Preview slide notes before conversion | ✅ Complete |
| Configurable voice, speaking rate, resolution, FPS | ✅ Complete |
| Cloudflare tunnel demo guide | ✅ Complete |

### Pending items

| Item | Priority | Effort | Notes |
|------|----------|--------|-------|
| Cross-platform support (macOS / Linux) | High | High | COM automation is Windows + PowerPoint only; LibreOffice Impress is the alternative |
| Docker container (Windows-based) | Medium | Medium | Allows demo on any Windows machine without Python setup |
| Additional TTS providers (ElevenLabs, Google TTS, Amazon Polly) | Medium | Low | Reduces Azure dependency |
| Automated test suite | Medium | Medium | Currently no tests |
| Batch processing (multiple PPT files) | Low | Low | Queue multiple jobs |
| Custom slide template support | Low | Low | Brand-specific slide styling |
| Direct YouTube / Vimeo publish API | Low | High | Post-production publish |

### Improvement plan

**Sprint 1 (1 week):**
- Add `pytest` test suite covering: note extraction, TTS call mocking, job status polling
- Add `requirements-dev.txt` with test dependencies

**Sprint 2 (2 weeks):**
- Add ElevenLabs TTS as an alternative voice provider (configurable via `.env`)
- Add Google TTS as a free-tier fallback option

**Sprint 3 (3–4 weeks):**
- Investigate LibreOffice Impress headless export as cross-platform alternative to COM automation
- Document cross-platform limitation clearly with a compatibility matrix

**Future:**
- Docker image (Windows-based for COM), batch job support

---

## 3. SpecFlow — OpenAPI Developer Portal

**Repository:** [SulagnaSasmal/specflow](https://github.com/SulagnaSasmal/specflow)  
**Maturity:** ⭐⭐⭐ Beta  
**Created:** March 2026

### What's complete

| Feature | Status |
|---------|--------|
| Next.js 14 project scaffolding | ✅ Complete |
| OpenAPI YAML/JSON parser (`swagger-parser`) | ✅ Complete |
| Source directory structure (app, components, parser, generator, lib, search, types) | ✅ Complete |
| Example spec (`vaultpay-openapi.yaml`) | ✅ Complete |
| ESLint configuration | ✅ Complete |
| GitHub Pages deployment (static export) | ✅ Complete |
| PLAN.md and ROADMAP.md | ✅ Complete |
| Test case specification (`specflow-test-cases.md`) | ✅ Complete |
| Test validation report | ✅ Complete |

### Pending items

Based on the 5-phase PLAN.md and current source structure:

**Phase 1 — Core Portal (partially complete):**

| Item | Status |
|------|--------|
| Three-panel layout (nav / content / schema) | 🔄 In progress |
| Endpoint grouping by tag with collapse/expand | 🔄 In progress |
| Request/response schema tree (OpenAPI `$ref` resolution) | 🔄 In progress |
| Multi-language code sample generation (curl, Python, JS, Go) | ⬜ Pending |
| Dark/light mode toggle | ⬜ Pending |
| Keyboard search (Cmd+K) across all endpoints | ⬜ Pending |

**Phase 2 — Try-It Console (pending):**

| Item | Status |
|------|--------|
| Interactive form builder from schema | ⬜ Pending |
| Live API call execution via browser fetch | ⬜ Pending |
| Auth panel (API Key, Bearer, OAuth2, HTTP Basic) | ⬜ Pending |
| Server selector (from OpenAPI `servers` block) | ⬜ Pending |
| Response display with syntax highlighting | ⬜ Pending |

**Phase 3 — AI + Compliance (pending):**

| Item | Status |
|------|--------|
| AI endpoint description enrichment (GPT-4o) | ⬜ Pending |
| Compliance annotation rendering (PCI/PSD2/GDPR flags) | ⬜ Pending |
| Spec diff viewer | ⬜ Pending |

**Phase 4 — Deploy + CI/CD (partially complete):**

| Item | Status |
|------|--------|
| GitHub Pages static export | ✅ Complete |
| GitHub Actions CI/CD workflow | ⬜ Pending |
| CLI: `npx specflow serve my-spec.yaml` | ⬜ Pending |

**Phase 5 — Showcase (pending):**

| Item | Status |
|------|--------|
| Proper project README (currently still default Next.js README) | 🔴 **Critical gap** |
| Screenshot walkthrough in README | ⬜ Pending |
| LinkedIn-ready demo narrative | ⬜ Pending |

### Improvement plan

**Immediate (this week):**
- **Replace the README** with a proper project description — this is the highest-priority gap. The current README is the default `create-next-app` boilerplate, which means anyone landing on the GitHub repo sees no project description.

**Sprint 1 (1–2 weeks):**
- Complete Phase 1: finish code sample generation (curl, Python, JS, Go) and dark mode toggle
- Add global Cmd+K search

**Sprint 2 (2–3 weeks):**
- Build Phase 2: Try-It Console with form builder, live fetch, and response viewer

**Sprint 3 (3–4 weeks):**
- Phase 4: Add GitHub Actions workflow for auto-deploy on push
- Add CLI wrapper using `next-export`

**Future:**
- Phase 3 AI enrichment and compliance annotations
- Phase 5 showcase materials

---

## 4. DocQuery — RAG Documentation Chatbot

**Repository:** [SulagnaSasmal/docquery](https://github.com/SulagnaSasmal/docquery)  
**Maturity:** ⭐⭐⭐ Beta  
**Created:** March 2026

### What's complete

| Feature | Status |
|---------|--------|
| Python project scaffolding | ✅ Complete |
| Directory structure (ingestion, query, gaps, api, widget, frontend) | ✅ Complete |
| `ingest.py` CLI — crawl and chunk a documentation site | ✅ Complete |
| `query_cli.py` — interactive terminal Q&A | ✅ Complete |
| FastAPI app scaffolding (`api/main.py`, `api/routes/`) | ✅ Complete |
| Next.js 14 frontend scaffold (`frontend/`) | ✅ Complete |
| `requirements.txt` | ✅ Complete |
| `.env.example` with OpenAI API key placeholder | ✅ Complete |
| GitHub Pages deployment | ✅ Complete |
| README with full architecture and usage instructions | ✅ Complete |

### Pending items

Based on PLAN.md phased specification:

**Phase 1 — Ingestion Pipeline:**

| Item | Status |
|------|--------|
| Web crawler (`ingestion/crawler.py`) — async BeautifulSoup4 + httpx | 🔄 Scaffolded |
| Section-aware chunker (`ingestion/chunker.py`) | 🔄 Scaffolded |
| OpenAI embedding + ChromaDB storage (`ingestion/embedder.py`) | 🔄 Scaffolded |
| Sitemap-driven crawl (respects `sitemap.xml`) | ⬜ Pending |
| Incremental re-index (only re-embed changed pages) | ⬜ Pending |

**Phase 2 — Query Pipeline:**

| Item | Status |
|------|--------|
| Vector retrieval with confidence scoring (`query/retriever.py`) | 🔄 Scaffolded |
| LangChain RAG chain with citations (`query/chain.py`) | 🔄 Scaffolded |
| Confidence scorer HIGH / MEDIUM / LOW (`query/confidence.py`) | 🔄 Scaffolded |
| Conversation memory — SQLite (`query/memory.py`) | 🔄 Scaffolded |
| Multi-turn context carry-over | ⬜ Pending |

**Phase 3 — API + Frontend:**

| Item | Status |
|------|--------|
| `POST /api/chat` — RAG pipeline endpoint | 🔄 Scaffolded |
| `POST /api/ingest` — crawl and index endpoint | 🔄 Scaffolded |
| `GET /api/collections` — list indexed collections | 🔄 Scaffolded |
| `GET /api/gaps` — view content gaps | 🔄 Scaffolded |
| Next.js chat UI — message bubbles, source cards, confidence badges | ⬜ Pending |
| Collection selector in chat UI | ⬜ Pending |
| Dark/light mode in frontend | ⬜ Pending |

**Phase 4 — Content Gap Tracker:**

| Item | Status |
|------|--------|
| Auto-log low-confidence answers (`gaps/tracker.py`) | 🔄 Scaffolded |
| Gap report generation (Markdown) | ⬜ Pending |
| Gap analytics in dashboard | ⬜ Pending |

**Phase 5 — Embeddable Widget:**

| Item | Status |
|------|--------|
| `widget/widget.js` — drop-in chat bubble | 🔄 Scaffolded |
| Widget embed documentation | ⬜ Pending |
| CORS policy for widget cross-origin requests | ⬜ Pending |

**Phase 6 — Production Hardening:**

| Item | Status |
|------|--------|
| Pinecone vector DB integration (production alternative to ChromaDB) | ⬜ Pending |
| Railway.app API deployment guide | ⬜ Pending |
| Vercel frontend deployment guide | ⬜ Pending |
| Authentication for private collections | ⬜ Pending |

### Improvement plan

**Sprint 1 (1–2 weeks):**
- Validate and complete the ingestion pipeline components (crawler → chunker → embedder)
- Run end-to-end test: ingest one documentation site, query it via CLI

**Sprint 2 (2–3 weeks):**
- Complete the Next.js chat frontend (message UI, source citation cards, confidence badges)
- Wire frontend to FastAPI chat endpoint

**Sprint 3 (3 weeks):**
- Build gap tracker report generation
- Add gap analytics page to frontend

**Future:**
- Pinecone integration, widget embedding, authentication

---

## 5. DocPulse — Documentation Analytics Dashboard

**Repository:** [SulagnaSasmal/docpulse](https://github.com/SulagnaSasmal/docpulse)  
**Maturity:** ⭐⭐⭐ Beta  
**Created:** March 2026

### What's complete

| Feature | Status |
|---------|--------|
| Project scaffolding | ✅ Complete |
| `tracker/tracker.js` — lightweight JS tracker (<5KB) | ✅ Complete |
| `tracker/feedback-widget.js` — thumbs up/down widget | ✅ Complete |
| FastAPI app scaffolding (`api/main.py`, `api/database.py`, `api/routes/`) | ✅ Complete |
| SQLite schema definition | ✅ Complete |
| Next.js 14 frontend scaffold (`frontend/`) | ✅ Complete |
| `data/coverage.yaml` — feature-to-doc mapping | 🔄 Partial |
| `data/seed.py` — demo data generator | 🔄 Partial |
| `requirements.txt` | ✅ Complete |
| README with full architecture documentation | ✅ Complete |

### Pending items

Based on PLAN.md phased specification:

**Phase 1 — Tracker + Core Dashboard:**

| Item | Status |
|------|--------|
| Event batching (every 30s, not per-interaction) | ✅ In tracker.js |
| Active reading time (pauses when tab hidden) | ✅ In tracker.js |
| Scroll depth thresholds (25/50/75/100%) | ✅ In tracker.js |
| Code block copy detection | ✅ In tracker.js |
| `POST /api/events` event ingestion endpoint | 🔄 Route scaffolded |
| Daily/hourly rollup aggregation jobs | ⬜ Pending |
| Overview dashboard page (Next.js) — views, visitors, reading time | ⬜ Pending |
| Time-series chart (daily views) | ⬜ Pending |
| Top pages table | ⬜ Pending |

**Phase 2 — Search Analytics:**

| Item | Status |
|------|--------|
| Search query capture in tracker.js | ⬜ Pending |
| `GET /api/search/queries` — top queries | 🔄 Route scaffolded |
| `GET /api/search/failed` — zero-result searches | 🔄 Route scaffolded |
| Search analytics dashboard page | ⬜ Pending |

**Phase 3 — Content Freshness:**

| Item | Status |
|------|--------|
| GitHub API integration — fetch last commit date per doc file | ⬜ Pending |
| `GET /api/freshness` — freshness scores | 🔄 Route scaffolded |
| Freshness dashboard page with status badges (fresh/aging/stale/abandoned) | ⬜ Pending |

**Phase 4 — Coverage Matrix:**

| Item | Status |
|------|--------|
| `coverage.yaml` — product feature × doc page mapping | 🔄 Partial |
| `GET /api/coverage` — coverage matrix endpoint | 🔄 Route scaffolded |
| Visual coverage matrix page in dashboard | ⬜ Pending |

**Phase 5 — Reports + Ticket Deflection:**

| Item | Status |
|------|--------|
| `GET /api/reports/weekly` — weekly Markdown report | 🔄 Route scaffolded |
| Report generation page in dashboard | ⬜ Pending |
| Ticket deflection tracking (Zendesk/Intercom integration) | ⬜ Pending |

**Phase 6 — Production Deployment:**

| Item | Status |
|------|--------|
| PostgreSQL migration for production | ⬜ Pending |
| Vercel dashboard deployment | ⬜ Pending |
| Railway API deployment | ⬜ Pending |
| Tracker CDN hosting setup | ⬜ Pending |

### Improvement plan

**Sprint 1 (1–2 weeks):**
- Complete event ingestion endpoint — accept batched events, write to SQLite
- Seed demo data generator so dashboard renders with representative data
- Build Overview dashboard page (views, visitors, reading time, top pages, time-series chart)

**Sprint 2 (2–3 weeks):**
- Complete search analytics route implementations
- Build Search analytics dashboard page

**Sprint 3 (2–3 weeks):**
- GitHub API freshness integration
- Build Freshness and Coverage Matrix dashboard pages

**Sprint 4 (1–2 weeks):**
- Complete weekly report generation
- Deploy to Vercel + Railway

---

## Cross-Tool Observations

### Patterns that apply to all beta tools (SpecFlow, DocQuery, DocPulse)

1. **Frontend READMEs are still Next.js boilerplate.** Each `frontend/README.md` file is the default `create-next-app` placeholder. These should either be removed or replaced with a note pointing to the root README.

2. **No CI/CD workflows on the individual tool repos.** Only the profile repo (SulagnaSasmal/SulagnaSasmal) has GitHub Actions workflows. Each tool repo should have at minimum a workflow that runs linting and type-checking on push.

3. **No test coverage.** None of the beta tools have a test directory or test runner configured. This is the primary risk for the Python backends — a unit test for each API route and the key pipeline steps would significantly increase confidence.

4. **Tracker/widget integration not demonstrated on a live site.** The strongest showcase value comes from embedding the DocPulse tracker on one of the documentation sites (e.g., fraudshield-docs) and showing real data in the dashboard.

### Prioritized improvement order

Ranked by portfolio impact and effort:

| Priority | Action | Tool | Impact |
|----------|--------|------|--------|
| 1 | Fix SpecFlow README (replace Next.js boilerplate) | SpecFlow | High — first impression on GitHub |
| 2 | Complete DocPulse Overview dashboard with demo data | DocPulse | High — proves measurement capability |
| 3 | Complete DocQuery chat frontend | DocQuery | High — interactive demo |
| 4 | Add DocCraft DOCX export | DocCraft | Medium — removes final export gap |
| 5 | Add CI workflows to all tool repos | All | Medium — professional signal |
| 6 | Add test suites (start with Python routes) | DocPulse, DocQuery | Medium — engineering credibility |
| 7 | Complete SpecFlow Phase 2 (Try-It Console) | SpecFlow | High — core product feature |
| 8 | Add GPT-4o Vision to DocCraft | DocCraft | Medium — differentiator feature |
| 9 | Embed DocPulse tracker on a real doc site | DocPulse | High — live proof point |
| 10 | Add cross-platform support to PPT→MP4 | PPT→MP4 | Medium — removes Windows constraint |

---

## Summary Table

| Tool | Completeness | Biggest Gap | Next Action |
|------|-------------|-------------|-------------|
| DocCraft AI | ~85% | DOCX/PDF input parsing | Add `pdf-parse` + DOCX export |
| PPT → MP4 | ~90% | Windows-only, no tests | Add pytest suite + ElevenLabs TTS |
| SpecFlow | ~50% | No proper README, Try-It Console pending | Replace README, complete Phase 1 |
| DocQuery | ~45% | Frontend not wired to backend | Complete Next.js chat UI |
| DocPulse | ~40% | Dashboard pages not yet built | Build Overview dashboard with seed data |

---

*Last updated: 2026-03-05 · Author: SulagnaSasmal*
