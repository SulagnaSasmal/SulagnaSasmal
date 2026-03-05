# Tools Portfolio Audit — March 2026

> Analysis of all active tool repos under [SulagnaSasmal](https://github.com/SulagnaSasmal?tab=repositories).
> Covers maturity, pending work vs. original spec, and improvement plan.

---

## Repos in Scope

| Repo | Language | Maturity | Last Updated |
|------|----------|----------|--------------|
| [ppt-to-mp4-doc-automation](https://github.com/SulagnaSasmal/ppt-to-mp4-doc-automation) | Python | 80% | 2026-03-02 |
| [docquery](https://github.com/SulagnaSasmal/docquery) | Python + TypeScript | 70% | 2026-03-04 |
| [docpulse](https://github.com/SulagnaSasmal/docpulse) | Python + TypeScript | 60% | 2026-03-05 |
| [specflow](https://github.com/SulagnaSasmal/specflow) | TypeScript | 55% | 2026-03-04 |
| [Doccraft](https://github.com/SulagnaSasmal/Doccraft) | TypeScript | 40% | 2026-03-01 |
| [documentation-ai-agent](https://github.com/SulagnaSasmal/documentation-ai-agent) | — | 0% | 2026-02-21 |

---

## 1. PPT-to-MP4 Doc Automation — 80%

**Full pipeline: TTS narration → slide timings → PowerPoint COM export → FFmpeg mux**

### What's built
- FastAPI web server with job tracking and real-time status
- Azure Cognitive Services TTS (Jenny Neural voice)
- win32com PowerPoint COM automation for per-slide timing
- FFmpeg mux of video + audio tracks
- JSON-persistent job history, DEMO-GUIDE.md
- Build artifacts in repo confirm the pipeline actually runs (final.mp4 present)

### Pending
| Item | Priority |
|------|----------|
| `.gitignore` does not exclude `build/`, `__pycache__/`, `uploads/`, `jobs/` — these are committed to the public repo | **High** |
| Multiple cpython cache files (311 and 314) — environment drift | Medium |
| No unit tests for pipeline steps | Medium |
| Voice / rate / resolution config not yet exposed in the web UI | Low |
| README: no explicit Linux/Docker alternative mentioned (Windows COM only) | Low |

---

## 2. DocQuery — RAG Documentation Chatbot — 70%

**Ingests doc sites → section-aware chunking → ChromaDB → GPT-4o answers with citations**

### What's built
- Ingestion pipeline: crawler.py, chunker.py, embedder.py
- Query pipeline: retriever.py, chain.py, confidence.py, memory.py
- FastAPI backend: chat, ingest, gaps routes
- Next.js chat UI: ChatMessage, SourceCard, ConfidenceBadge, CollectionSelector, ThemeToggle
- Content gap tracker (gaps/tracker.py)
- Embeddable widget (widget/widget.js)
- CLI tools: ingest.py, query_cli.py

### Pending
| Item | Priority |
|------|----------|
| `ingestion/openapi_loader.py` — OpenAPI spec → doc chunks | **High** |
| `gaps/clusterer.py` — fuzzy grouping of similar low-confidence questions | **High** |
| `gaps/reporter.py` — Markdown/CSV gap export | **High** |
| GapTable frontend component (not in file tree) | Medium |
| Pre-loaded demo collections: VaultPay, FraudShield, US Payments Hub | **High** |
| Search vs. Chat toggle mode | Low |
| Cross-encoder re-ranking step in retriever | Low |

---

## 3. DocPulse — Documentation Analytics Dashboard — 60%

**Lightweight JS tracker + FastAPI backend + Next.js dashboard for doc teams**

### What's built
- FastAPI backend with all 6 route files: events, analytics, search, freshness, coverage, reports
- SQLite event ingestion
- Next.js pages: overview, search, freshness, coverage, reports
- tracker.js (~162 lines) + feedback-widget.js
- Data seeder + coverage.yaml

### Pending
| Item | Priority |
|------|----------|
| `api/models/` — event.py and aggregation.py Pydantic schemas | **High** |
| `api/jobs/` — hourly aggregation + daily freshness scan background jobs | **High** |
| Page detail view (/pages/[slug]) — not in file tree | **High** |
| TimeSeriesChart with Recharts (currently only MetricCard exists) | **High** |
| CoverageMatrix — D3.js visual (YAML config exists but no D3 component) | **High** |
| FreshnessHeatmap component | Medium |
| HealthScore combined metric widget | Medium |
| ROICalculator component (Phase 4) | Medium |
| Feedback dashboard page (no separate route) | Medium |
| Ticket deflection tracking (Phase 4) | Medium |
| Zero tests — tracker.test.js not present | Medium |

---

## 4. SpecFlow — OpenAPI to Developer Portal — 55%

**Drop an OpenAPI spec. Get a Stripe-quality three-panel developer portal.**

### What's built
- Three-panel layout: NavPanel, ContentPanel, CodePanel
- EndpointDoc, ParameterTable, RequestBodySection, ResponseSection
- SchemaTree, SearchModal, CodeBlock + CopyButton
- Full Try-It console: AuthPanel, ParameterInput, RequestBuilder, ResponseDisplay, ServerSelector, WebhooksPanel
- Code sample generator (code-samples.ts)
- OpenAPI parser, request executor, type definitions
- VaultPay example spec, CI/CD workflow

### Pending
| Item | Priority |
|------|----------|
| `src/ai/` — GPT-4o description enrichment + diff view | **High** |
| `src/compliance/` — regulation annotation engine (PCI-DSS, PSD2, BSA/AML) | **High** (key differentiator) |
| Spec quality score card | Medium |
| `npx specflow build` — static site export CLI | **High** |
| Auto-generated GitHub Actions workflow template | Medium |
| specflow.config.yaml configuration schema | Medium |
| Additional example specs (FraudShield, Petstore) | Low |
| SpecFlow's own docs built with SpecFlow | Low |

---

## 5. Doccraft — AI Documentation Generator — 40%

**Upload raw content → AI gap analysis → clarifying Q&A → generates structured docs**

### What's built
- Next.js app with generate and refine API routes (GPT-4o + GPT-4o-mini)
- Components: ConfigPanel, DocumentEditor, GapAnalysis, Header, StatusBar, UploadPanel
- 5 doc templates, audience-aware generation, inline AI editing, HTML/MD export

### Pending (README Roadmap — entirely unstarted)
| Item | Priority |
|------|----------|
| PDF and DOCX file parsing (backend) | **High** |
| Image analysis via GPT-4o Vision | **High** |
| Rich text editor (TipTap) | Medium |
| Git integration (version history, diff view) | Medium |
| DOCX export | Medium |
| Publish API (Confluence, Notion, GitBook) | Low |
| Team collaboration + review workflows | Low |
| Custom style guide upload | Medium |

---

## 6. documentation-ai-agent — 0%

**Empty repository.** No files committed. Decision needed: build it or archive it.

---

## Improvement Plan

### This Week

**PPT-to-MP4**
1. Fix .gitignore — exclude build/, __pycache__/, uploads/, jobs/
2. Remove committed binary/cache files from git history

**DocQuery**
3. Add gaps/clusterer.py — Levenshtein-based question grouping
4. Add gaps/reporter.py — Markdown + CSV export of content gaps
5. Add GapTable frontend component
6. Commit pre-indexed demo collections (VaultPay, FraudShield docs)

### Next 2 Weeks

**SpecFlow**
7. Build src/compliance/ — regulation annotation engine
8. Build static export CLI (npx specflow build)

**DocPulse**
9. Add TimeSeriesChart, FreshnessHeatmap, /pages/[slug] detail route
10. Add api/jobs/ background processing

### This Month

**Doccraft**
11. PDF parsing backend

**DocPulse**
12. HealthScore widget + ROICalculator

**All Repos**
13. Add tests/ folder to at least 2 repos
14. Add GitHub Topics/tags for discoverability
15. Add live demo URLs to READMEs once deployed

---

## How the Tools Connect

```
Writing           ->  10 live doc sites
                      "I write best-in-class documentation."

Creation Tools    ->  Doccraft AI + PPT-to-MP4
                      "I build tools that automate content creation."

Infrastructure    ->  SpecFlow (OpenAPI -> Portal)
                      "I build the systems that generate documentation."

AI Integration    ->  DocQuery (RAG chatbot)
                      "I understand how docs get consumed by AI."

Measurement       ->  DocPulse (Analytics dashboard)
                      "I treat docs as a product and measure their impact."
```

---

*Audit date: 2026-03-05*
*Next review: 2026-04-01*
