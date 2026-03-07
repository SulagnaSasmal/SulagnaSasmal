# Technical Writing Portfolio Plan

**Author:** Sulagna Sasmal  
**Role framing:** Senior Technical Writer · Information Architect  
**Standard:** Microsoft Style Guide (MSTP)  
**Audience:** Hiring managers and recruitment teams  
**Last updated:** March 2026

---

## Overview

This plan maps each phase of the portfolio to a defined content type, target audience, and delivery format. Every piece is governed by MSTP — active voice, second person, task orientation, accessible code blocks, and consistent terminology. Nothing here reads like a template exercise; each phase is grounded in real-world operational context.

---

## Phase 1 — API Documentation Portfolio

**Status:** In progress  
**Repo:** [`caseforge-api-docs`](https://github.com/SulagnaSasmal/caseforge-api-docs) · [`vaultpay-api-docs`](https://github.com/SulagnaSasmal/vaultpay-api-docs) · [`payments-api-guide`](https://github.com/SulagnaSasmal/payments-api-guide)

**What this phase proves:**

- Multi-language code samples: Python, JavaScript/Node.js, Java, C#, cURL
- Endpoint documentation that explains *why* a feature exists, not only *what* it does
- Error reference libraries with root-cause context and resolution paths
- End-to-end validation walkthroughs — from request construction to confirmed state change
- Authentication flows documented as processes, not just parameter lists

**Deliverables:**

| Artifact | Description |
|---|---|
| `code-samples/python/` | Python `requests`-based auth + CRUD flows |
| `code-samples/javascript/` | Node.js `fetch` + `axios` equivalents |
| `code-samples/java/` | Java `HttpClient` (JDK 11+) samples |
| `code-samples/csharp/` | C# `HttpClient` + `System.Net.Http` samples |
| `code-samples/curl/` | cURL one-liners with annotated headers |
| `README.md` | Full project overview with context, error handling, and navigation |

**MSTP focus areas for this phase:**

- Avoid "simply," "just," "easy," and other minimizing language
- Every error code gets a plain-English explanation and a corrective action
- Code comments explain the *intent*, not the obvious syntax
- Heading hierarchy: H2 for resource groups, H3 for individual endpoints

---

## Phase 2 — Developer Onboarding Series

**Status:** Planned  
**Repo:** [`developer-onboarding`](https://github.com/SulagnaSasmal/developer-onboarding) · [`payments-tutorials`](https://github.com/SulagnaSasmal/payments-tutorials)

**What this phase proves:**

- Structured onboarding paths keyed to developer role and experience level
- Authentication tutorial: OAuth 2.0 authorization code flow, from app registration to token refresh
- Webhook event catalog: event types, payload schemas, HMAC-SHA256 signature verification
- Getting-started guides that set up a working integration, not just a "hello world"

**Deliverables:**

| Artifact | Description |
|---|---|
| `getting-started.md` | Prerequisites → credentials → first API call → confirm response |
| `authentication-guide.md` | OAuth 2.0 flow with sequence diagram and token lifecycle |
| `webhook-catalog.md` | All event types, payload schemas, retry policy, signature verification |
| `quickstart/` | Per-language quickstarts (Python, Node.js, Java, C#) |

---

## Phase 3 — System Administrator Documentation

**Status:** Planned  
**Repo:** [`payplus-admin-guide`](https://github.com/SulagnaSasmal/payplus-admin-guide)

**What this phase proves:**

- Deployment guides written for ops teams, not developers — prerequisites, runtime checks, rollback procedures
- Configuration runbooks with environment-specific variable tables and warnings
- Upgrade procedures with staged steps, validation checkpoints, and fallback paths

**Deliverables:**

| Artifact | Description |
|---|---|
| `deployment-guide.md` | Step-by-step install with pre-flight checklist and post-install validation |
| `configuration-runbook.md` | Environment variables, feature flags, and connection string templates |
| `upgrade-procedure.md` | Version-to-version upgrade matrix with breaking changes highlighted |
| `troubleshooting.md` | Symptom → likely cause → resolution — no assumptions about which layer failed |

---

## Phase 4 — Product and UX Documentation

**Status:** Planned  
**Repo:** `product-ux-docs` (to be created)

**What this phase proves:**

- Task-based workflow documentation: users complete a goal, not read a feature list
- UI reference material: field-level definitions with valid values, constraints, and dependency notes
- Decision-tree documentation: branching logic presented as clear conditional steps

**Deliverables:**

| Artifact | Description |
|---|---|
| `workflow-guides/` | End-to-end task walkthroughs for key use cases |
| `ui-field-reference.md` | Every screen, field, and control — with allowed values and error states |
| `release-notes-template.md` | Structured release notes: what changed, what broke, what to do |

---

## Phase 5 — Post-Sale Onboarding Materials

**Status:** Planned  
**Repo:** `customer-onboarding-hub` (to be created)

**What this phase proves:**

- Role-based onboarding paths (admin, developer, end user, compliance officer)
- Contextualizing product features within real operational scenarios — not abstract feature descriptions
- Success milestones, validation checkpoints, and escalation paths

**Deliverables:**

| Artifact | Description |
|---|---|
| `onboarding-playbook.md` | Day 1, Week 1, Month 1 milestones by role |
| `integration-checklist.md` | Go-live readiness checklist with sign-off steps |
| `scenario-guides/` | Scenario-based docs tied to actual business operations |

---

## MSTP Compliance Reference

All content in this portfolio follows these Microsoft Style Guide principles:

| Principle | Application |
|---|---|
| Active voice | "The server returns a 401" not "A 401 is returned" |
| Second person | "You must include the `Authorization` header" |
| Sentence-length cap | 28 words maximum per sentence in procedure steps |
| Present tense | "The endpoint accepts" not "The endpoint will accept" |
| Avoid jargon | Spell out initialisms on first use |
| Accessible code | Every code block has a language tag and a description |
| Consistent terminology | One term per concept — never alternating (e.g., "token"/"key") |
| Scannable headings | Verb-noun pattern for procedures: "Authenticate a session" |

---

## Existing Portfolio (Live)

| Project | Type | URL |
|---|---|---|
| FraudShield AI Engine Docs | AI/ML fraud detection API | [View →](https://sulagnasasmal.github.io/fraudshield-docs/) |
| PayPlus REST API Developer Reference | Developer API reference | [View →](https://sulagnasasmal.github.io/payments-api-guide/) |
| PayPlus Enterprise Admin Guide | Enterprise admin docs | [View →](https://sulagnasasmal.github.io/payplus-admin-guide/) |
| VaultPay API Docs | Fintech payment API | [View →](https://sulagnasasmal.github.io/vaultpay-api-docs/) |
| CaseForge API Docs | Enterprise AML/SAR API | [View →](https://sulagnasasmal.github.io/caseforge-api-docs/) |
| DocCraft AI | Next.js documentation generator | [View →](https://doccraft-ten.vercel.app/) |
| SpecFlow | OpenAPI → interactive developer portal | [View →](https://sulagnasasmal.github.io/specflow/) |
| SunBridge Asset Atrium Platform Docs | Investment platform architecture | [View →](https://sulagnasasmal.github.io/enterprise-investment-management-platform-docs/) |
