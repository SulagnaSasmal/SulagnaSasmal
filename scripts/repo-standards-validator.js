#!/usr/bin/env node

/**
 * Repository Standards Validator
 * Validates repositories against professional standards
 */

const fs = require('fs');
const path = require('path');

/**
 * Repository Standards Configuration
 */
const STANDARDS = {
  readme: {
    name: 'README.md',
    required: true,
    minLength: 100,
    sections: ['Overview', 'Installation', 'Usage', 'Contributing'],
    description: 'Comprehensive README with key sections'
  },
  license: {
    name: 'LICENSE',
    required: true,
    description: 'Open source license file'
  },
  gitignore: {
    name: '.gitignore',
    required: false,
    description: 'Ignore unnecessary files'
  },
  contributing: {
    name: 'CONTRIBUTING.md',
    required: false,
    description: 'Contribution guidelines'
  },
  changelog: {
    name: 'CHANGELOG.md',
    required: false,
    description: 'Version history and releases'
  },
  github_workflows: {
    name: '.github/workflows',
    required: false,
    description: 'CI/CD automation workflows'
  },
  tests: {
    name: 'tests/',
    required: false,
    description: 'Test files and test coverage'
  },
};

/**
 * Validate a single repository
 */
function validateRepository(repoPath, repoName) {
  console.log(`\n🔍 Validating: ${repoName}`);
  console.log('─'.repeat(50));

  const results = {
    name: repoName,
    passed: 0,
    failed: 0,
    warnings: 0,
    details: [],
  };

  // Check each standard
  Object.entries(STANDARDS).forEach(([key, standard]) => {
    const itemPath = path.join(repoPath, standard.name);
    const exists = fs.existsSync(itemPath);
    const required = standard.required ? '(required)' : '(optional)';

    if (exists) {
      // Additional validation for README
      if (key === 'readme' && exists) {
        const content = fs.readFileSync(itemPath, 'utf-8');
        if (content.length >= standard.minLength) {
          console.log(`  ✅ ${standard.name} ${required}`);
          results.passed++;
          results.details.push({ file: standard.name, status: 'PASS' });
        } else {
          console.log(`  ⚠️  ${standard.name} - Too short (${content.length} chars)`);
          results.warnings++;
          results.details.push({ file: standard.name, status: 'SHORT' });
        }
      } else {
        console.log(`  ✅ ${standard.name} ${required}`);
        results.passed++;
        results.details.push({ file: standard.name, status: 'PASS' });
      }
    } else {
      if (standard.required) {
        console.log(`  ❌ ${standard.name} ${required} - MISSING`);
        results.failed++;
        results.details.push({ file: standard.name, status: 'FAIL' });
      } else {
        console.log(`  ⚠️  ${standard.name} ${required} - Missing (recommended)`);
        results.warnings++;
        results.details.push({ file: standard.name, status: 'MISSING' });
      }
    }
  });

  // Calculate quality score
  const total = Object.keys(STANDARDS).length;
  const score = Math.round((results.passed / total) * 100);

  console.log('\n' + '─'.repeat(50));
  console.log(`📊 Quality Score: ${score}% (${results.passed}/${total} standards met)`);
  console.log(`   Passed: ${results.passed} | Warnings: ${results.warnings} | Failed: ${results.failed}`);

  return results;
}

/**
 * Generate standardization report
 */
function generateReport(allResults) {
  console.log('\n\n' + '='.repeat(60));
  console.log('📋 REPOSITORY STANDARDS REPORT');
  console.log('='.repeat(60));

  let totalScore = 0;
  let totalPassed = 0;
  let totalRepos = allResults.length;

  allResults.forEach(result => {
    const score = Math.round((result.passed / Object.keys(STANDARDS).length) * 100);
    totalScore += score;
    totalPassed += result.passed;

    const icon = score >= 80 ? '✅' : score >= 60 ? '⚠️ ' : '❌';
    console.log(`${icon} ${result.name.padEnd(30)} ${score}%`);
  });

  const avgScore = Math.round(totalScore / totalRepos);

  console.log('='.repeat(60));
  console.log(`\n📊 Summary:`);
  console.log(`   Total Repositories: ${totalRepos}`);
  console.log(`   Average Score: ${avgScore}%`);
  console.log(`   Compliance Level: ${getComplianceLevel(avgScore)}\n`);

  return avgScore;
}

/**
 * Get compliance level
 */
function getComplianceLevel(score) {
  if (score >= 90) return '🟢 Excellent';
  if (score >= 80) return '🟢 Good';
  if (score >= 70) return '🟡 Fair';
  if (score >= 60) return '🟡 Needs Work';
  return '🔴 Critical';
}

/**
 * Main execution
 */
function main() {
  const repoRoot = process.env.REPO_ROOT || process.cwd();
  const allResults = [];

  console.log('\n🔍 Repository Standards Validation\n');
  console.log(`Root: ${repoRoot}`);
  console.log(`Standards: ${Object.keys(STANDARDS).length} checks per repo\n`);

  // Validate current repo
  const repoName = path.basename(repoRoot);
  const result = validateRepository(repoRoot, repoName);
  allResults.push(result);

  // Generate report
  const avgScore = generateReport(allResults);

  if (avgScore >= 80) {
    console.log('✅ Repositories meet professional standards!\n');
    process.exit(0);
  } else {
    console.log('⚠️ Repositories need improvement. Review the report above.\n');
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { validateRepository, generateReport, STANDARDS };
