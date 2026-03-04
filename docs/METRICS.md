# Metrics & Analytics Guide

This guide explains how GitHub metrics are collected, tracked, and analyzed.

---

## 📊 Overview

The analytics system automatically collects GitHub metrics weekly and generates reports to track portfolio growth and career momentum.

---

## 🔍 Metrics Collected

### Profile Level Metrics

| Metric | Description | Frequency |
|--------|-------------|-----------|
| **Followers** | Total profile followers | Weekly |
| **Following** | Accounts you follow | Weekly |
| **Total Repositories** | Total repo count | Weekly |
| **Active Repositories** | Non-archived repos | Weekly |
| **Total Contributions** | YTD contributions | Weekly |

### Project Level Metrics

| Metric | Description | Tracking |
|--------|-------------|----------|
| **Stars Per Repo** | Individual project stars | Weekly |
| **Forks Per Repo** | Individual project forks | Weekly |
| **Open Issues** | Total open issues | Weekly |
| **Pull Requests** | Total PRs authored | Weekly |
| **Release History** | Version releases | Per release |

### Engagement Metrics

| Metric | Purpose | Value |
|--------|---------|-------|
| **Issue Resolution Rate** | PRs / Issues ratio | Health indicator |
| **Repository Quality** | Active/Total repos | Maintenance signal |
| **Contribution Velocity** | YTD contributions | Activity level |
| **Follower Growth Rate** | Weekly follower change | Visibility growth |

---

## 📈 Collection System

### Automated Collection

**Schedule:** Every Sunday at 5 AM UTC

**Process:**
1. GitHub API queries fetch current metrics
2. Data stored in `metrics/analytics.json`
3. Daily snapshots saved in `metrics/historical-data/`
4. Analytics report generated automatically

### Data Storage

```
metrics/
├── analytics.json           # Current + 90-day history
├── historical-data/
│   ├── 2026-03-01.json    # Daily snapshot
│   ├── 2026-03-02.json
│   └── ...
└── REPORT.md              # Generated report
```

### Running Collection Manually

```bash
# Collect metrics now
GITHUB_TOKEN=$YOUR_TOKEN GITHUB_USERNAME=SulagnaSasmal node scripts/metrics-collector.js
```

---

## 📊 Analytics Reports

### Automatic Report Generation

**Generated:** Weekly, after metrics collection

**Contents:**
- Current metrics snapshot
- Growth trends (week-over-week)
- Engagement analysis
- Portfolio insights
- Status indicators

### Report Formats

#### Text Report
```
📊 GITHUB ANALYTICS REPORT
================================

CURRENT METRICS
Followers: 150
Total Stars: 450
Repositories: 12
Active Repos: 11
...

GROWTH TRENDS
Followers: +5 (+3.4%)
Stars: +12 (+2.7%)
...
```

#### Markdown Report
```markdown
# GitHub Analytics Report

| Metric | Value |
|--------|-------|
| Followers | 150 |
| Stars | 450 |
...
```

### Viewing Reports

```bash
# Generate report on-demand
npm run analytics-report

# View report
cat metrics/REPORT.md
```

---

## 🎯 Key Metrics Explained

### Follower Growth
- **Importance:** Network visibility
- **Target:** 10-20% monthly growth
- **Drivers:** Quality projects, activity, contributions

### Star Growth
- **Importance:** Project popularity
- **Target:** 5-15% monthly growth per project
- **Drivers:** Project quality, documentation, visibility

### Contribution Velocity
- **Importance:** Active development signal
- **Target:** Consistent weekly contributions
- **Drivers:** Regular commits, PRs, maintenance

### Repository Health
- **Importance:** Portfolio quality signal
- **Target:** 90%+ active repos
- **Drivers:** Regular updates, maintenance

### Engagement Rate
- **Importance:** Community interaction
- **Calculation:** PRs / Issues
- **Target:** >1.0 (more PRs than issues)

---

## 📈 Trend Analysis

### Growth Calculation

```
Growth % = ((Current - Previous) / Previous) * 100

Example:
Previous followers: 140
Current followers: 150
Growth = ((150 - 140) / 140) * 100 = 7.1%
```

### Momentum Indicators

🟢 **Growing:** Positive growth week-over-week
🟡 **Stable:** No significant change
🔴 **Declining:** Negative growth

---

## 📊 Dashboard Interpretation

### Portfolio Metrics Section

```
STATUS: 📈 Growing
Portfolio Size: 12 repositories
Community: 150 followers
Impact: 450 total stars
```

### What it means:
- ✅ 12 repos = good project diversity
- ✅ 150 followers = visible presence
- ✅ 450 stars = moderate popularity

### Growth Section

```
Followers: +5 (+3.4%)
Stars: +12 (+2.7%)
Contributions: +15
```

### What it means:
- ✅ Growing follower base
- ✅ Increasing project visibility
- ✅ Active development

---

## 🎯 Setting Goals

### Short-term (1 month)

| Metric | Target | Strategy |
|--------|--------|----------|
| Followers | +20 | Engage in communities, share projects |
| Stars | +30 | Improve documentation, showcase work |
| PRs | +10 | Contribute to open source |

### Medium-term (3 months)

| Metric | Target | Strategy |
|--------|--------|----------|
| Followers | +75 (50% growth) | Build thought leadership |
| Stars | +100 (22% growth) | Release new projects |
| Contributions | 200+ YTD | Maintain activity streak |

### Long-term (12 months)

| Metric | Target | Strategy |
|--------|--------|----------|
| Followers | +300 (200% growth) | Establish authority |
| Stars | +400 (89% growth) | Create impactful projects |
| Active Repos | 15+ | Expand portfolio |

---

## 🔧 Workflow Integration

### Metrics Workflow

**File:** `.github/workflows/metrics.yml`

**Schedule:** Weekly (Sunday 5 AM UTC)

**Steps:**
1. Checkout repository
2. Setup Node.js environment
3. Collect GitHub metrics via GraphQL API
4. Generate analytics report
5. Auto-commit changes to GitHub

### Manual Trigger

```bash
# Via GitHub UI:
Actions → Metrics Collection & Analytics → Run workflow
```

---

## 📝 Historical Data

### Data Retention

- **Live:** Last 90 days in analytics.json
- **Archive:** Daily snapshots in historical-data/
- **Total:** 6 months recommended storage

### Accessing Historical Data

```javascript
const fs = require('fs');
const data = JSON.parse(
  fs.readFileSync('metrics/analytics.json', 'utf-8')
);

console.log(data.history); // Array of last 90 days
```

### Exporting Data

```bash
# Export to CSV
node -e "
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('metrics/analytics.json'));
const csv = data.history.map(d =>
  \`\${d.timestamp},\${d.followers},\${d.totalStars}\`
).join('\\n');
console.log(csv);
" > metrics/export.csv
```

---

## 🎨 Creating Custom Reports

### Custom Report Example

```javascript
const { getAnalyticsData } = require('./scripts/analytics-report');

const analytics = getAnalyticsData();
const current = analytics.current;

// Calculate custom metrics
const avgStarsPerRepo = current.totalStars / current.totalRepositories;
const engagement = current.pullRequests / current.issues;

console.log(`Stars/Repo: ${avgStarsPerRepo}`);
console.log(`Engagement: ${engagement}`);
```

### Report Generation

```bash
# Generate custom report
node -e "
const report = require('./scripts/analytics-report');
const analytics = report.getAnalyticsData();
console.log(report.generateReport(analytics));
"
```

---

## 📊 GitHub Actions Integration

### In Your Workflows

Reference metrics in other workflows:

```yaml
- name: Check metrics
  run: |
    FOLLOWERS=$(jq '.current.followers' metrics/analytics.json)
    echo "Current followers: $FOLLOWERS"

    if [ $FOLLOWERS -gt 100 ]; then
      echo "✅ Milestone reached!"
    fi
```

---

## 🔍 Troubleshooting

### Metrics Not Updating

**Check:**
1. Verify GITHUB_TOKEN has read permissions
2. Ensure workflow is enabled
3. Check Actions tab for errors

**Fix:**
```bash
# Manual collection
GITHUB_TOKEN=$TOKEN node scripts/metrics-collector.js
```

### Report Not Generating

**Check:**
1. Verify analytics.json exists
2. Check for Node.js errors
3. Ensure metrics collection succeeded

**Fix:**
```bash
# Regenerate report
node scripts/analytics-report.js
```

---

## 📚 Resources

- [GitHub GraphQL API](https://docs.github.com/en/graphql)
- [GitHub REST API](https://docs.github.com/en/rest)
- [GitHub Analytics Tools](https://github.com/topics/github-analytics)

---

## 📋 Maintenance Schedule

| Task | Frequency |
|------|-----------|
| Collect metrics | Weekly |
| Generate report | Weekly |
| Review trends | Monthly |
| Archive old data | Quarterly |

---

*Last Updated: 2026-03-04*
