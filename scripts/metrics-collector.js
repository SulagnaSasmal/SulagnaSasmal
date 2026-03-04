#!/usr/bin/env node

/**
 * Metrics Collector Script
 * Collects and stores GitHub metrics for analytics tracking
 */

const fs = require('fs');
const path = require('path');
const { getUserStats, getContributionMetrics } = require('./github-api-queries');

const metricsDir = path.join(__dirname, '..', 'metrics');
const analyticsPath = path.join(metricsDir, 'analytics.json');
const historyDir = path.join(metricsDir, 'historical-data');
const token = process.env.GITHUB_TOKEN;
const username = process.env.GITHUB_USERNAME || 'SulagnaSasmal';

/**
 * Ensure directories exist
 */
function ensureDirectories() {
  if (!fs.existsSync(metricsDir)) {
    fs.mkdirSync(metricsDir, { recursive: true });
  }
  if (!fs.existsSync(historyDir)) {
    fs.mkdirSync(historyDir, { recursive: true });
  }
}

/**
 * Get or initialize analytics data
 */
function getAnalyticsData() {
  if (fs.existsSync(analyticsPath)) {
    return JSON.parse(fs.readFileSync(analyticsPath, 'utf-8'));
  }
  return {
    username,
    lastUpdated: new Date().toISOString(),
    history: [],
    current: {},
  };
}

/**
 * Collect current metrics
 */
async function collectMetrics() {
  try {
    console.log('🚀 Starting metrics collection...');
    console.log(`📊 Collecting metrics for: ${username}`);

    if (!token) {
      console.error('❌ ERROR: GITHUB_TOKEN environment variable not set');
      process.exit(1);
    }

    ensureDirectories();

    // Fetch metrics
    console.log('📡 Fetching GitHub metrics...');
    const stats = await getUserStats(username);
    const contributions = await getContributionMetrics(username);

    // Prepare metrics object
    const timestamp = new Date().toISOString();
    const metrics = {
      timestamp,
      followers: stats.user.followers.totalCount,
      following: stats.user.following.totalCount,
      totalRepositories: stats.user.repositories.totalCount,
      totalStars: stats.user.repositories.nodes.reduce((sum, repo) => sum + repo.stargazerCount, 0),
      totalForks: stats.user.repositories.nodes.reduce((sum, repo) => sum + repo.forkCount, 0),
      contributions: contributions.user.contributionsCollection.contributionCalendar.totalContributions,
      pullRequests: contributions.user.pullRequests.totalCount,
      issues: contributions.user.issues.totalCount,
      activeRepositories: stats.user.repositories.nodes.filter(r => !r.isArchived).length,
    };

    // Get analytics data
    let analytics = getAnalyticsData();

    // Update current metrics
    analytics.current = metrics;
    analytics.lastUpdated = timestamp;

    // Add to history
    analytics.history.push(metrics);

    // Keep only last 90 days of history (approximately 3 months of daily collections)
    if (analytics.history.length > 90) {
      analytics.history = analytics.history.slice(-90);
    }

    // Save analytics
    fs.writeFileSync(analyticsPath, JSON.stringify(analytics, null, 2));

    // Save daily snapshot in historical-data
    const date = new Date(timestamp);
    const dateStr = date.toISOString().split('T')[0];
    const historyPath = path.join(historyDir, `${dateStr}.json`);

    if (!fs.existsSync(historyPath)) {
      fs.writeFileSync(historyPath, JSON.stringify(metrics, null, 2));
    }

    console.log('✅ Metrics collection complete!');
    console.log('\n📊 Current Metrics:');
    console.log(`   - Followers: ${metrics.followers}`);
    console.log(`   - Repositories: ${metrics.totalRepositories}`);
    console.log(`   - Total Stars: ${metrics.totalStars}`);
    console.log(`   - Contributions (this year): ${metrics.contributions}`);
    console.log(`   - Pull Requests: ${metrics.pullRequests}`);
    console.log(`   - Issues: ${metrics.issues}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error collecting metrics:', error.message);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  collectMetrics();
}

module.exports = { collectMetrics };
