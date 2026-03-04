#!/usr/bin/env node

/**
 * Repository Validator Script
 * Validates repository standards and consistency
 */

const fs = require('fs');
const path = require('path');

const username = process.env.GITHUB_USERNAME || 'SulagnaSasmal';
const repoRoot = path.join(__dirname, '..');

/**
 * Validation checks
 */
const checks = {
  readme: {
    name: 'README.md exists',
    test: () => fs.existsSync(path.join(repoRoot, 'README.md')),
  },
  license: {
    name: 'LICENSE file exists',
    test: () => fs.existsSync(path.join(repoRoot, 'LICENSE')),
  },
  gitignore: {
    name: '.gitignore file exists',
    test: () => fs.existsSync(path.join(repoRoot, '.gitignore')),
  },
  workflows: {
    name: 'GitHub Actions workflows configured',
    test: () => {
      const workflowsDir = path.join(repoRoot, '.github', 'workflows');
      if (!fs.existsSync(workflowsDir)) return false;
      const files = fs.readdirSync(workflowsDir);
      return files.some(f => f.endsWith('.yml') || f.endsWith('.yaml'));
    },
  },
  scripts: {
    name: 'Scripts directory configured',
    test: () => {
      const scriptsDir = path.join(repoRoot, 'scripts');
      if (!fs.existsSync(scriptsDir)) return false;
      const files = fs.readdirSync(scriptsDir);
      return files.length > 0;
    },
  },
  packageJson: {
    name: 'package.json configured',
    test: () => fs.existsSync(path.join(repoRoot, 'package.json')),
  },
};

/**
 * Run all validation checks
 */
function validateRepository() {
  console.log(`\n🔍 Validating repository: ${username}/${path.basename(repoRoot)}\n`);

  let passed = 0;
  let failed = 0;

  Object.entries(checks).forEach(([key, check]) => {
    const result = check.test();
    const icon = result ? '✅' : '❌';
    const status = result ? 'PASS' : 'FAIL';

    console.log(`${icon} ${check.name} ... ${status}`);

    if (result) {
      passed++;
    } else {
      failed++;
    }
  });

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

  if (failed === 0) {
    console.log('✅ All validation checks passed!\n');
    process.exit(0);
  } else {
    console.log('⚠️ Some validation checks failed.\n');
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  validateRepository();
}

module.exports = { validateRepository };
