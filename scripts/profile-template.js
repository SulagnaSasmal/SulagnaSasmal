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
 * Generate top repositories section
 */
function generateTopReposSection(repositories) {
  const topRepos = repositories.slice(0, 6);

  let content = `
<!-- TOP_REPOS_START -->

## Featured Projects

`;

  topRepos.forEach((repo, index) => {
    const lang = repo.primaryLanguage?.name || 'Unknown';
    const stars = repo.stargazerCount;
    const desc = repo.description || 'No description provided';

    content += `
### ${index + 1}. [${repo.name}](${repo.url})
> ${desc}

**Language**: ${lang} | **Stars**: ⭐ ${stars} | **Forks**: 🍴 ${repo.forkCount}

`;
  });

  content += `
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
