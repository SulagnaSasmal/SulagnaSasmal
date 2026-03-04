# Repository Standardization Guide

This guide outlines the standards and best practices for all repositories in this portfolio.

---

## 📋 Repository Standards Checklist

Every repository should meet these requirements:

### Essential Files
- ✅ **README.md** - Comprehensive project documentation (minimum 100 words)
- ✅ **LICENSE** - Open source license file (MIT recommended)
- ✅ **.gitignore** - Ignore unnecessary files

### Recommended Files
- 📄 **CONTRIBUTING.md** - Contribution guidelines
- 📝 **CHANGELOG.md** - Version history and release notes
- 📚 **docs/** - Additional documentation
- 🧪 **tests/** or **test/** - Test files and coverage

### Automation
- ⚙️ **.github/workflows/** - CI/CD workflows
- 🔍 **.github/pull_request_template.md** - PR template
- 🐛 **.github/issue_template.md** - Issue template

---

## 📝 README.md Structure

Every README should follow this structure:

```markdown
# Project Name

One-liner description

[![License](badge)](#) [![Status](badge)](#) [![Language](badge)](#)

## Overview
Brief description (2-3 sentences)

## Why This Project
Problem it solves

## Features
- Feature 1
- Feature 2
- Feature 3

## Quick Start

### Prerequisites
- Prerequisite 1

### Installation
```bash
# Installation steps
```

### Usage
```bash
# Usage examples
```

## Documentation
- 📖 [Getting Started](docs/)
- 🏗️ [Architecture](docs/ARCHITECTURE.md)
- 📚 [API Reference](docs/API.md)

## Examples
Code examples

## Technology Stack
- Languages
- Frameworks
- Databases

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md)

## License
MIT License

## Support
Contact and links
```

---

## 🏷️ Repository Metadata

### Description Format
`[What it does] - [Tech stack] - [Status]`

**Examples:**
- "REST API Documentation - MkDocs + GitHub Pages - Active"
- "Python Automation Tool - Python, Bash, Docker - Maintained"
- "Next.js Application - React, TypeScript, Node.js - Active"

### Topics/Tags
Add 3-5 relevant topics:
- Primary technology (javascript, python, etc.)
- Project type (api-reference, automation, etc.)
- Domain (fintech, documentation, etc.)
- Status (if archived)

**Examples:**
```
[python, automation, documentation, fintech, active]
[javascript, typescript, api-reference, rest-api, payments]
[nextjs, react, web-app, typescript, open-source]
```

### Homepage URL
Link to:
- Live deployment (if available)
- Documentation site
- GitHub Pages
- Or repository if none above

---

## 🎨 Badges

Every README should include badge bar at the top:

```markdown
[![License](badge)](LICENSE)
[![Status](badge)]()
[![Language](badge)]()
```

Badge styles:
- **License:** `MIT`, `Apache-2.0`, `GPL-3.0`
- **Status:** `active`, `maintained`, `archived`, `experimental`
- **Languages:** `JavaScript`, `TypeScript`, `Python`, etc.

### Tech Stack Badges

Display tech stack prominently:

```markdown
**Stack:** ![Next.js](badge) ![TypeScript](badge) ![React](badge)
```

---

## 📚 Documentation Structure

### Minimum Documentation
1. **README.md** - Project overview and quick start
2. **CONTRIBUTING.md** - How to contribute
3. **LICENSE** - License file

### Complete Documentation (for complex projects)
```
docs/
├── README.md             # Docs overview
├── GETTING_STARTED.md    # Setup and installation
├── ARCHITECTURE.md       # System design
├── API.md               # API documentation
├── CONTRIBUTING.md      # Contribution guide
├── CHANGELOG.md         # Release history
└── EXAMPLES/            # Code examples
    ├── basic.md
    └── advanced.md
```

---

## 🔄 Automation & CI/CD

### Minimum Workflows
At least one workflow for:
- Testing (runs on push)
- Linting (ensures code quality)
- Deployment (if applicable)

### Workflow Examples
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm test
```

---

## ✅ Quality Indicators

### Code Quality
- 📊 **Test Coverage** - Minimum 70% coverage
- 🔍 **Linting** - No linting errors
- 📝 **Documentation** - All public functions documented
- 🏗️ **Architecture** - Clear structure and design patterns

### Maintenance
- 🟢 **Active** - Updates within last month
- 🟡 **Maintained** - Updates within last 3 months
- 🔴 **Archived** - No recent updates

### Best Practices
- ✅ Version control with meaningful commits
- ✅ Semantic versioning (major.minor.patch)
- ✅ Release tags for each version
- ✅ Changelog for each release

---

## 🚀 Repository Organization

### By Type

**Documentation Projects:**
- .github/
- docs/
- README.md
- CONTRIBUTING.md

**Code Projects:**
- src/ or scripts/
- tests/
- docs/
- README.md
- package.json or requirements.txt

**Automation Projects:**
- scripts/
- .github/workflows/
- README.md
- CONTRIBUTING.md

---

## 📊 Validation

Run standardization checks:

```bash
# Validate standards
node scripts/repo-standards-validator.js

# Check metadata
node scripts/sync-repo-metadata.js

# Generate badges
node scripts/generate-badges.js --examples
```

---

## 🔗 Portfolio Integration

### Link from Profile
Every public repository should be considered for:
- Pinned in profile (6 slots for best projects)
- Linked in portfolio

### Portfolio Criteria
- Demonstrates expertise
- Professional quality
- Active maintenance
- Meaningful contribution

---

## 📋 Enforcement

Standards are checked:
- Weekly via GitHub Actions workflow
- As part of PR review process
- Quarterly in portfolio audit

### Compliance Levels
- 🟢 **Excellent** (90%+) - Professional grade
- 🟢 **Good** (80-89%) - Production ready
- 🟡 **Fair** (70-79%) - Needs improvement
- 🟡 **Work** (60-69%) - Significant gaps
- 🔴 **Critical** (<60%) - Requires action

---

## 📚 Resources

- [GitHub README Best Practices](https://github.com/jehna/readme-best-practices)
- [Open Source Guides](https://opensource.guide/)
- [Keep a CHANGELOG](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)

---

## 🤝 Questions?

Refer to template files in `.github/templates/` or check existing projects for examples.

---

*Last Updated: 2026-03-04*
