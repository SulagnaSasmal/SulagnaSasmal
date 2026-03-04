#!/usr/bin/env node

/**
 * Analytics Report Generator
 * Creates comprehensive analytics reports from collected metrics
 */

const fs = require('fs');
const path = require('path');

const analyticsPath = path.join(__dirname, '..', 'metrics', 'analytics.json');

/**
 * Read analytics data
 */
function getAnalyticsData() {
  if (!fs.existsSync(analyticsPath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(analyticsPath, 'utf-8'));
  } catch (error) {
    return null;
  }
}

/**
 * Calculate growth trends
 */
function calculateTrends(history) {
  if (history.length < 2) return null;

  const first = history[0];
  const last = history[history.length - 1];

  return {
    followers: {
      start: first.followers,
      end: last.followers,
      growth: last.followers - first.followers,
      percentGrowth: Math.round(((last.followers - first.followers) / (first.followers || 1)) * 100),
    },
    stars: {
      start: first.totalStars,
      end: last.totalStars,
      growth: last.totalStars - first.totalStars,
      percentGrowth: Math.round(((last.totalStars - first.totalStars) / (first.totalStars || 1)) * 100),
    },
    contributions: {
      start: first.contributions,
      end: last.contributions,
      growth: last.contributions - first.contributions,
    },
  };
}

/**
 * Generate text-based chart
 */
function generateChart(label, data, max = 100) {
  const barLength = Math.round((data / max) * 30);
  const bar = '█'.repeat(barLength) + '░'.repeat(30 - barLength);
  const percentage = Math.round((data / max) * 100);

  return `${label.padEnd(20)} ${bar} ${data}`;
}

/**
 * Generate analytics report
 */
function generateReport(analytics) {
  let report = '';

  report += '\n' + '='.repeat(70);
  report += '\n📊 GITHUB ANALYTICS REPORT';
  report += '\n' + '='.repeat(70);

  const current = analytics.current;
  const trends = calculateTrends(analytics.history);

  // Current metrics
  report += '\n\n🔴 CURRENT METRICS\n';
  report += '─'.repeat(70) + '\n';
  report += `Last Updated: ${current.timestamp}\n\n`;

  report += `📈 Followers: ${current.followers}\n`;
  report += `⭐ Total Stars: ${current.totalStars}\n`;
  report += `🍴 Total Forks: ${current.totalForks}\n`;
  report += `📦 Repositories: ${current.totalRepositories}\n`;
  report += `🟢 Active Repos: ${current.activeRepositories}\n`;
  report += `💬 Contributions (YTD): ${current.contributions}\n`;
  report += `📝 Pull Requests: ${current.pullRequests}\n`;
  report += `🐛 Issues: ${current.issues}\n`;

  // Growth trends
  if (trends) {
    report += '\n\n📈 GROWTH TRENDS\n';
    report += '─'.repeat(70) + '\n';

    const followerChange = trends.followers.growth >= 0 ? '+' : '';
    report += `Followers: ${followerChange}${trends.followers.growth} (${trends.followers.percentGrowth > 0 ? '+' : ''}${trends.followers.percentGrowth}%)\n`;

    const starsChange = trends.stars.growth >= 0 ? '+' : '';
    report += `Stars: ${starsChange}${trends.stars.growth} (${trends.stars.percentGrowth > 0 ? '+' : ''}${trends.stars.percentGrowth}%)\n`;

    const contributionsChange = trends.contributions.growth >= 0 ? '+' : '';
    report += `Contributions: ${contributionsChange}${trends.contributions.growth}\n`;
  }

  // Distribution charts
  report += '\n\n📊 DISTRIBUTION\n';
  report += '─'.repeat(70) + '\n';

  const maxValue = Math.max(current.followers, current.totalStars, current.pullRequests);
  report += generateChart('Followers', current.followers, maxValue || 100) + '\n';
  report += generateChart('Stars', current.totalStars, maxValue || 100) + '\n';
  report += generateChart('Pull Requests', current.pullRequests, current.pullRequests + 50) + '\n';

  // Engagement metrics
  report += '\n\n💭 ENGAGEMENT\n';
  report += '─'.repeat(70) + '\n';
  report += `Issue Resolution Rate: ${current.issues > 0 ? Math.round((current.pullRequests / current.issues) * 100) : 0}%\n`;
  report += `Repository Quality: ${current.activeRepositories}/${current.totalRepositories} active\n`;

  // Summary
  report += '\n\n📋 SUMMARY\n';
  report += '─'.repeat(70) + '\n';

  if (trends) {
    const isGrowing = trends.followers.growth > 0;
    const momentum = isGrowing ? '📈 Growing' : '📉 Stable';
    report += `Status: ${momentum}\n`;
  }

  report += `Portfolio Size: ${current.totalRepositories} repositories\n`;
  report += `Community: ${current.followers} followers\n`;
  report += `Impact: ${current.totalStars} total stars\n`;

  report += '\n' + '='.repeat(70) + '\n';

  return report;
}

/**
 * Generate Markdown report
 */
function generateMarkdownReport(analytics) {
  const current = analytics.current;
  const trends = calculateTrends(analytics.history);

  let report = `# GitHub Analytics Report

*Last Updated: ${new Date(current.timestamp).toLocaleDateString()}*

## 📊 Overview

| Metric | Value |
|--------|-------|
| **Followers** | ${current.followers} |
| **Repositories** | ${current.totalRepositories} |
| **Total Stars** | ${current.totalStars} |
| **Active Projects** | ${current.activeRepositories} |
| **Contributions (YTD)** | ${current.contributions} |

## 📈 Current Activity

- **Pull Requests**: ${current.pullRequests}
- **Issues**: ${current.issues}
- **Total Forks**: ${current.totalForks}

## 📊 Growth Trends
`;

  if (trends) {
    report += `
### Followers
- **Growth**: ${trends.followers.growth > 0 ? '+' : ''}${trends.followers.growth} (${trends.followers.percentGrowth}%)
- **Current**: ${current.followers}

### Star Growth
- **Growth**: ${trends.stars.growth > 0 ? '+' : ''}${trends.stars.growth} (${trends.stars.percentGrowth}%)
- **Current**: ${current.totalStars}

### Contributions
- **Growth**: ${trends.contributions.growth > 0 ? '+' : ''}${trends.contributions.growth}
- **Current**: ${current.contributions}
`;
  }

  report += `
## 🎯 Portfolio Metrics

- **Repository Ratio**: ${current.activeRepositories}/${current.totalRepositories} active
- **Average Stars/Repo**: ${Math.round(current.totalStars / (current.totalRepositories || 1))}
- **Engagement Rate**: ${current.pullRequests > 0 ? Math.round((current.pullRequests / (current.issues || 1)) * 100) : 0}%

## 📈 Insights

${current.followers > 100 ? '✅ Strong follower base (100+)' : '⚠️ Growing follower community'}
${current.totalStars > 50 ? '✅ Popular projects (50+ stars)' : '⚠️ Building project popularity'}
${current.activeRepositories === current.totalRepositories ? '✅ All repositories actively maintained' : '⚠️ Some repositories could use updates'}

---

*Generated by GitHub Analytics System*
`;

  return report;
}

/**
 * Main execution
 */
function main() {
  console.log('\n🔍 Analyzing GitHub Analytics...\n');

  const analytics = getAnalyticsData();

  if (!analytics) {
    console.error('❌ No analytics data found. Run metrics collection first.');
    process.exit(1);
  }

  // Generate text report
  const textReport = generateReport(analytics);
  console.log(textReport);

  // Generate Markdown report
  const markdownReport = generateMarkdownReport(analytics);
  const reportPath = path.join(path.dirname(analyticsPath), 'REPORT.md');

  try {
    fs.writeFileSync(reportPath, markdownReport);
    console.log(`✅ Report saved to: ${reportPath}\n`);
  } catch (error) {
    console.error(`⚠️ Could not save report: ${error.message}`);
  }

  process.exit(0);
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = {
  getAnalyticsData,
  calculateTrends,
  generateChart,
  generateReport,
  generateMarkdownReport,
};
