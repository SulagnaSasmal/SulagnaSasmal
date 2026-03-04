#!/usr/bin/env node

/**
 * Badge Generator
 * Generates quality indicator badges for READMEs
 */

/**
 * Badge configurations
 */
const BADGES = {
  license: {
    name: 'License',
    template: (license) => `[![License](https://img.shields.io/badge/license-${encodeURIComponent(license)}-blue.svg)](LICENSE)`,
    default: () => `[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)`,
  },
  status: {
    name: 'Status',
    template: (status) => {
      const statusMap = {
        active: 'brightgreen',
        maintained: 'green',
        archived: 'red',
        experimental: 'yellow',
      };
      const color = statusMap[status] || 'blue';
      return `[![Status](https://img.shields.io/badge/status-${status}-${color}.svg)]()`;
    },
    default: () => `[![Status](https://img.shields.io/badge/status-active-brightgreen.svg)]()`,
  },
  version: {
    name: 'Version',
    template: (version) => `[![Version](https://img.shields.io/badge/version-${version}-blue.svg)]()`,
    default: () => `[![Version](https://img.shields.io/badge/version-latest-blue.svg)]()`,
  },
  language: {
    name: 'Language',
    template: (lang) => `[![Language](https://img.shields.io/badge/language-${lang}-blue.svg)]()`,
    default: () => `[![Language](https://img.shields.io/badge/language-JavaScript-blue.svg)]()`,
  },
  coverage: {
    name: 'Coverage',
    template: (coverage) => {
      const percent = parseInt(coverage);
      const color = percent >= 80 ? 'brightgreen' : percent >= 60 ? 'yellow' : 'red';
      return `[![Coverage](https://img.shields.io/badge/coverage-${coverage}%25-${color}.svg)]()`;
    },
    default: () => `[![Coverage](https://img.shields.io/badge/coverage-unknown-lightgrey.svg)]()`,
  },
  build: {
    name: 'Build',
    template: (status) => {
      const color = status === 'passing' ? 'brightgreen' : 'red';
      return `[![Build](https://img.shields.io/badge/build-${status}-${color}.svg)]()`;
    },
    default: () => `[![Build](https://img.shields.io/badge/build-unknown-lightgrey.svg)]()`,
  },
  downloads: {
    name: 'Downloads',
    template: (count) => `[![Downloads](https://img.shields.io/badge/downloads-${count}%2Fmonth-blue.svg)]()`,
    default: () => `[![Downloads](https://img.shields.io/badge/downloads-unknown-lightgrey.svg)]()`,
  },
  github: {
    name: 'GitHub Stars',
    template: (stars) => `[![GitHub Stars](https://img.shields.io/badge/stars-${stars}-blue.svg?logo=github)]()`,
    default: () => `[![GitHub Stars](https://img.shields.io/badge/stars-unknown-lightgrey.svg?logo=github)]()`,
  },
  maintained: {
    name: 'Maintained',
    template: (year) => `[![Maintained](https://img.shields.io/badge/maintained%3F-yes-brightgreen.svg)]()`,
    default: () => `[![Maintained](https://img.shields.io/badge/maintained%3F-yes-brightgreen.svg)]()`,
  },
};

/**
 * Generate badge bar
 */
function generateBadgeBar(options = {}) {
  const {
    license = 'MIT',
    status = 'active',
    language = 'JavaScript',
    coverage = null,
    build = null,
    includeStars = false,
  } = options;

  const badges = [];

  // License badge (always included)
  badges.push(BADGES.license.template(license));

  // Status badge
  badges.push(BADGES.status.template(status));

  // Language badge
  badges.push(BADGES.language.template(language));

  // Optional badges
  if (coverage) {
    badges.push(BADGES.coverage.template(coverage));
  }

  if (build) {
    badges.push(BADGES.build.template(build));
  }

  if (includeStars) {
    badges.push(BADGES.github.default());
  }

  // Add maintained badge
  badges.push(BADGES.maintained.default());

  return badges.join('\n');
}

/**
 * Generate simple badge line
 */
function generateSimpleBadgeLine(language = 'JavaScript') {
  return `![${language}](https://img.shields.io/badge/-${language}-blue?style=flat-square&logo=${language.toLowerCase()})`;
}

/**
 * Generate language badges
 */
function generateLanguageBadges(languages = []) {
  const languageLogos = {
    JavaScript: 'javascript',
    TypeScript: 'typescript',
    Python: 'python',
    Go: 'go',
    Rust: 'rust',
    Java: 'java',
    'C++': 'cplusplus',
    'C#': 'csharp',
    PHP: 'php',
    Ruby: 'ruby',
    SQL: 'postgresql',
    React: 'react',
    'Node.js': 'node.js',
  };

  return languages
    .map(lang => {
      const logo = languageLogos[lang] || lang.toLowerCase();
      return `![${lang}](https://img.shields.io/badge/-${lang}-black?style=flat-square&logo=${logo}&logoColor=white)`;
    })
    .join(' ');
}

/**
 * Generate tech stack badges
 */
function generateTechStackBadges(techs = []) {
  const techColors = {
    'Next.js': 'black',
    React: '61dafb',
    TypeScript: '3178c6',
    'Node.js': '68a063',
    Python: '3776ab',
    Docker: '2496ed',
    'GitHub Actions': '2088ff',
    PostgreSQL: '336791',
    MongoDB: '13aa52',
    AWS: 'ff9900',
    Azure: '0078d4',
    MkDocs: '526cfe',
  };

  return techs
    .map(tech => {
      const color = techColors[tech] || 'blue';
      const isIcon = !color.match(/^[0-9a-f]{6}$/i);
      return `[![${tech}](https://img.shields.io/badge/-${encodeURIComponent(tech)}-${color}?style=flat-square&logo=${tech.replace(/\s/g, '')})](.)`;
    })
    .join(' ');
}

/**
 * Generate complete README header with badges
 */
function generateReadmeHeader(options = {}) {
  const {
    title = 'Project Name',
    description = 'Project description',
    license = 'MIT',
    status = 'active',
    languages = [],
    techs = [],
  } = options;

  const header = `# ${title}

${description}

${generateBadgeBar({ license, status })}

${languages.length > 0 ? `**Languages:** ${generateLanguageBadges(languages)}\n` : ''}
${techs.length > 0 ? `**Stack:** ${generateTechStackBadges(techs)}\n` : ''}

---
`;

  return header;
}

/**
 * Example configurations
 */
const EXAMPLES = {
  api_docs: {
    title: 'API Documentation',
    description: 'REST API Reference Documentation',
    license: 'MIT',
    status: 'active',
    languages: ['JavaScript', 'TypeScript'],
    techs: ['Node.js', 'MkDocs', 'GitHub Actions'],
  },
  python_tool: {
    title: 'Python Automation Tool',
    description: 'Python-based automation and utility tool',
    license: 'MIT',
    status: 'active',
    languages: ['Python'],
    techs: ['Python', 'Docker', 'GitHub Actions'],
  },
  nextjs_app: {
    title: 'Next.js Application',
    description: 'Modern React application with Next.js',
    license: 'MIT',
    status: 'active',
    languages: ['TypeScript', 'JavaScript'],
    techs: ['Next.js', 'React', 'TypeScript'],
  },
  archived: {
    title: 'Archived Project',
    description: 'Legacy project (archived)',
    license: 'MIT',
    status: 'archived',
    languages: ['JavaScript'],
    techs: [],
  },
};

/**
 * Display badge examples
 */
function displayExamples() {
  console.log('\n📋 Badge Generation Examples\n');
  console.log('='.repeat(60));

  Object.entries(EXAMPLES).forEach(([key, config]) => {
    console.log(`\n🎨 ${key.toUpperCase().replace(/_/g, ' ')}`);
    console.log('-'.repeat(60));
    console.log(generateReadmeHeader(config));
  });
}

/**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2);

  if (args.includes('--examples') || args.length === 0) {
    displayExamples();
  } else if (args.includes('--help')) {
    console.log(`
📛 Badge Generator

Usage: node scripts/generate-badges.js [options]

Options:
  --examples          Display example badge configurations
  --help             Show this help message

Badge Types Available:
  - License, Status, Version, Language
  - Coverage, Build, Downloads, GitHub Stars
  - Maintained status

Examples:
  node scripts/generate-badges.js --examples
    `);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = {
  generateBadgeBar,
  generateLanguageBadges,
  generateTechStackBadges,
  generateReadmeHeader,
  BADGES,
  EXAMPLES,
};
