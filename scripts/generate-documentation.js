#!/usr/bin/env node

/**
 * Documentation Generator
 * Auto-generates documentation from code and project structure
 */

const fs = require('fs');
const path = require('path');

/**
 * Parse package.json for metadata
 */
function getProjectMetadata(projectPath) {
  const packageJsonPath = path.join(projectPath, 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    return null;
  }

  try {
    const content = fs.readFileSync(packageJsonPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

/**
 * Generate SETUP.md
 */
function generateSetupGuide(projectPath, metadata) {
  const setupMd = `# Getting Started

This guide will help you get the project up and running.

## Prerequisites

${metadata?.engines ? `- Node.js ${metadata.engines.node || '18+'}` : '- Node.js 18+'}
- npm or yarn package manager
- Git for version control

## Installation

### Step 1: Clone the Repository

\`\`\`bash
git clone https://github.com/[username]/[repo-name].git
cd [repo-name]
\`\`\`

### Step 2: Install Dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### Step 3: Environment Setup

\`\`\`bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
nano .env
\`\`\`

### Step 4: Run the Project

\`\`\`bash
npm start
# or
npm run dev
\`\`\`

## Development Setup

For development, use:

\`\`\`bash
npm run dev
\`\`\`

This will start the development server with hot-reload enabled.

## Testing

\`\`\`bash
npm test

# Run tests in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage
\`\`\`

## Building for Production

\`\`\`bash
npm run build

# Preview production build
npm run preview
\`\`\`

## Troubleshooting

### Issue: Dependencies installation fails

**Solution:** Clear npm cache and try again:
\`\`\`bash
npm cache clean --force
npm install
\`\`\`

### Issue: Port already in use

**Solution:** Use a different port:
\`\`\`bash
npm start -- --port 3001
\`\`\`

## Getting Help

- 📖 Check the [documentation](../docs/)
- 🐛 [Report an issue](https://github.com/[username]/[repo-name]/issues)
- 💬 [Start a discussion](https://github.com/[username]/[repo-name]/discussions)

## Next Steps

- Read the [Architecture Guide](./ARCHITECTURE.md)
- Check out [Examples](../examples/)
- Review [API Documentation](./API.md)

---

*Last Updated: 2026-03-04*
`;

  return setupMd;
}

/**
 * Generate ARCHITECTURE.md
 */
function generateArchitecture(projectPath) {
  const architectureMd = `# Architecture

This document describes the architecture and design of the project.

## Overview

[Provide a high-level overview of the system architecture]

## System Design

\`\`\`
┌─────────────┐
│             │
│  Frontend   │
│             │
└──────┬──────┘
       │
       │ HTTP/WebSocket
       │
┌──────▼──────┐
│             │
│  Backend    │
│             │
└──────┬──────┘
       │
       │ Queries
       │
┌──────▼──────┐
│             │
│  Database   │
│             │
└─────────────┘
\`\`\`

## Components

### 1. Core Module
**Purpose:** Main business logic

**Responsibilities:**
- Data processing
- Business rules enforcement
- State management

**Key Files:**
- \`src/core/index.js\` - Entry point
- \`src/core/processor.js\` - Main processing logic

### 2. API Module
**Purpose:** HTTP API endpoints

**Responsibilities:**
- Request routing
- Input validation
- Response formatting

**Key Files:**
- \`src/api/server.js\` - Server setup
- \`src/api/routes.js\` - Route definitions

### 3. Database Module
**Purpose:** Data persistence

**Responsibilities:**
- Database connections
- Query execution
- Data models

**Key Files:**
- \`src/db/connection.js\` - DB setup
- \`src/db/models.js\` - Data models

## Data Flow

### Request Flow

\`\`\`
1. Client sends HTTP request
2. Router directs to handler
3. Handler validates input
4. Core processes data
5. Database stores/retrieves data
6. Response returned to client
\`\`\`

## Design Patterns

### Pattern 1: MVC
Model-View-Controller pattern for separation of concerns

### Pattern 2: Factory Pattern
Used for creating complex objects

### Pattern 3: Observer Pattern
Event-driven architecture for real-time updates

## Dependencies

- **Framework:** [Framework name]
- **Database:** [Database type]
- **ORM:** [ORM name]
- **Authentication:** [Auth method]

## Performance Considerations

- Caching strategy implemented
- Database query optimization
- API rate limiting
- Load balancing ready

## Security

- Input validation on all endpoints
- SQL injection prevention via parameterized queries
- CORS configured securely
- Authentication required for protected routes

## Scalability

- Stateless design enables horizontal scaling
- Database connection pooling implemented
- Async operations for I/O operations
- Caching layer supports multiple instances

## Deployment

The system is containerized with Docker and deployed to [platform]:

\`\`\`
Development → Staging → Production
\`\`\`

---

*Last Updated: 2026-03-04*
`;

  return architectureMd;
}

/**
 * Generate CHANGELOG.md
 */
function generateChangelog() {
  const changelogMd = `# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- New feature 1
- New feature 2

### Changed
- Improved performance in [area]
- Updated dependencies

### Deprecated
- Old API endpoint (will be removed in v2.0)

### Fixed
- Bug fix 1
- Bug fix 2

### Security
- Security patch for [issue]

---

## [1.0.0] - 2026-01-01

### Added
- Initial release
- Core functionality
- API endpoints
- Documentation

### Features
- Feature 1: Description
- Feature 2: Description
- Feature 3: Description

### Known Issues
- Issue 1: Description
- Issue 2: Description

---

## Release Notes Format

Each release should include:

### Version X.Y.Z - YYYY-MM-DD

- **Release Type:** Major/Minor/Patch
- **Status:** Stable/Beta/Alpha

**New Features:**
- [Feature description]

**Improvements:**
- [Improvement description]

**Bug Fixes:**
- [Bug fix description]

**Breaking Changes:**
- [Breaking change description]

**Migration Guide:**
\`\`\`
# If breaking changes exist
Steps to migrate from previous version
\`\`\`

---

## Versioning

We use [Semantic Versioning](https://semver.org/):

- **MAJOR** (X.0.0): Breaking changes
- **MINOR** (0.X.0): New features, backward compatible
- **PATCH** (0.0.X): Bug fixes, backward compatible

## Release Schedule

Releases are made approximately every:
- Critical patches: As needed
- Feature releases: Monthly
- Major versions: Annually or as needed

---

*Last Updated: 2026-03-04*
`;

  return changelogMd;
}

/**
 * Generate documentation files
 */
function generateDocumentation(projectPath) {
  const docsDir = path.join(projectPath, 'docs');

  // Ensure docs directory exists
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
    console.log(`✅ Created docs directory: ${docsDir}`);
  }

  const metadata = getProjectMetadata(projectPath);

  // Generate SETUP.md
  const setupGuide = generateSetupGuide(projectPath, metadata);
  const setupPath = path.join(docsDir, 'SETUP.md');
  fs.writeFileSync(setupPath, setupGuide);
  console.log(`✅ Generated SETUP.md`);

  // Generate ARCHITECTURE.md
  const architecture = generateArchitecture(projectPath);
  const archPath = path.join(docsDir, 'ARCHITECTURE.md');
  fs.writeFileSync(archPath, architecture);
  console.log(`✅ Generated ARCHITECTURE.md`);

  // Generate CHANGELOG.md
  const changelog = generateChangelog();
  const changelogPath = path.join(projectPath, 'CHANGELOG.md');
  fs.writeFileSync(changelogPath, changelog);
  console.log(`✅ Generated CHANGELOG.md`);

  return { setupPath, archPath, changelogPath };
}

/**
 * Validate documentation
 */
function validateDocumentation(projectPath) {
  console.log('\n📚 Validating Documentation...\n');

  const checks = {
    readme: path.join(projectPath, 'README.md'),
    setupGuide: path.join(projectPath, 'docs', 'SETUP.md'),
    architecture: path.join(projectPath, 'docs', 'ARCHITECTURE.md'),
    changelog: path.join(projectPath, 'CHANGELOG.md'),
    contributing: path.join(projectPath, 'CONTRIBUTING.md'),
  };

  let validCount = 0;
  let totalCount = Object.keys(checks).length;

  Object.entries(checks).forEach(([name, filePath]) => {
    if (fs.existsSync(filePath)) {
      const size = fs.statSync(filePath).size;
      console.log(`✅ ${name.padEnd(15)} (${size} bytes)`);
      validCount++;
    } else {
      console.log(`⚠️  ${name.padEnd(15)} (missing)`);
    }
  });

  console.log(`\n📊 Documentation Coverage: ${validCount}/${totalCount} files`);
  return {
    coverage: Math.round((validCount / totalCount) * 100),
    validCount,
    totalCount,
  };
}

/**
 * Main execution
 */
function main() {
  const projectPath = process.env.PROJECT_PATH || process.cwd();

  console.log('\n📚 Documentation Generator');
  console.log(`📁 Project Path: ${projectPath}\n`);

  try {
    generateDocumentation(projectPath);
    console.log('\n✅ Documentation generation complete!\n');

    const validation = validateDocumentation(projectPath);

    if (validation.coverage >= 80) {
      console.log('✅ Documentation coverage is excellent!\n');
      process.exit(0);
    } else {
      console.log('⚠️  Some documentation files are missing.\n');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error generating documentation:', error.message);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = {
  generateSetupGuide,
  generateArchitecture,
  generateChangelog,
  generateDocumentation,
  validateDocumentation,
};
