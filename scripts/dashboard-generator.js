#!/usr/bin/env node

/**
 * Analytics Dashboard & Report Generator
 * Creates visual analytics dashboards and detailed reports
 */

const fs = require('fs');
const path = require('path');

/**
 * Generate HTML dashboard
 */
function generateDashboard(analytics) {
  // Build device breakdown HTML
  const deviceHtml = Object.entries(analytics.deviceBreakdown || {})
    .sort(([,a], [,b]) => b - a)
    .map(([device, count]) => {
      const max = Math.max(...Object.values(analytics.deviceBreakdown || {}), 1);
      const percent = ((count / max) * 100);
      return `<div class="bar-item">
        <div class="bar-label">${device}</div>
        <div class="bar" style="width: ${percent}%">${count}</div>
      </div>`;
    }).join('');

  // Build top links HTML
  const linksHtml = (analytics.topClickedLinks || [])
    .slice(0, 10)
    .map((link, index) => {
      const max = (analytics.topClickedLinks && analytics.topClickedLinks[0]) ? analytics.topClickedLinks[0].count : 1;
      const percent = ((link.count / max) * 100);
      const displayLink = link.link.substring(0, 50) + (link.link.length > 50 ? '...' : '');
      return `<div class="bar-item">
        <div class="bar-label">#${index + 1}: ${displayLink}</div>
        <div class="bar" style="width: ${percent}%">${link.count}</div>
      </div>`;
    }).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub Profile Analytics Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0d1117; color: #e6edf3; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 { margin-bottom: 30px; color: #79c0ff; }
        .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .metric-card { background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 20px; }
        .metric-card h3 { font-size: 14px; color: #8b949e; margin-bottom: 10px; text-transform: uppercase; }
        .metric-card .value { font-size: 32px; color: #79c0ff; font-weight: bold; }
        .metric-card .label { font-size: 12px; color: #8b949e; margin-top: 5px; }
        .chart { background: #161b22; border: 1px solid #30363d; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
        .chart h2 { margin-bottom: 20px; color: #79c0ff; }
        .bar-chart { display: flex; flex-direction: column; gap: 10px; }
        .bar-item { display: flex; align-items: center; gap: 10px; }
        .bar-label { min-width: 150px; font-size: 12px; }
        .bar { background: linear-gradient(90deg, #1f6feb, #79c0ff); height: 24px; border-radius: 4px; display: flex; align-items: center; padding: 0 10px; color: white; font-size: 12px; font-weight: bold; }
        .timestamp { color: #8b949e; font-size: 12px; margin-top: 20px; text-align: center; }
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 GitHub Profile Analytics</h1>

        <div class="metrics">
            <div class="metric-card">
                <h3>Page Views</h3>
                <div class="value">${(analytics.pageViews || 0).toLocaleString()}</div>
                <div class="label">Total profile visits</div>
            </div>

            <div class="metric-card">
                <h3>Unique Visitors</h3>
                <div class="value">${(analytics.uniqueVisitors || 0).toLocaleString()}</div>
                <div class="label">Distinct sessions</div>
            </div>

            <div class="metric-card">
                <h3>Total Clicks</h3>
                <div class="value">${(analytics.totalClicks || 0).toLocaleString()}</div>
                <div class="label">Links and buttons clicked</div>
            </div>

            <div class="metric-card">
                <h3>Avg Click/Visit</h3>
                <div class="value">${((analytics.totalClicks || 0) / (analytics.pageViews || 1)).toFixed(2)}</div>
                <div class="label">Engagement rate</div>
            </div>
        </div>

        <div class="chart">
            <h2>📱 Device Breakdown</h2>
            <div class="bar-chart">
                ${deviceHtml || '<p>No device data available</p>'}
            </div>
        </div>

        <div class="chart">
            <h2>🔗 Top Clicked Links</h2>
            <div class="bar-chart">
                ${linksHtml || '<p>No click data available</p>'}
            </div>
        </div>

        <div class="timestamp">
            Last updated: ${new Date().toISOString()}
        </div>
    </div>
</body>
</html>`;

  return html;
}

/**
 * Generate markdown report
 */
function generateMarkdownReport(analytics) {
  const eventSummary = Object.entries(analytics.eventSummary || {})
    .map(([type, count]) => `- **${type}**: ${count} events`)
    .join('\n');

  const deviceBreakdown = Object.entries(analytics.deviceBreakdown || {})
    .sort(([,a], [,b]) => b - a)
    .map(([device, count]) => {
      const percent = ((count / (analytics.pageViews || 1)) * 100);
      return `- **${device}**: ${count} (${percent.toFixed(1)}%)`;
    }).join('\n');

  const topLinks = (analytics.topClickedLinks || [])
    .slice(0, 10)
    .map((link, index) => `${index + 1}. [${link.link}](#) - ${link.count} clicks`)
    .join('\n');

  const report = `# GitHub Profile Analytics Report

**Generated:** ${new Date().toISOString()}

## 📊 Overview

| Metric | Value |
|--------|-------|
| **Page Views** | ${(analytics.pageViews || 0).toLocaleString()} |
| **Unique Visitors** | ${(analytics.uniqueVisitors || 0).toLocaleString()} |
| **Total Clicks** | ${(analytics.totalClicks || 0).toLocaleString()} |
| **Avg Clicks/Visit** | ${((analytics.totalClicks || 0) / (analytics.pageViews || 1)).toFixed(2)} |

## 📱 Device Breakdown

${deviceBreakdown || '- No device data available'}

## 🔗 Top Clicked Links

${topLinks || '- No click data available'}

## 📈 Event Summary

${eventSummary || '- No event data available'}

---

*This report is automatically generated from visitor analytics data.*
`;

  return report;
}

/**
 * Create dashboard files
 */
function createDashboards(analyticsData) {
  const outputDir = path.join(__dirname, '..', 'analytics-dashboards');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate HTML dashboard
  const htmlDashboard = generateDashboard(analyticsData);
  fs.writeFileSync(path.join(outputDir, 'index.html'), htmlDashboard);
  console.log(`✅ HTML dashboard created: ${outputDir}/index.html`);

  // Generate Markdown report
  const mdReport = generateMarkdownReport(analyticsData);
  fs.writeFileSync(path.join(outputDir, 'ANALYTICS_REPORT.md'), mdReport);
  console.log(`✅ Markdown report created: ${outputDir}/ANALYTICS_REPORT.md`);
}

/**
 * Main execution
 */
function main() {
  const analyticsData = {
    projectId: 'SulagnaSasmal-github-profile',
    pageViews: 0,
    uniqueVisitors: 0,
    totalClicks: 0,
    topClickedLinks: [],
    deviceBreakdown: {},
    eventSummary: {},
  };

  console.log('\n📊 Analytics Dashboard Generator\n');
  createDashboards(analyticsData);
  console.log('\n✅ Dashboard generation complete!\n');
}

if (require.main === module) {
  main();
}

module.exports = { generateDashboard, generateMarkdownReport, createDashboards };
