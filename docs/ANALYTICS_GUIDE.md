# GitHub Profile Analytics System

**Comprehensive visitor tracking, behavior analytics, and engagement metrics for your GitHub profile**

---

## 🎯 Overview

This analytics system provides detailed insights into:
- **Who** is visiting your profile
- **What** they're clicking
- **How** they interact with your content
- **When** they visit
- **Where** they come from
- **Which** devices they use

---

## 📊 What Gets Tracked

### Page Views
- Profile visits count
- Referrer information
- User agent and device type
- Screen resolution
- Timezone and language
- Session identification

### Click Tracking
- Every link clicked
- Button interactions
- Element text and href
- Click coordinates (x, y)
- Time spent before click
- Scroll depth when clicked

### User Behavior
- Scroll depth percentage
- Time on page
- Visibility changes (tab activity)
- Session duration
- Interaction count
- Activity patterns

### Engagement Metrics
- Most clicked links
- Device distribution
- Bounce rate patterns
- Time spent per section
- Click-through rates
- Visitor return rate

---

## 🚀 Implementation

### Step 1: Embed Tracking Script

Add this to your GitHub profile README or HTML:

```html
<script src="https://your-domain.com/github-analytics-tracker.js?auto=true"></script>
```

Or manually initialize:

```html
<script src="/github-analytics-tracker.js"></script>
<script>
  const analytics = new GitHubProfileAnalytics({
    projectId: 'SulagnaSasmal-github-profile',
    serverUrl: 'https://your-analytics-server.com',
    enableTracking: true,
    trackClicks: true,
    trackScroll: true,
    trackTime: true,
  });
  analytics.registerExit();
</script>
```

### Step 2: Deploy Analytics Server

**Option A: Local Development**
```bash
node scripts/analytics-server.js
# Server runs on http://localhost:3001
```

**Option B: Cloud Deployment (Vercel)**
```bash
# Deploy to Vercel
vercel --prod
```

**Option C: Docker Container**
```dockerfile
FROM node:18
COPY scripts/analytics-server.js /app/
WORKDIR /app
CMD ["node", "analytics-server.js"]
```

### Step 3: Update Server URL

Update the tracking script with your server URL:

```javascript
serverUrl: 'https://your-analytics-server.com'
```

### Step 4: Generate Dashboards

```bash
node scripts/dashboard-generator.js
```

Access dashboard at: `http://your-analytics-server.com/analytics/SulagnaSasmal-github-profile`

---

## 📈 Analytics Endpoints

### Track Single Event
```bash
POST /track
Content-Type: application/json

{
  "projectId": "SulagnaSasmal-github-profile",
  "event": {
    "type": "click",
    "element_text": "View Project",
    "element_href": "https://github.com/...",
    "timestamp": 1709548800000
  }
}
```

### Batch Track Events
```bash
POST /batch-track
Content-Type: application/json

{
  "projectId": "SulagnaSasmal-github-profile",
  "events": [
    { "type": "pageview", "timestamp": 1709548800000 },
    { "type": "click", "element_href": "...", "timestamp": 1709548801000 }
  ]
}
```

### Get Analytics
```bash
GET /analytics/SulagnaSasmal-github-profile
```

Response:
```json
{
  "projectId": "SulagnaSasmal-github-profile",
  "pageViews": 1500,
  "uniqueVisitors": 890,
  "totalClicks": 3200,
  "topClickedLinks": [
    { "link": "https://portfolio.com", "count": 450 },
    { "link": "https://github.com/projects", "count": 380 }
  ],
  "deviceBreakdown": {
    "desktop": 1200,
    "mobile": 280,
    "tablet": 20
  }
}
```

---

## 📊 Dashboard Features

### Real-Time Metrics
- Current visitor count
- Today's page views
- Active sessions
- Recent clicks

### Historical Trends
- 30-day growth charts
- Weekly comparisons
- Monthly summaries
- Year-over-year analysis

### Engagement Analysis
- Top clicked links
- Device distribution
- Referrer sources
- Geographic data

### Session Analytics
- Average session duration
- Bounce rate
- Return visitor percentage
- Interaction count per session

---

## 🔒 Privacy & Compliance

### Data Privacy
- No personal data collected (email, names, etc.)
- Session IDs are anonymous
- Data stored locally first (localStorage)
- Option to disable tracking

### GDPR Compliance
- Tracking can be disabled via `enableTracking: false`
- No PII stored
- Users can clear data from localStorage
- Transparent data collection

### Implementation

```javascript
// Disable tracking if user opts out
const analytics = new GitHubProfileAnalytics({
  enableTracking: !userOptedOut,
  // ... other options
});
```

---

## 📁 Data Storage

### Directory Structure
```
analytics-data/
├── SulagnaSasmal-github-profile/
│   ├── 2026-03-04/
│   │   ├── pageviews.jsonl
│   │   ├── clicks.jsonl
│   │   ├── scroll.jsonl
│   │   └── activity.jsonl
│   ├── 2026-03-03/
│   └── ...
```

### JSONL Format
Each line is a complete JSON object:
```jsonl
{"type":"pageview","url":"https://github.com/SulagnaSasmal","timestamp":1709548800000}
{"type":"click","element_text":"Portfolio","timestamp":1709548801000}
{"type":"scroll","scroll_percent":75,"timestamp":1709548802000}
```

---

## 🎨 Custom Reports

### Generate Custom Dashboard

```javascript
const { getVisitorAnalytics } = require('./scripts/analytics-server');

const analytics = getVisitorAnalytics('SulagnaSasmal-github-profile');

console.log(`
📊 Analytics Summary
- Page Views: ${analytics.pageViews}
- Unique Visitors: ${analytics.uniqueVisitors}
- Total Clicks: ${analytics.totalClicks}
- Avg Clicks/Visit: ${(analytics.totalClicks / analytics.pageViews).toFixed(2)}
`);
```

### Export Data to CSV

```bash
# Via API
curl https://your-analytics-server.com/analytics/SulagnaSasmal-github-profile > analytics.json

# Convert to CSV
node -e "
const data = require('./analytics.json');
console.log('Date,PageViews,Clicks,Visitors');
// Process and output...
"
```

---

## 🤝 Integration Examples

### GitHub Actions Workflow

```yaml
name: Generate Analytics Report
on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly

jobs:
  analytics:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: node scripts/dashboard-generator.js
      - uses: stefanzweifel/git-auto-commit-action@v5
        with:
          file_pattern: analytics-dashboards/
          commit_message: "📊 Update analytics dashboard"
```

### Slack Notifications

```javascript
async function notifySlack(analytics) {
  const message = {
    text: `📊 Weekly Analytics Summary`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Page Views:* ${analytics.pageViews}\n*Unique Visitors:* ${analytics.uniqueVisitors}`
        }
      }
    ]
  };

  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify(message)
  });
}
```

---

## 🧪 Testing

### Test Tracking Locally

```javascript
// In browser console
analytics.trackClick(document.querySelector('a'));
// or
analytics.track({ type: 'test', value: 'manual' });
```

### View Stored Events

```javascript
// In browser console
JSON.parse(localStorage.getItem('gh_analytics_events'));
```

### Manual Server Test

```bash
# Start server
node scripts/analytics-server.js

# Send test event
curl -X POST http://localhost:3001/track \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "test",
    "event": {"type": "test", "timestamp": 1709548800000}
  }'

# Get analytics
curl http://localhost:3001/analytics/test
```

---

## 📈 Insights You'll Gain

### Traffic Patterns
- Which hours get most traffic
- Which days are busiest
- Geographic distribution
- Traffic sources

### Content Performance
- Which projects get clicks
- Which links are popular
- Which sections are ignored
- Optimal content placement

### User Behavior
- How long people stay
- How far they scroll
- What they interact with
- Device preferences

### Career Impact
- Profile visibility trends
- Project interest levels
- Recruiter engagement signals
- Community response

---

## 🔧 Advanced Configuration

### Custom Event Tracking

```javascript
// Track custom events
analytics.track({
  type: 'custom_action',
  action: 'download_resume',
  timestamp: Date.now(),
  sessionId: analytics.sessionId
});
```

### Event Filters

```javascript
// Only track specific elements
document.addEventListener('click', (e) => {
  if (e.target.matches('.trackable')) {
    analytics.trackClick(e.target, e);
  }
});
```

### Rate Limiting

```javascript
// Batch events to reduce server load
setInterval(() => {
  analytics.syncQueuedEvents();
}, 5 * 60 * 1000); // Every 5 minutes
```

---

## 🚀 Deployment Options

### Vercel
```bash
npm i -g vercel
vercel --prod
```

### AWS Lambda
```bash
# Requires serverless framework or wrapper
npm i -g serverless
serverless deploy
```

### Heroku
```bash
heroku create
git push heroku main
```

### Docker
```bash
docker build -t gh-analytics .
docker run -p 3001:3001 gh-analytics
```

---

## 📞 Troubleshooting

### Events not being tracked
- Check browser console for errors
- Verify serverUrl is correct
- Ensure CORS is enabled
- Check server is running

### Dashboard not loading
- Verify analytics data exists
- Check file permissions
- Ensure directory structure is correct
- Run dashboard generator

### Server errors
- Check logs: `node scripts/analytics-server.js`
- Verify port is available
- Check file system permissions
- Ensure analytics-data directory exists

---

## 📚 Resources

- [Web Analytics Best Practices](https://web.dev/analytics/)
- [Privacy in Analytics](https://privacybydesign.foundation/)
- [GDPR Compliance](https://gdpr-info.eu/)
- [Server Deployment Guides](https://vercel.com/docs)

---

*Last Updated: 2026-03-04*
