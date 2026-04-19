#!/usr/bin/env node

/**
 * Automation Test Suite
 * Tests all automation scripts and workflows
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = process.cwd();
const tests = [];

/**
 * Test result tracking
 */
function test(name, fn) {
  tests.push({ name, fn });
}

/**
 * Run all tests
 */
async function runTests() {
  console.log('\n' + '='.repeat(70));
  console.log('🧪 AUTOMATION TEST SUITE');
  console.log('='.repeat(70) + '\n');

  let passed = 0;
  let failed = 0;

  for (const t of tests) {
    process.stdout.write(`Testing: ${t.name}... `);
    try {
      t.fn();
      console.log('✅ PASS');
      passed++;
    } catch (error) {
      console.log('❌ FAIL');
      console.log(`         ${error.message}`);
      failed++;
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log(`📊 Test Results: ${passed} passed, ${failed} failed`);
  console.log('='.repeat(70) + '\n');

  return failed === 0;
}

// Test 1: GitHub API helper
test('GitHub API helper functions', () => {
  const apiHelper = require('./github-api-queries');
  if (!apiHelper.queryGitHub || !apiHelper.getUserStats) {
    throw new Error('API helper missing required functions');
  }
});

// Test 2: Profile template engine
test('Profile template engine', () => {
  const template = require('./profile-template');
  if (!template.generateStatsSection || !template.generateTopReposSection) {
    throw new Error('Template engine missing required functions');
  }
});

// Test 3: Metrics collector
test('Metrics collector script', () => {
  const metricsPath = path.join(repoRoot, 'scripts', 'metrics-collector.js');
  if (!fs.existsSync(metricsPath)) {
    throw new Error('metrics-collector.js not found');
  }
});

// Test 4: Repository validator
test('Repository validator script', () => {
  const validatorPath = path.join(repoRoot, 'scripts', 'repo-validator.js');
  if (!fs.existsSync(validatorPath)) {
    throw new Error('repo-validator.js not found');
  }
});

// Test 5: Standards validator
test('Repository standards validator', () => {
  const standardsPath = path.join(repoRoot, 'scripts', 'repo-standards-validator.js');
  if (!fs.existsSync(standardsPath)) {
    throw new Error('repo-standards-validator.js not found');
  }
});

// Test 6: Badge generator
test('Badge generator script', () => {
  const badgesPath = path.join(repoRoot, 'scripts', 'generate-badges.js');
  if (!fs.existsSync(badgesPath)) {
    throw new Error('generate-badges.js not found');
  }
});

// Test 7: Documentation generator
test('Documentation generator', () => {
  const docPath = path.join(repoRoot, 'scripts', 'generate-documentation.js');
  if (!fs.existsSync(docPath)) {
    throw new Error('generate-documentation.js not found');
  }
});

// Test 8: Analytics reporter
test('Analytics report generator', () => {
  const analyticsPath = path.join(repoRoot, 'scripts', 'analytics-report.js');
  if (!fs.existsSync(analyticsPath)) {
    throw new Error('analytics-report.js not found');
  }
});

// Test 9: GitHub Actions workflows
test('GitHub Actions workflows', () => {
  const workflowsDir = path.join(repoRoot, '.github', 'workflows');
  const workflows = fs.readdirSync(workflowsDir).filter(f => f.endsWith('.yml'));
  if (workflows.length < 5) {
    throw new Error(`Only ${workflows.length} workflows found, expected 5+`);
  }
});

// Test 10: Configuration files
test('Configuration files', () => {
  const requiredFiles = [
    'package.json',
    '.gitignore',
    'README.md',
  ];

  for (const file of requiredFiles) {
    const filepath = path.join(repoRoot, file);
    if (!fs.existsSync(filepath)) {
      throw new Error(`Missing ${file}`);
    }
  }
});

// Test 11: Documentation files
test('Documentation structure', () => {
  const docsDir = path.join(repoRoot, 'docs');
  const requiredDocs = ['SETUP.md', 'ARCHITECTURE.md', 'STANDARDS.md'];

  for (const doc of requiredDocs) {
    const filepath = path.join(docsDir, doc);
    if (!fs.existsSync(filepath)) {
      throw new Error(`Missing docs/${doc}`);
    }
  }
});

// Test 12: Metrics system
test('Metrics tracking system', () => {
  const metricsDir = path.join(repoRoot, 'metrics');
  const analyticsFile = path.join(metricsDir, 'analytics.json');

  if (!fs.existsSync(analyticsFile)) {
    throw new Error('Metrics analytics.json not found');
  }

  const data = JSON.parse(fs.readFileSync(analyticsFile, 'utf-8'));
  if (!data.current || !data.history) {
    throw new Error('Invalid analytics.json structure');
  }
});

// Test 13: Portfolio documentation
test('Portfolio documentation', () => {
  const portfolioPath = path.join(repoRoot, '.github', 'PORTFOLIO.md');
  const recruiterPath = path.join(repoRoot, 'docs', 'RECRUITER_README.md');

  if (!fs.existsSync(portfolioPath)) {
    throw new Error('.github/PORTFOLIO.md not found');
  }
  if (!fs.existsSync(recruiterPath)) {
    throw new Error('docs/RECRUITER_README.md not found');
  }
});

// Test 14: Templates
test('Repository templates', () => {
  const templatesDir = path.join(repoRoot, '.github', 'templates');
  const templates = fs.readdirSync(templatesDir);

  if (templates.length < 2) {
    throw new Error('Less than 2 templates found');
  }
});

// Test 15: README markers
test('README auto-generation markers', () => {
  const readmePath = path.join(repoRoot, 'README.md');
  const content = fs.readFileSync(readmePath, 'utf-8');

  const markers = [
    'GITHUB_STATS_START',
    'TOP_REPOS_START',
    'LANGUAGES_START',
    'ACTIVITY_START',
  ];

  for (const marker of markers) {
    if (!content.includes(marker)) {
      throw new Error(`Missing marker: ${marker}`);
    }
  }
});

// Run tests
runTests().then(success => {
  process.exit(success ? 0 : 1);
});
