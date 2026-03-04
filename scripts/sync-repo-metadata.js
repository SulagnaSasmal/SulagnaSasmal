#!/usr/bin/env node

/**
 * Repository Metadata Synchronizer
 * Syncs repository metadata across all repos
 */

const { getUserStats, queryGitHub } = require('./github-api-queries');

const token = process.env.GITHUB_TOKEN;
const username = process.env.GITHUB_USERNAME || 'SulagnaSasmal';

if (!token) {
  console.error('❌ ERROR: GITHUB_TOKEN environment variable not set');
  process.exit(1);
}

/**
 * Repository metadata templates
 */
const REPO_METADATA = {
  // Format: repo-name: { description, topics, homepage }
  'ppt-to-mp4-doc-automation': {
    description: 'Python pipeline for narrated video generation from PowerPoint presentations',
    topics: ['python', 'automation', 'video', 'documentation'],
    homepage: 'https://github.com/SulagnaSasmal/ppt-to-mp4-doc-automation',
  },
  'fraudshield-docs': {
    description: 'AI Fraud Detection System - Technical documentation and API reference',
    topics: ['documentation', 'fintech', 'api-reference', 'fraud-detection'],
    homepage: 'https://sulagnasasmal.github.io/fraudshield-docs/',
  },
  'payments-api-guide': {
    description: 'PayPlus REST API Developer Reference - Complete API documentation',
    topics: ['api-reference', 'payments', 'fintech', 'rest-api'],
    homepage: 'https://sulagnasasmal.github.io/payments-api-guide/',
  },
  'compliance-regulatory-hub': {
    description: 'Investment Compliance Framework - UCITS, AIFMD, MiFID II regulatory documentation',
    topics: ['compliance', 'fintech', 'regulatory', 'investment'],
    homepage: 'https://sulagnasasmal.github.io/compliance-regulatory-hub/',
  },
  'vaultpay-api-docs': {
    description: 'VaultPay Fintech Payment API - Comprehensive API documentation and integration guide',
    topics: ['api-reference', 'payments', 'fintech', 'python'],
    homepage: 'https://sulagnasasmal.github.io/vaultpay-api-docs/',
  },
  'docs-as-code-portal': {
    description: 'Docs-as-Code Methodology Guide - Best practices for documentation automation',
    topics: ['documentation', 'best-practices', 'automation', 'mkdocs'],
    homepage: 'https://sulagnasasmal.github.io/docs-as-code-portal/',
  },
  'doccraft': {
    description: 'AI Documentation Generator - Next.js + GPT-4o powered documentation assistant',
    topics: ['nextjs', 'ai', 'gpt-4o', 'documentation', 'typescript'],
    homepage: 'https://doccraft-ten.vercel.app/',
  },
  'SulagnaSasmal': {
    description: 'GitHub Profile - Professional portfolio and documentation projects showcase',
    topics: ['profile', 'portfolio', 'documentation', 'fintech'],
    homepage: 'https://sulagnasasmal.github.io/sulagnasasmal-site/',
  },
};

/**
 * Get repository metadata
 */
async function getRepositoryInfo(username) {
  const query = `
    query($userName:String!) {
      user(login: $userName) {
        repositories(first: 100, isFork: false, privacy: PUBLIC) {
          nodes {
            name
            description
            repositoryTopics(first: 10) {
              nodes {
                topic {
                  name
                }
              }
            }
            homepageUrl
            url
            isArchived
          }
        }
      }
    }
  `;

  try {
    const data = await queryGitHub(query, { userName: username });
    return data.user.repositories.nodes;
  } catch (error) {
    console.error('❌ Error fetching repositories:', error.message);
    throw error;
  }
}

/**
 * Generate metadata suggestions
 */
function generateMetadataSuggestions(repos) {
  console.log('\n📊 REPOSITORY METADATA ANALYSIS\n');
  console.log('─'.repeat(60));

  const suggestions = [];

  repos.forEach(repo => {
    const metadata = REPO_METADATA[repo.name];
    const currentTopics = repo.repositoryTopics.nodes.map(t => t.topic.name);

    console.log(`\n📦 ${repo.name}`);

    if (metadata) {
      // Check description
      if (!repo.description || repo.description !== metadata.description) {
        console.log(`  📝 Description: UPDATE NEEDED`);
        console.log(`     Current: "${repo.description || '(empty)'}"`);
        console.log(`     Suggested: "${metadata.description}"`);
        suggestions.push({
          repo: repo.name,
          type: 'description',
          current: repo.description || '',
          suggested: metadata.description,
        });
      } else {
        console.log(`  ✅ Description: OK`);
      }

      // Check topics
      const missingTopics = metadata.topics.filter(t => !currentTopics.includes(t));
      const extraTopics = currentTopics.filter(t => !metadata.topics.includes(t));

      if (missingTopics.length > 0 || extraTopics.length > 0) {
        console.log(`  🏷️  Topics: UPDATE NEEDED`);
        console.log(`     Current: [${currentTopics.join(', ') || 'none'}]`);
        console.log(`     Suggested: [${metadata.topics.join(', ')}]`);
        suggestions.push({
          repo: repo.name,
          type: 'topics',
          current: currentTopics,
          suggested: metadata.topics,
        });
      } else {
        console.log(`  ✅ Topics: OK`);
      }

      // Check homepage
      if (!repo.homepageUrl || repo.homepageUrl !== metadata.homepage) {
        console.log(`  🔗 Homepage: UPDATE NEEDED`);
        console.log(`     Current: "${repo.homepageUrl || '(empty)'}"`);
        console.log(`     Suggested: "${metadata.homepage}"`);
        suggestions.push({
          repo: repo.name,
          type: 'homepage',
          current: repo.homepageUrl || '',
          suggested: metadata.homepage,
        });
      } else {
        console.log(`  ✅ Homepage: OK`);
      }
    } else {
      console.log(`  ℹ️  No metadata template - MANUAL REVIEW NEEDED`);
    }
  });

  return suggestions;
}

/**
 * Generate report
 */
function generateReport(repos, suggestions) {
  console.log('\n' + '='.repeat(60));
  console.log('📋 METADATA SYNCHRONIZATION REPORT');
  console.log('='.repeat(60));

  const totalRepos = repos.length;
  const reposNeedingUpdates = new Set(suggestions.map(s => s.repo)).size;
  const updatePercentage = Math.round((reposNeedingUpdates / totalRepos) * 100);

  console.log(`\n✅ Total Repositories: ${totalRepos}`);
  console.log(`⚠️  Repositories Needing Updates: ${reposNeedingUpdates} (${updatePercentage}%)`);
  console.log(`🔧 Total Metadata Updates: ${suggestions.length}`);

  // Breakdown by type
  const byType = {};
  suggestions.forEach(s => {
    byType[s.type] = (byType[s.type] || 0) + 1;
  });

  if (Object.keys(byType).length > 0) {
    console.log('\n📊 Updates Needed by Type:');
    Object.entries(byType).forEach(([type, count]) => {
      const icon = type === 'description' ? '📝' : type === 'topics' ? '🏷️' : '🔗';
      console.log(`   ${icon} ${type}: ${count}`);
    });
  }

  console.log('\n' + '='.repeat(60));

  if (suggestions.length === 0) {
    console.log('\n✅ All repositories are synchronized!\n');
  } else {
    console.log(`\n⚠️  ${suggestions.length} updates recommended\n`);
  }
}

/**
 * Main execution
 */
async function syncRepositories() {
  try {
    console.log('\n🔄 Repository Metadata Synchronizer');
    console.log(`📊 Analyzing metadata for: ${username}\n`);

    // Fetch repositories
    const repos = await getRepositoryInfo(username);
    console.log(`✓ Found ${repos.length} repositories\n`);

    // Generate suggestions
    const suggestions = generateMetadataSuggestions(repos);

    // Generate report
    generateReport(repos, suggestions);

    if (suggestions.length === 0) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  syncRepositories();
}

module.exports = { getRepositoryInfo, generateMetadataSuggestions, generateReport };
