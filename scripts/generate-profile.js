#!/usr/bin/env node

/**
 * Main Profile Generation Script
 * Orchestrates fetching GitHub data and updating README
 */

const fs = require('fs');
const path = require('path');
const {
  getUserStats,
  getTopRepositories,
  getRecentActivity,
} = require('./github-api-queries');
const {
  generateCompleteProfile,
  updateReadmeWithSections,
} = require('./profile-template');

const readmePath = path.join(__dirname, '..', 'README.md');
const token = process.env.GITHUB_TOKEN;
const username = process.env.GITHUB_USERNAME || 'SulagnaSasmal';

/**
 * Main execution function
 */
async function generateProfile() {
  try {
    console.log('🚀 Starting GitHub profile generation...');
    console.log(`📊 Fetching data for user: ${username}`);

    if (!token) {
      console.error('❌ ERROR: GITHUB_TOKEN environment variable not set');
      process.exit(1);
    }

    // Fetch data from GitHub API
    console.log('📡 Fetching user statistics...');
    const stats = await getUserStats(username);

    console.log('📡 Fetching top repositories...');
    const repositories = await getTopRepositories(username, 50);

    console.log('📡 Fetching recent activity...');
    const activity = await getRecentActivity(username);

    // Generate profile sections
    console.log('🎨 Generating profile sections...');
    const sections = generateCompleteProfile(
      stats,
      repositories.user.repositories,
      activity.user
    );

    // Read current README
    if (!fs.existsSync(readmePath)) {
      console.error(`❌ README.md not found at ${readmePath}`);
      process.exit(1);
    }

    let currentReadme = fs.readFileSync(readmePath, 'utf-8');

    // Update README with new sections
    console.log('✍️ Updating README.md...');
    const updatedReadme = updateReadmeWithSections(currentReadme, sections);

    // Write updated README
    fs.writeFileSync(readmePath, updatedReadme);

    console.log('✅ Profile generation complete!');
    console.log(`📝 Updated: ${readmePath}`);
    console.log('\n📊 Generated Statistics:');
    console.log(`   - Total Contributions: ${stats.user.contributionsCollection.contributionCalendar.totalContributions}`);
    console.log(`   - Followers: ${stats.user.followers.totalCount}`);
    console.log(`   - Repositories: ${stats.user.repositories.totalCount}`);
    console.log(`   - Top 6 repositories updated`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error generating profile:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  generateProfile();
}

module.exports = { generateProfile };
