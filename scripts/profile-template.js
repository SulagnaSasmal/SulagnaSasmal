/**
 * Profile Template Engine
 * Generates README content from GitHub data
 */

/**
 * Generate stats section
 */
function generateStatsSection(stats) {
  const user = stats.user;

  return `
<!-- GITHUB_STATS_START -->

## GitHub Statistics

<table>
<tr>
<td width="50%">

### Profile Stats
- **Total Contributions**: ${user.contributionsCollection.contributionCalendar.totalContributions} (this year)
- **Followers**: ${user.followers.totalCount}
- **Following**: ${user.following.totalCount}
- **Public Repositories**: ${user.repositories.totalCount}

</td>
<td width="50%">

### Repository Stats
- **Total Stars**: ${user.repositories.nodes.reduce((sum, repo) => sum + repo.stargazerCount, 0)}
- **Total Forks**: ${user.repositories.nodes.reduce((sum, repo) => sum + repo.forkCount, 0)}
- **Top Language**: ${getUserTopLanguage(user.repositories.nodes)}
- **Active Projects**: ${user.repositories.nodes.filter(r => !r.isArchived).length}

</td>
</tr>
</table>

<!-- GITHUB_STATS_END -->
`;
}

/**
 * Get user's top programming language
 */
function getUserTopLanguage(repositories) {
  const languages = {};

  repositories.forEach(repo => {
    if (repo.primaryLanguage) {
      languages[repo.primaryLanguage.name] = (languages[repo.primaryLanguage.name] || 0) + 1;
    }
  });

  const topLang = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])[0];

  return topLang ? topLang[0] : 'JavaScript';
}

/**
 * Curated fallback descriptions for repos that may not have GitHub descriptions set.
 * These take priority over the GitHub API description when the repo description is blank.
 */
const CURATED_REPO_DESCRIPTIONS = {
  'sulagnasasmal-site': 'Personal portfolio and technical writing showcase — Sulagna Sasmal, Senior Technical Writer · sulagnasasmal.com',
  'ppt-to-mp4-doc-automation': 'PPT-to-MP4 doc automation pipeline — converts PowerPoint slides to narrated video using Python and Azure AI',
  'Doccraft': 'DocCraft AI — intelligent documentation generation assistant for technical writers, built with TypeScript and Next.js',
  'payplus-admin-guide': 'PayPlus Admin Guide — installation, user management, payment rails configuration, compliance monitoring, and troubleshooting',
  'caseforge-api-docs': 'CaseForge AML REST API reference — authentication, entity endpoints, case management, webhooks, and error catalog',
  'SulagnaSasmal': 'GitHub profile repository — readme-driven portfolio for Sulagna Sasmal, Senior Technical Writer',
};

/**
 * Generate top repositories section.
 * The Featured Projects block is fully curated — the auto-generated repo list is
 * intentionally omitted so CI runs never overwrite hand-crafted project entries.
 */
function generateTopReposSection(repositories) {
  // repositories parameter kept for API compatibility but not used for the listing.
  let content = `
<!-- TOP_REPOS_START -->

## Featured Projects

---

### 🚀 [CaseForge Onboarding Kit](https://sulagnasasmal.github.io/caseforge-onboarding/)
> Post-sale onboarding package for enterprise CaseForge AML customers. 30-day time-boxed program with role-based checklists, environment provisioning guides, data migration procedures, user training tracks, and a go-live validation checklist.

**Language**: HTML | **Live Site**: [sulagnasasmal.github.io/caseforge-onboarding](https://sulagnasasmal.github.io/caseforge-onboarding/) | **Repo**: [github.com/SulagnaSasmal/caseforge-onboarding](https://github.com/SulagnaSasmal/caseforge-onboarding)

\`Onboarding\` · \`Enterprise AML\` · \`Checklists\` · \`Go-live Validation\` · \`Role-based Tracks\`

---

### 🐍 [CaseForge SDK Documentation](https://sulagnasasmal.github.io/caseforge-sdk-docs/)
> Python and Node.js SDK guide for the CaseForge AML REST API. Covers quickstart, authentication (API keys + OAuth 2.0), a structured exception hierarchy, full code-sample library, versioned changelog, and a v1.x → v2.0 migration guide with side-by-side breaking-change comparisons.

**Language**: HTML | **Live Site**: [sulagnasasmal.github.io/caseforge-sdk-docs](https://sulagnasasmal.github.io/caseforge-sdk-docs/) | **Repo**: [github.com/SulagnaSasmal/caseforge-sdk-docs](https://github.com/SulagnaSasmal/caseforge-sdk-docs)

\`SDK Documentation\` · \`Python\` · \`Node.js\` · \`OAuth 2.0\` · \`Migration Guide\` · \`Versioned Changelog\`

---

### 🏛️ [Documentation Center Platform](https://sulagnasasmal.github.io/Documentation-Center-Platform/)
> Capstone portfolio hub bringing all 7 documentation phases together. Includes meta-documentation on writing philosophy (MSTP compliance, before/after examples), information architecture decisions per phase, and a full doc-as-code workflow with branch strategy, Vale linting, GitHub Actions CI, and deployment pipeline.

**Language**: HTML | **Live Site**: [sulagnasasmal.github.io/Documentation-Center-Platform](https://sulagnasasmal.github.io/Documentation-Center-Platform/) | **Repo**: [github.com/SulagnaSasmal/Documentation-Center-Platform](https://github.com/SulagnaSasmal/Documentation-Center-Platform)

\`Portfolio Hub\` · \`MSTP\` · \`Information Architecture\` · \`Doc-as-Code\` · \`Vale Linting\` · \`GitHub Actions\`

---

### 📦 [NexaFlow SDK Documentation](https://github.com/SulagnaSasmal/nexaflow-sdk-docs)
> Full developer reference for a workflow automation SDK — installation, core concepts, authentication, error handling with retry policies, full API reference (client, workflows, triggers, actions), v1-to-v2 migration guide, and versioned changelog. Written to the same quality bar as Stripe and Twilio SDK docs.

**Language**: Markdown | **Repo**: [github.com/SulagnaSasmal/nexaflow-sdk-docs](https://github.com/SulagnaSasmal/nexaflow-sdk-docs)

\`SDK Documentation\` · \`API Reference\` · \`Migration Guide\` · \`Error Handling\` · \`Node.js\` · \`Python\`

---

### 🗂️ [Technical Documentation Content Strategy & Style Guide](https://github.com/SulagnaSasmal/docs-content-strategy)
> A complete documentation program framework: editorial style guide (voice & tone, formatting, naming, code examples), information architecture methodology, doc type taxonomy, audience analysis framework, metrics program, four ready-to-use templates, a doc audit checklist, and a content health scorecard. Built for teams managing documentation at scale.

**Language**: Markdown | **Repo**: [github.com/SulagnaSasmal/docs-content-strategy](https://github.com/SulagnaSasmal/docs-content-strategy)

\`Content Strategy\` · \`Style Guide\` · \`Information Architecture\` · \`Docs Metrics\` · \`Templates\` · \`Content Audit\`

<!-- TOP_REPOS_END -->
`;

  return content;
}

**Language**: HTML | **Live Site**: [sulagnasasmal.github.io/caseforge-sdk-docs](https://sulagnasasmal.github.io/caseforge-sdk-docs/) | **Repo**: [github.com/SulagnaSasmal/caseforge-sdk-docs](https://github.com/SulagnaSasmal/caseforge-sdk-docs)

\`SDK Documentation\` · \`Python\` · \`Node.js\` · \`OAuth 2.0\` · \`Migration Guide\` · \`Versioned Changelog\`

---

### 🏛️ [Documentation Center Platform](https://sulagnasasmal.github.io/Documentation-Center-Platform/)
> Capstone portfolio hub bringing all 7 documentation phases together. Includes meta-documentation on writing philosophy (MSTP compliance, before/after examples), information architecture decisions per phase, and a full doc-as-code workflow with branch strategy, Vale linting, GitHub Actions CI, and deployment pipeline.

**Language**: HTML | **Live Site**: [sulagnasasmal.github.io/Documentation-Center-Platform](https://sulagnasasmal.github.io/Documentation-Center-Platform/) | **Repo**: [github.com/SulagnaSasmal/Documentation-Center-Platform](https://github.com/SulagnaSasmal/Documentation-Center-Platform)

\`Portfolio Hub\` · \`MSTP\` · \`Information Architecture\` · \`Doc-as-Code\` · \`Vale Linting\` · \`GitHub Actions\`

---

### 📦 [NexaFlow SDK Documentation](https://github.com/SulagnaSasmal/nexaflow-sdk-docs)
> Full developer reference for a workflow automation SDK — installation, core concepts, authentication, error handling with retry policies, full API reference (client, workflows, triggers, actions), v1-to-v2 migration guide, and versioned changelog. Written to the same quality bar as Stripe and Twilio SDK docs.

**Language**: Markdown | **Repo**: [github.com/SulagnaSasmal/nexaflow-sdk-docs](https://github.com/SulagnaSasmal/nexaflow-sdk-docs)

\`SDK Documentation\` · \`API Reference\` · \`Migration Guide\` · \`Error Handling\` · \`Node.js\` · \`Python\`

---

### 🗂️ [Technical Documentation Content Strategy & Style Guide](https://github.com/SulagnaSasmal/docs-content-strategy)
> A complete documentation program framework: editorial style guide (voice & tone, formatting, naming, code examples), information architecture methodology, doc type taxonomy, audience analysis framework, metrics program, four ready-to-use templates, a doc audit checklist, and a content health scorecard. Built for teams managing documentation at scale.

**Language**: Markdown | **Repo**: [github.com/SulagnaSasmal/docs-content-strategy](https://github.com/SulagnaSasmal/docs-content-strategy)

\`Content Strategy\` · \`Style Guide\` · \`Information Architecture\` · \`Docs Metrics\` · \`Templates\` · \`Content Audit\`

<!-- TOP_REPOS_END -->
`;

  return content;
}

/**
 * Generate language breakdown
 */
function generateLanguageBreakdown(repositories) {
  const languages = {};
  let totalRepos = 0;

  repositories.forEach(repo => {
    if (!repo.isArchived && repo.primaryLanguage) {
      const lang = repo.primaryLanguage.name;
      languages[lang] = (languages[lang] || 0) + 1;
      totalRepos++;
    }
  });

  const sorted = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  let content = `
<!-- LANGUAGES_START -->

## Most Used Languages

`;

  sorted.forEach(([lang, count]) => {
    const percentage = Math.round((count / totalRepos) * 100);
    const barLength = Math.round(percentage / 5);
    const bar = '█'.repeat(barLength) + '░'.repeat(20 - barLength);

    content += `**${lang}**: ${bar} ${percentage}%\n`;
  });

  content += `
<!-- LANGUAGES_END -->
`;

  return content;
}

/**
 * Generate recent activity section
 */
function generateRecentActivitySection(activity) {
  let content = `
<!-- ACTIVITY_START -->

## Recent Activity

| Repository | Last Update | Recent Commits |
|-----------|-------------|----------------|
`;

  activity.repositories.nodes.slice(0, 10).forEach(repo => {
    const lastUpdate = new Date(repo.pushedAt).toLocaleDateString();
    const recentCommits = repo.refs?.nodes?.[0]?.target?.history?.nodes?.length || 0;

    content += `| [\`${repo.name}\`](${repo.url}) | ${lastUpdate} | ${recentCommits} commits |\n`;
  });

  content += `
<!-- ACTIVITY_END -->
`;

  return content;
}

/**
 * Integrate all sections into README
 */
function generateCompleteProfile(stats, repositories, activity) {
  const sections = {
    stats: generateStatsSection(stats),
    topRepos: generateTopReposSection(repositories.nodes),
    languages: generateLanguageBreakdown(repositories.nodes),
    activity: generateRecentActivitySection(activity)
  };

  return sections;
}

/**
 * Update README with new content
 * Preserves content outside of markers
 */
function updateReadmeWithSections(currentReadme, sections) {
  let updatedReadme = currentReadme;

  // Update each section if markers exist
  const markers = {
    stats: ['<!-- GITHUB_STATS_START -->', '<!-- GITHUB_STATS_END -->'],
    topRepos: ['<!-- TOP_REPOS_START -->', '<!-- TOP_REPOS_END -->'],
    languages: ['<!-- LANGUAGES_START -->', '<!-- LANGUAGES_END -->'],
    activity: ['<!-- ACTIVITY_START -->', '<!-- ACTIVITY_END -->']
  };

  Object.entries(markers).forEach(([key, [start, end]]) => {
    const regex = new RegExp(`${start}[\\s\\S]*?${end}`, 'g');
    if (regex.test(updatedReadme)) {
      updatedReadme = updatedReadme.replace(regex, sections[key]);
    }
  });

  return updatedReadme;
}

/**
 * Export functions
 */
module.exports = {
  generateStatsSection,
  generateTopReposSection,
  generateLanguageBreakdown,
  generateRecentActivitySection,
  generateCompleteProfile,
  updateReadmeWithSections,
  getUserTopLanguage,
};
