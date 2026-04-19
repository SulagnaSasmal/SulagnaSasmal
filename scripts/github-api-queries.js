/**
 * GitHub GraphQL API Query Helper
 * Fetches user statistics, repositories, and metrics
 */

const username = process.env.GITHUB_USERNAME || 'SulagnaSasmal';

function getToken() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error('GITHUB_TOKEN environment variable not set');
  }
  return token;
}

/**
 * Make a GraphQL query to GitHub API
 */
async function queryGitHub(query, variables = {}) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await response.json();

  if (data.errors) {
    console.error('GraphQL Error:', data.errors);
    throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);
  }

  return data.data;
}

/**
 * Get user profile statistics
 */
async function getUserStats(username) {
  const query = `
    query($userName:String!) {
      user(login: $userName) {
        name
        login
        bio
        location
        email
        websiteUrl
        twitterUsername
        followers {
          totalCount
        }
        following {
          totalCount
        }
        repositories(first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
          totalCount
          nodes {
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              name
            }
            isArchived
            updatedAt
          }
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  return queryGitHub(query, { userName: username });
}

/**
 * Get top repositories with metrics
 */
async function getTopRepositories(username, first = 10) {
  const query = `
    query($userName:String!, $first:Int!) {
      user(login: $userName) {
        repositories(first: $first, orderBy: {field: STARGAZERS, direction: DESC}) {
          nodes {
            name
            description
            url
            stargazerCount
            forkCount
            issues(first: 5, states: OPEN) {
              totalCount
            }
            pullRequests(first: 5, states: OPEN) {
              totalCount
            }
            releases(first: 1) {
              totalCount
              nodes {
                name
                publishedAt
              }
            }
            primaryLanguage {
              name
              color
            }
            languages(first: 5) {
              nodes {
                name
                color
              }
            }
            updatedAt
            pushedAt
            isArchived
            isPrivate
          }
        }
      }
    }
  `;

  return queryGitHub(query, { userName: username, first });
}

/**
 * Get language breakdown
 */
async function getLanguageBreakdown(username) {
  const query = `
    query($userName:String!) {
      user(login: $userName) {
        repositories(first: 100, isFork: false) {
          nodes {
            primaryLanguage {
              name
            }
            languages(first: 5) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  `;

  return queryGitHub(query, { userName: username });
}

/**
 * Get recent contributions
 */
async function getRecentActivity(username) {
  const query = `
    query($userName:String!) {
      user(login: $userName) {
        repositories(first: 10, orderBy: {field: PUSHED_AT, direction: DESC}) {
          nodes {
            name
            url
            pushedAt
            refs(first: 1, refPrefix: "refs/heads/") {
              nodes {
                target {
                  ... on Commit {
                    history(first: 3) {
                      nodes {
                        message
                        committedDate
                        author {
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  return queryGitHub(query, { userName: username });
}

/**
 * Get organization and contribution details
 */
async function getContributionMetrics(username) {
  const query = `
    query($userName:String!) {
      user(login: $userName) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
        pullRequests(first: 0) {
          totalCount
        }
        issues(first: 0) {
          totalCount
        }
        followers(first: 0) {
          totalCount
        }
      }
    }
  `;

  return queryGitHub(query, { userName: username });
}

/**
 * Export all query functions
 */
module.exports = {
  queryGitHub,
  getUserStats,
  getTopRepositories,
  getLanguageBreakdown,
  getRecentActivity,
  getContributionMetrics,
};

/**
 * Test function - run directly to test API connectivity
 */
async function test() {
  try {
    console.log('Testing GitHub API connection...');
    const stats = await getUserStats(username);
    console.log('✓ API Connection successful');
    console.log('User:', stats.user.login);
    console.log('Followers:', stats.user.followers.totalCount);
    console.log('Repositories:', stats.user.repositories.totalCount);
  } catch (error) {
    console.error('✗ API Connection failed:', error.message);
    process.exit(1);
  }
}

// Run test if executed directly
if (require.main === module) {
  test();
}
