<div align="center">

# Hi, I'm Sulagna Sasmal 👋

**Technical Writer · Documentation Engineer · API Documentation Specialist**

I build documentation systems that behave like software — version-controlled, peer-reviewed, automatically built, and published.
My work spans fintech API references, enterprise compliance platforms, and end-to-end Docs-as-Code pipelines.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-sulagnasasmal-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sulagnasasmal)
[![GitHub followers](https://img.shields.io/github/followers/SulagnaSasmal?style=flat-square&logo=github&label=Follow)](https://github.com/SulagnaSasmal)
[![Portfolio](https://img.shields.io/badge/Portfolio-sulagnasasmal.github.io-E8A84C?style=flat-square&logo=githubpages&logoColor=black)](https://sulagnasasmal.github.io/sulagnasasmal-site/)

</div>

---

## About Me

I specialize in **technical documentation for regulated industries** — primarily financial technology, compliance platforms, and developer-facing APIs. My documentation work is aligned to enterprise standards including **NICE Actimize** (IFM, SAM, CDD, Sanctions), **PCI DSS**, **BSA/AML**, **FATF**, and **FinCEN** regulatory frameworks.

My approach treats documentation the way engineers treat code:

- ✍️ **Write** in Markdown / structured formats
- 🔀 **Review** via Git pull requests
- ⚙️ **Build** with CI/CD pipelines (GitHub Actions, MkDocs, Sphinx)
- 🔍 **Validate** with automated style linting (Vale)
- 🚀 **Publish** continuously to GitHub Pages / Netlify / S3

---

## Portfolio Projects

Each project below is a fully authored, end-to-end documentation site — built using Docs-as-Code principles and hosted on GitHub Pages.

---

### 🌐 Personal Portfolio Site

> *A light-theme personal portfolio showcasing my work, background, and expertise — built as a static site and hosted on GitHub Pages.*

[![Live Site](https://img.shields.io/badge/Live%20Site-sulagnasasmal.github.io-E8A84C?style=flat-square&logo=githubpages&logoColor=black)](https://sulagnasasmal.github.io/sulagnasasmal-site/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-sulagnasasmal--site-181717?style=flat-square&logo=github)](https://github.com/SulagnaSasmal/sulagnasasmal-site)

#### What is it?

A hand-coded personal portfolio site — built as a single HTML file with no frameworks. Inspired by the minimal, content-first design pattern of leading technical portfolio sites. Covers my professional background, featured documentation projects, compliance expertise, experience timeline, and a personal section on travel and food.

#### Why I built it

To have a human-facing home on the web — a place that shows not just *what* I've built, but *who I am* as a practitioner. The technical portfolio projects demonstrate depth; this site shows the full picture.

#### Who it's for

| Audience | What they find here |
|---|---|
| Recruiters / hiring managers | Full professional background, featured work, skills, and contact |
| Collaborators | Links to all portfolio projects with context on each |
| Anyone curious | A glimpse into the person behind the documentation |

#### Key design decisions

`Light theme` · `Amber accent (#E8A84C)` · `Inter + Outfit + JetBrains Mono` · `No frameworks`
`Single HTML file` · `GitHub Pages hosted` · `Mobile-friendly layout`

---

### 🏦 VaultPay Payment API Documentation

> *Enterprise-grade REST API reference for a fintech payment processing platform, aligned to NICE Actimize and global financial compliance standards.*

[![Live Site](https://img.shields.io/badge/Live%20Site-sulagnasasmal.github.io-14b8a6?style=flat-square&logo=githubpages&logoColor=white)](https://sulagnasasmal.github.io/vaultpay-api-docs/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-vaultpay--api--docs-181717?style=flat-square&logo=github)](https://github.com/SulagnaSasmal/vaultpay-api-docs)

#### What is it?

A comprehensive REST API reference for **VaultPay** — a fictional but realistically modelled payment processing platform. The documentation covers the complete payments lifecycle from authentication through settlement, dispute resolution, and compliance reporting. Written and structured to match the quality bar of real-world developer portals (Stripe, Adyen, Braintree).

#### Why I built it

To demonstrate professional-grade **fintech API documentation** skills in a single, self-contained portfolio piece. The goal was to show I can document not just endpoints, but the entire ecosystem around a payment API: authentication patterns, webhook security, test data, error handling, compliance obligations, and risk intelligence integrations.

#### Who it's for

| Audience | What they find here |
|---|---|
| Backend developers | Complete endpoint reference, request/response schemas, curl examples, SDKs |
| Compliance teams | PCI DSS, PSD2/SCA, BSA/AML, GDPR coverage, AML alert management |
| QA / Sandbox users | Test card numbers, ACH bank accounts, decline codes, webhook test events |
| Security engineers | HMAC-SHA256 webhook verification, 3D Secure flow, SCA exemption handling |

#### How it's structured

```
Getting Started
├── Authentication (API keys, OAuth, request signing)
├── Idempotency & Pagination
└── Test Data (success/decline cards, 3DS cards, ACH accounts)

Core API
├── Payments (create, capture, cancel, list)
├── Refunds (full and partial)
├── Payouts (bank transfers, FX)
└── Customers & Payment Methods

Compliance & Risk (NICE Actimize aligned)
├── Risk Scoring — IFM-AI model, risk signals, velocity checks
├── 3D Secure / SCA — auth flow, exemption framework (PSD2)
├── Disputes — lifecycle, evidence submission, webhooks
├── AML Monitoring — SAM transaction monitoring, structuring, PEP flags
├── KYC Verification — CDD identity checks, document verification
└── Sanctions Screening — OFAC, UN, EU, HMT, PEP, Adverse Media

Webhooks
├── Event reference (25+ event types)
└── Signature verification (HMAC-SHA256)

Reference
├── Error codes
├── Rate limits
└── Changelog
```

#### Key standards covered

`PCI DSS Level 1` · `SOC 2 Type II` · `ISO 27001` · `GDPR` · `CCPA` · `BSA/AML` · `PSD2 / SCA` · `FATF`
**NICE Actimize**: IFM-AI (fraud/risk) · SAM (AML monitoring) · CDD (KYC) · Sanctions

---

### ⚖️ CaseForge Enterprise Case Management API Docs

> *API reference for an enterprise AML/compliance case management platform, covering SAR filing, tamper-evident audit trails, and regulatory workflow automation.*

[![Live Site](https://img.shields.io/badge/Live%20Site-sulagnasasmal.github.io-E8A84C?style=flat-square&logo=githubpages&logoColor=black)](https://sulagnasasmal.github.io/caseforge-api-docs/caseforge-api-docs.html)
[![GitHub Repo](https://img.shields.io/badge/GitHub-caseforge--api--docs-181717?style=flat-square&logo=github)](https://github.com/SulagnaSasmal/caseforge-api-docs)

#### What is it?

A v10.2 API reference for **CaseForge** — an enterprise compliance case management platform used by financial institutions to manage AML investigations, file Suspicious Activity Reports (SARs) with FinCEN, and maintain tamper-evident audit trails. The documentation is styled for an enterprise audience (compliance officers, legal teams, system integrators) rather than consumer developers.

#### Why I built it

To demonstrate my ability to document **high-stakes, regulated enterprise software** where accuracy and completeness are non-negotiable. Case management and SAR filing APIs require precise documentation of status lifecycles, required fields, error conditions, and regulatory filing procedures — a very different challenge from standard CRUD API docs.

#### Who it's for

| Audience | What they find here |
|---|---|
| Compliance officers | SAR lifecycle, FinCEN BSA e-filing integration, case status workflows |
| System integrators | Full API reference, authentication, sandbox credentials, webhook payloads |
| AML analysts | Alert ingestion, case assignment, escalation paths, goAML export |
| Legal / Audit teams | Tamper-evident audit trail, SHA-256 hash chaining, signed PDF export |

#### How it's structured

```
Getting Started
├── Authentication (Bearer tokens, API key rotation)
├── Compliance & Security (SOC 2, ISO 27001, FedRAMP, FinCEN BSA, FATF, GDPR)
└── Sandbox Environment (test credentials, pre-loaded case types)

Case Management
├── Work Items (create, list, update, assign, close)
├── Case Workflows (state machine, transition rules)
└── Attachments & Evidence

SAR Management (v10.2)
├── POST /api/v1/sars — Create draft SAR
├── GET /api/v1/sars — List / filter SARs
├── PATCH /api/v1/sars/{id}/status — Transition status
└── SAR Status Lifecycle: draft → pending_review → approved → filed → returned → withdrawn

Audit Trail
├── GET /api/v1/audit/events — Query tamper-evident log
├── POST /api/v1/audit/export — Export (JSON / CSV / signed PDF)
└── SHA-256 hash chain integrity model

Notifications & Webhooks
├── POST /api/v1/webhooks — Register endpoint
├── GET /api/v1/webhooks — List subscriptions
└── 15 event types: case.*, sar.*, policy.*, audit.*, user.*

Reference
├── Error codes & status transitions
├── Rate limits
└── Changelog (v10.2)
```

#### Key standards covered

`FinCEN BSA e-filing` · `FATF Recommendation 20` · `EU AMLD6` · `FINRA Rule 3310` · `GDPR / CCPA`
`SOC 2 Type II` · `ISO 27001` · `FedRAMP (in process)` · `goAML` · `ACAMS`

---

### ⚙️ DocForge — Docs-as-Code Platform

> *An interactive demonstration of a complete Docs-as-Code platform — from Markdown authoring through CI/CD validation to multi-format publishing.*

[![Live Site](https://img.shields.io/badge/Live%20Site-sulagnasasmal.github.io-a78bfa?style=flat-square&logo=githubpages&logoColor=white)](https://sulagnasasmal.github.io/Documentation-Center-Platform/docforge-platform.html)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Documentation--Center--Platform-181717?style=flat-square&logo=github)](https://github.com/SulagnaSasmal/Documentation-Center-Platform)

#### What is it?

A fully interactive **Docs-as-Code platform dashboard** built as a single-page application. It demonstrates the complete documentation engineering pipeline — from writing in Markdown to style-linting, building multi-format outputs, and deploying via CI/CD. The platform includes 6 interactive modules: Dashboard, Live Editor, Content Map, Style Linter, Build Outputs, and Configuration.

#### Why I built it

To show platform-level documentation engineering thinking, not just writing skill. This project demonstrates I understand the **tooling, infrastructure, and automation** that modern documentation teams depend on — and that I can design, document, and demonstrate those systems clearly.

#### Who it's for

| Audience | What they find here |
|---|---|
| Engineering managers | End-to-end Docs-as-Code workflow with CI/CD integration |
| Documentation teams | Platform capabilities: editor, linter, content map, build outputs |
| Recruiters / hiring managers | Evidence of platform-level technical documentation thinking |
| Collaborators | Living portfolio hub linking to all project repos |

#### How the pipeline works

```
Write (Markdown / MDX / OpenAPI)
  └─► Commit & Pull Request (Git / GitHub)
        └─► CI Pipeline triggers (GitHub Actions)
              ├─► Style Lint (Vale rules — passive voice, terminology, broken links)
              ├─► Build (MkDocs / Sphinx / Hugo → HTML, PDF, OpenAPI JSON)
              └─► Deploy (GitHub Pages / Netlify / S3 CDN)
```

#### Platform modules

| Module | What it does |
|---|---|
| **Dashboard** | Build health, content coverage, contributor metrics, pipeline run history |
| **Live Editor** | Split-pane Markdown editor with real-time preview and inline Vale linting |
| **Content Map** | Visual doc tree — spot orphaned pages, broken refs, coverage gaps |
| **Style Linter** | Vale rule enforcement: passive voice, banned phrases, readability, terminology drift |
| **Build Outputs** | View and download HTML site, PDF manual, OpenAPI spec, search index per build |
| **Configuration** | Site metadata, nav structure, theme tokens, lint rules, CI triggers, deploy targets |

#### Key concepts demonstrated

`Docs-as-Code` · `Single-source publishing` · `CI/CD for documentation` · `Vale style linting`
`Multi-format output` · `Git-native versioning` · `GitHub Pages deployment` · `Information architecture`

---

### 📄 Docs-as-Code Portal

> *A traditional documentation portal explaining the Docs-as-Code methodology — what it is, how the pipeline works, and how to use the platform.*

[![Live Site](https://img.shields.io/badge/Live%20Site-sulagnasasmal.github.io-a78bfa?style=flat-square&logo=githubpages&logoColor=white)](https://sulagnasasmal.github.io/docs-as-code-portal/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-docs--as--code--portal-181717?style=flat-square&logo=github)](https://github.com/SulagnaSasmal/docs-as-code-portal)

#### What is it?

A full documentation portal — built as a portal, not a dashboard — that explains the Docs-as-Code methodology, the five-stage pipeline, and how the Documentation Center platform works. It reads like real product documentation: left nav, table of contents, code examples, step-by-step guides, callouts, comparison tables, and prev/next navigation.

#### Why I built it

To demonstrate the difference between a **documentation system** (the dashboard) and a **documentation portal** (this site) — and to show I can build both. This project is also self-referential: the Docs-as-Code portal is itself built using Docs-as-Code principles, hosted on GitHub Pages, version-controlled in Git.

#### Who it's for

| Audience | What they find here |
|---|---|
| Recruiters / hiring managers | Proof of portal-quality writing across 16 pages of structured technical content |
| Documentation engineers | CI/CD workflow YAML, Vale config, branching strategy, multi-format output setup |
| Technical writers | Getting started guide, style linting examples, commit conventions, PR process |
| Engineering teams | Why Docs-as-Code matters, how to integrate docs into a software CI pipeline |

#### How it's structured

```
Getting Started
├── Introduction — what the platform is, purpose, who it's for
├── What is Docs-as-Code? — methodology, 5 principles, traditional vs DaC comparison
└── Quick Start Guide — prerequisites, setup steps, first pipeline run

Core Concepts
├── The Docs Pipeline — all 5 stages in detail
├── Version Control — branching strategy, commit conventions, PR process
├── CI/CD Integration — GitHub Actions workflow, build triggers, deploy targets
├── Style Linting — Vale config, rule categories, before/after examples
└── Multi-Format Output — HTML, PDF, OpenAPI JSON, search index

Platform Modules (6 guides)
└── Dashboard · Live Editor · Content Map · Style Linter · Build Outputs · Configuration

Reference
├── Configuration Schema — full field reference with examples
└── Changelog
```

#### Key concepts demonstrated

`Documentation portal design` · `16-page structured content` · `GitHub Actions CI/CD` · `Vale linting`
`MkDocs configuration` · `Branching strategy` · `Docs-as-Code methodology` · `Self-hosted on GitHub Pages`

---

---

## Tools I've Built

Beyond documentation, I build automation tools that solve real workflow problems.

---

### 🤖 DocCraft AI — Intelligent Documentation Generator

> *A full-stack AI application that converts raw content into polished, MSTP-compliant documentation — with auto-compliance checking, one-click fixes, and context-aware generation.*

[![GitHub Repo](https://img.shields.io/badge/GitHub-Doccraft-181717?style=flat-square&logo=github)](https://github.com/SulagnaSasmal/Doccraft)
[![Next.js](https://img.shields.io/badge/Next.js_14-App_Router-000000?style=flat-square&logo=next.js&logoColor=white)](https://github.com/SulagnaSasmal/Doccraft)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=flat-square&logo=openai&logoColor=white)](https://github.com/SulagnaSasmal/Doccraft)

#### What it does

Feed DocCraft raw content — meeting notes, specs, screenshots, anything — and it produces publication-ready documentation. It thinks like a senior technical writer: analyzing gaps, asking clarifying questions, and then generating structured output aligned to your existing style.

```
Upload raw content + context docs (style guide, glossary, OpenAPI spec)
  └─► AI gap analysis → clarifying Q&A loop
        └─► GPT-4o generates structured documentation
              └─► MSTP compliance check runs automatically
                    └─► One-click Fix per issue (instant replace or AI rewrite)
                          └─► Export: HTML · Markdown · PDF
```

#### Key features

| Feature | What it does |
|---|---|
| **Context Layer** | Upload previous docs, glossaries, style guides, or OpenAPI specs — AI writes consistently with your existing content |
| **Structured glossary** | Upload a JSON glossary with `forbidden_terms` / `preferred_terms` to enforce terminology automatically |
| **MSTP Compliance Mode** | Auto-runs after generation — checks forbidden words, passive voice, Title Case headings, non-imperative steps, callout format |
| **One-click Fix** | Instant string replace for terminology; AI-assisted rewrite for voice/structure issues |
| **Inline AI editing** | Select any text → Simplify, Expand, Add Example, Make Concise |
| **PDF export** | Print-ready formatting via browser print dialog — zero extra dependencies |

#### Why I built it

To demonstrate that a technical writer can engineer the tools that eliminate manual documentation work — not just describe them. DocCraft is a full production-quality Next.js application deployed on Vercel, with a real AI pipeline, style enforcement engine, and compliance workflow.

#### Tech stack

`Next.js 14` · `TypeScript` · `Tailwind CSS` · `OpenAI GPT-4o / GPT-4o-mini` · `React Markdown` · `Vercel`

---

### 🎬 PPT → MP4 Documentation Automation

> *An end-to-end pipeline that converts PowerPoint presentations into narrated MP4 videos — no screen recording, no manual voiceover.*

[![GitHub Repo](https://img.shields.io/badge/GitHub-ppt--to--mp4--doc--automation-181717?style=flat-square&logo=github)](https://github.com/SulagnaSasmal/ppt-to-mp4-doc-automation)
[![Python](https://img.shields.io/badge/Python-FastAPI-3776AB?style=flat-square&logo=python&logoColor=white)](https://github.com/SulagnaSasmal/ppt-to-mp4-doc-automation)
[![Azure TTS](https://img.shields.io/badge/Azure-Text--to--Speech-0078D4?style=flat-square&logo=microsoft-azure&logoColor=white)](https://github.com/SulagnaSasmal/ppt-to-mp4-doc-automation)

#### What it does

Fully automated pipeline: upload a `.pptx` → get back a narrated `.mp4`. No manual recording, no screen capture.

```
PowerPoint file
  └─► Extract slide notes (python-pptx)
        └─► Generate AI narration (Azure TTS — Jenny Neural)
              └─► Set slide timings (PowerPoint COM automation)
                    └─► Export animated video (PowerPoint CreateVideo)
                          └─► Mux audio + video (FFmpeg)
                                └─► Download final.mp4
```

#### Why I built it

Documentation teams spend hours recording walkthroughs manually. This tool eliminates that — write your slide notes once, get a narrated video automatically. Built to demonstrate that technical writers can engineer the tools their teams depend on, not just document them.

#### Tech stack

`Python` · `FastAPI` · `Azure Text-to-Speech` · `win32com (PowerPoint COM)` · `FFmpeg` · `Jinja2` · `pywin32`

---

## Skills & Tools

| Category | Tools & Technologies |
|---|---|
| **Documentation formats** | Markdown, MDX, OpenAPI 3.1, DITA concepts, reStructuredText |
| **Docs platforms** | MkDocs, Sphinx, Hugo, Docusaurus, ReadTheDocs, Confluence |
| **CI/CD & automation** | GitHub Actions, Vale linting, link checkers, build pipelines |
| **API documentation** | REST APIs, webhooks, request/response schemas, curl examples, SDK guides |
| **Compliance domains** | PCI DSS, BSA/AML, FinCEN, FATF, GDPR, SOC 2, ISO 27001, PSD2/SCA |
| **NICE Actimize suite** | IFM-AI (fraud), SAM (AML), CDD (KYC), Sanctions Screening |
| **Dev tools** | Git, GitHub, VS Code, Python, HTML/CSS, Bash, TypeScript, Next.js |
| **AI & automation** | OpenAI GPT-4o, Azure TTS, FastAPI, FFmpeg, GitHub Copilot, Claude, Napkin AI |
| **Methodologies** | Docs-as-Code, structured authoring, topic-based writing, information architecture, MSTP |

---

## What's Next

This portfolio is a living document — updated as new projects are added.

| Status | Project | Description |
|---|---|---|
| ✅ Live | [VaultPay API Docs](https://github.com/SulagnaSasmal/vaultpay-api-docs) | Fintech payment API reference with NICE Actimize compliance coverage |
| ✅ Live | [CaseForge API Docs](https://github.com/SulagnaSasmal/caseforge-api-docs) | Enterprise AML case management & SAR filing API docs |
| ✅ Live | [Documentation Center Dashboard](https://github.com/SulagnaSasmal/Documentation-Center-Platform) | Interactive Docs-as-Code platform dashboard |
| ✅ Live | [Docs-as-Code Portal](https://github.com/SulagnaSasmal/docs-as-code-portal) | Traditional documentation portal explaining the DaC methodology |
| ✅ Live | [Personal Portfolio Site](https://github.com/SulagnaSasmal/sulagnasasmal-site) | Light-theme personal site — work, background, expertise, and a bit of personality |
| 🛠️ Built | [PPT → MP4 Automation](https://github.com/SulagnaSasmal/ppt-to-mp4-doc-automation) | Python tool: PowerPoint + Azure TTS + FFmpeg → narrated video pipeline |
| 🚀 Live | [DocCraft AI](https://github.com/SulagnaSasmal/Doccraft) | Next.js + GPT-4o app: raw content → MSTP-compliant documentation with auto-compliance and one-click fixes |
| 🔜 Coming | *More projects* | Adding as I build — check back soon |

---

## Let's Connect

If you're looking for a Technical Writer who thinks like an engineer and writes for developers, compliance teams, and business stakeholders alike — let's talk.

[![LinkedIn](https://img.shields.io/badge/Connect%20on%20LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sulagnasasmal)
[![GitHub](https://img.shields.io/badge/Follow%20on%20GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SulagnaSasmal)

---

<div align="center">
  <sub>Built with Docs-as-Code principles · Maintained in Git · © 2026 Sulagna Sasmal</sub>
</div>
