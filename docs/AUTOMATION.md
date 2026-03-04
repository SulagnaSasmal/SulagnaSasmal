# Documentation Automation Guide

This guide explains how documentation is automated and maintained across the portfolio.

---

## 📚 Documentation System Overview

The documentation system is fully automated via GitHub Actions workflows and Node.js scripts. Documentation is generated, validated, and updated continuously.

### Key Components

1. **Generation Scripts** - Create documentation from projects
2. **Validation System** - Ensures documentation quality
3. **GitHub Actions** - Orchestrates automation
4. **Historical Tracking** - Maintains CHANGELOG automatically

---

## Auto-Generated Documentation

### 1. SETUP.md (Getting Started)

**Auto-generated from:**
- package.json metadata
- Project structure
- Dependency information

**Includes:**
- Prerequisites
- Step-by-step installation
- Configuration guide
- Troubleshooting section

**Updated:** Weekly or on-demand

### 2. ARCHITECTURE.md (System Design)

**Auto-generated from:**
- Code structure analysis
- Project type detection
- Configuration files

**Includes:**
- System overview diagram
- Component descriptions
- Data flow documentation
- Design patterns used

**Updated:** Weekly or on-demand

### 3. CHANGELOG.md (Version History)

**Auto-generated from:**
- Git commit messages
- Release tags
- Version history

**Format:**
```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
### Changed
### Fixed
### Security
```

**Updated:** On each release

---

## Documentation Quality Standards

### Minimum Requirements

✅ **README.md** (Project overview)
- Project description
- Quick start guide
- Feature overview
- Technology stack
- Contributing info

✅ **SETUP.md** (Installation guide)
- Prerequisites listed
- Step-by-step installation
- Configuration instructions
- Troubleshooting section

✅ **ARCHITECTURE.md** (System design)
- High-level overview
- Component descriptions
- Data flow diagram
- Design patterns

✅ **CHANGELOG.md** (Release history)
- Version information
- Release dates
- Changes per version

### Enhanced Documentation (for complex projects)

📚 **Additional files:**
- API.md - API documentation
- CONTRIBUTING.md - Contribution guidelines
- EXAMPLES/ - Code examples
- TROUBLESHOOTING.md - Common issues
- FAQ.md - Frequently asked questions

---

## Automation Workflows

### Weekly Documentation Check

**Triggered:** Every Sunday at 4 AM UTC

**Actions:**
1. Generate documentation files
2. Validate file structure
3. Check for broken links
4. Auto-commit changes

**Status:** Check GitHub Actions tab

### On-Demand Generation

**Manual trigger:**
```bash
# Via GitHub UI: Actions → Documentation Excellence → Run workflow
```

**Local generation:**
```bash
node scripts/generate-documentation.js
```

---

## Documentation Scripts

### generate-documentation.js

**Purpose:** Create documentation files

**Usage:**
```bash
node scripts/generate-documentation.js
```

**Generated Files:**
- docs/SETUP.md
- docs/ARCHITECTURE.md
- CHANGELOG.md

**Configuration:**
Edit the script to customize templates or add new doc types.

### Example Usage

```javascript
const {
  generateDocumentation,
  validateDocumentation,
} = require('./scripts/generate-documentation');

// Generate docs
generateDocumentation('./myproject');

// Validate docs
const validation = validateDocumentation('./myproject');
console.log(`Coverage: ${validation.coverage}%`);
```

---

## Documentation Structure

### Standard Layout

```
project-root/
├── README.md                 # Project overview
├── CHANGELOG.md             # Release history
├── CONTRIBUTING.md          # Contribution guide
├── LICENSE                  # License file
├── docs/
│   ├── SETUP.md            # Installation guide
│   ├── ARCHITECTURE.md      # System design
│   ├── API.md              # API reference
│   ├── EXAMPLES.md         # Code examples
│   └── images/             # Documentation images
└── .github/
    └── ISSUE_TEMPLATE.md   # Issue template
```

### README.md Template

```markdown
# Project Name

Brief description

[![badges]](links)

## Features
- Feature 1

## Quick Start
```bash
npm install
```

## Documentation
- [Setup Guide](docs/SETUP.md)
- [Architecture](docs/ARCHITECTURE.md)
- [API Reference](docs/API.md)

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md)

## License
MIT
```

---

## Versioning & Releases

### Version Format

Semantic Versioning: `MAJOR.MINOR.PATCH`

Example: `1.2.3`
- `1` = Major version (breaking changes)
- `2` = Minor version (new features)
- `3` = Patch version (bug fixes)

### Creating a Release

1. **Update CHANGELOG.md**
   - Add new version section
   - List changes

2. **Create Git Tag**
   ```bash
   git tag v1.2.3
   git push origin v1.2.3
   ```

3. **Release Notes**
   - Add details to GitHub Releases tab
   - Reference CHANGELOG.md

---

## Link Validation

### Automated Checking

Links are checked weekly for validity:
- Internal links (README → docs/SETUP.md)
- External links (GitHub URLs, etc.)
- Anchor links (#section-name)

### Fixing Broken Links

If a link check fails:
1. Review the error report
2. Fix the broken link
3. Re-trigger workflow or wait for weekly run

---

## Documentation Best Practices

### DO ✅

- Keep documentation close to code
- Update docs when code changes
- Use clear, concise language
- Include code examples
- Add diagrams for complex concepts
- Update CHANGELOG with each release
- Keep links in sync with site structure

### DON'T ❌

- Leave outdated documentation
- Write overly technical without explanation
- Include hard-coded file paths
- Skip CHANGELOG entries
- Break internal links
- Store docs in multiple places

---

## Common Patterns

### API Documentation

```markdown
## POST /users

### Request

\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com"
}
\`\`\`

### Response

\`\`\`json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
\`\`\`

### Errors

- 400: Invalid input
- 409: Email already exists
```

### Getting Started

```markdown
## Installation

\`\`\`bash
npm install
\`\`\`

## First Steps

1. Clone the repo
2. Install dependencies
3. Create .env file
4. Run \`npm start\`
5. Open http://localhost:3000
```

---

## Maintenance Schedule

| Task | Frequency | Owner |
|------|-----------|-------|
| Generate docs | Weekly | Automation |
| Validate links | Weekly | Automation |
| Update CHANGELOG | Per release | Developer |
| Review docs | Monthly | Team |
| Archive old versions | Quarterly | Team |

---

## Troubleshooting

### Docs not updating

**Solution:**
1. Check GitHub Actions workflow status
2. Verify GITHUB_TOKEN has write permissions
3. Re-trigger workflow manually

### Broken links detected

**Solution:**
1. Identify broken links in error report
2. Fix file paths or URLs
3. Verify links locally
4. Re-run validation

### Documentation template outdated

**Solution:**
1. Update template in generate-documentation.js
2. Re-generate documentation
3. Review changes
4. Commit updates

---

## Integration with CI/CD

Documentation workflows integrate with your CI/CD pipeline:

1. **On Push:** Auto-validation
2. **Weekly:** Full generation and validation
3. **On Release:** Auto-update CHANGELOG
4. **On Merge:** Update documentation site (if deployed)

---

## Advanced Usage

### Custom Templates

Edit templates in `scripts/generate-documentation.js`:

```javascript
function generateSetupGuide(projectPath, metadata) {
  // Customize the SETUP.md template here
  return `Your custom template`;
}
```

### Extend Generation

Add new document types:

```javascript
function generateFAQ(projectPath) {
  return `# FAQ\n...`;
}
```

### Deployment Integration

Deploy docs site automatically:

```yaml
- name: Deploy documentation
  run: |
    npm run build:docs
    firebase deploy --only hosting
```

---

## Resources

- [Keep a CHANGELOG](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)
- [GitHub README Best Practices](https://github.com/jehna/readme-best-practices)
- [Write the Docs](https://www.writethedocs.org/)

---

*Last Updated: 2026-03-04*
