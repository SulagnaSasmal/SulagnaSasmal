#!/usr/bin/env node

/**
 * Analytics Server
 * Collects, stores, and processes visitor analytics data
 * Can be deployed to Node.js, Vercel, or any cloud platform
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const ANALYTICS_DIR = path.join(__dirname, '..', 'analytics-data');

/**
 * Ensure analytics directory exists
 */
function ensureAnalyticsDir() {
  if (!fs.existsSync(ANALYTICS_DIR)) {
    fs.mkdirSync(ANALYTICS_DIR, { recursive: true });
  }
}

/**
 * Process analytics event
 */
function processEvent(event) {
  const { projectId, event: eventData, timestamp } = event;
  const date = new Date(timestamp).toISOString().split('T')[0];
  const projectDir = path.join(ANALYTICS_DIR, projectId);
  const dateDir = path.join(projectDir, date);

  // Create directories
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  }
  if (!fs.existsSync(dateDir)) {
    fs.mkdirSync(dateDir, { recursive: true });
  }

  // Store by event type
  const eventType = eventData.type || 'unknown';
  const eventFile = path.join(dateDir, `${eventType}s.jsonl`);

  // Append to JSONL file (one JSON per line)
  fs.appendFileSync(eventFile, JSON.stringify(eventData) + '\n');

  return {
    success: true,
    event: eventData.type,
    stored: true,
  };
}

/**
 * Get analytics summary for a project
 */
function getProjectSummary(projectId) {
  const projectDir = path.join(ANALYTICS_DIR, projectId);

  if (!fs.existsSync(projectDir)) {
    return { error: 'Project not found' };
  }

  const dates = fs.readdirSync(projectDir);
  let totalEvents = 0;
  const eventTypes = {};

  for (const date of dates) {
    const dateDir = path.join(projectDir, date);
    const files = fs.readdirSync(dateDir);

    for (const file of files) {
      const filePath = path.join(dateDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n').filter(l => l.length > 0);
      totalEvents += lines.length;

      const eventType = file.replace('s.jsonl', '');
      eventTypes[eventType] = (eventTypes[eventType] || 0) + lines.length;
    }
  }

  return {
    projectId,
    totalEvents,
    eventTypes,
    dateRange: {
      from: dates[0],
      to: dates[dates.length - 1],
    },
  };
}

/**
 * Get visitor analytics (clicks, pages, behavior)
 */
function getVisitorAnalytics(projectId) {
  const summary = getProjectSummary(projectId);

  if (summary.error) return summary;

  const projectDir = path.join(ANALYTICS_DIR, projectId);
  const dates = fs.readdirSync(projectDir);

  let pageViews = 0;
  let uniqueVisitors = new Set();
  let totalClicks = 0;
  let topLinks = {};
  let deviceBreakdown = {};

  for (const date of dates) {
    const dateDir = path.join(projectDir, date);

    // Process pageview events
    const pageviewFile = path.join(dateDir, 'pageviews.jsonl');
    if (fs.existsSync(pageviewFile)) {
      const content = fs.readFileSync(pageviewFile, 'utf-8');
      const lines = content.split('\n').filter(l => l.length > 0);
      pageViews += lines.length;

      lines.forEach(line => {
        try {
          const event = JSON.parse(line);
          uniqueVisitors.add(event.sessionId);
          deviceBreakdown[event.deviceType] = (deviceBreakdown[event.deviceType] || 0) + 1;
        } catch (e) { }
      });
    }

    // Process click events
    const clickFile = path.join(dateDir, 'clicks.jsonl');
    if (fs.existsSync(clickFile)) {
      const content = fs.readFileSync(clickFile, 'utf-8');
      const lines = content.split('\n').filter(l => l.length > 0);
      totalClicks += lines.length;

      lines.forEach(line => {
        try {
          const event = JSON.parse(line);
          const link = event.element_href || event.element_text || 'unknown';
          topLinks[link] = (topLinks[link] || 0) + 1;
        } catch (e) { }
      });
    }
  }

  // Sort top links
  const sortedLinks = Object.entries(topLinks)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([link, count]) => ({ link, count }));

  return {
    projectId,
    pageViews,
    uniqueVisitors: uniqueVisitors.size,
    totalClicks,
    topClickedLinks: sortedLinks,
    deviceBreakdown,
    eventSummary: summary.eventTypes,
  };
}

/**
 * HTTP Request Handler
 */
function handleRequest(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Parse URL
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  console.log(`${req.method} ${pathname}`);

  // Track single event
  if (pathname === '/track' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const event = JSON.parse(body);
        const result = processEvent(event);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid event data' }));
      }
    });
  }

  // Batch track events
  else if (pathname === '/batch-track' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { projectId, events } = JSON.parse(body);
        let processed = 0;

        for (const eventData of events) {
          processEvent({ projectId, event: eventData, timestamp: Date.now() });
          processed++;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, processed }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid batch data' }));
      }
    });
  }

  // Get project summary
  else if (pathname.startsWith('/analytics/') && req.method === 'GET') {
    const projectId = pathname.split('/')[2];
    const analytics = getVisitorAnalytics(projectId);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(analytics, null, 2));
  }

  // Health check
  else if (pathname === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', timestamp: Date.now() }));
  }

  // 404
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
}

/**
 * Start server
 */
function startServer() {
  ensureAnalyticsDir();

  const server = http.createServer(handleRequest);

  server.listen(PORT, () => {
    console.log('\n' + '='.repeat(70));
    console.log('📊 GitHub Profile Analytics Server');
    console.log('='.repeat(70));
    console.log(`\n✅ Server running on http://localhost:${PORT}`);
    console.log(`📁 Analytics stored in: ${ANALYTICS_DIR}\n`);
    console.log('Endpoints:');
    console.log('  POST /track - Track a single event');
    console.log('  POST /batch-track - Track multiple events');
    console.log('  GET /analytics/:projectId - Get project analytics');
    console.log('  GET /health - Health check\n');
  });
}

// Start if executed directly
if (require.main === module) {
  startServer();
}

module.exports = {
  handleRequest,
  processEvent,
  getProjectSummary,
  getVisitorAnalytics,
};
