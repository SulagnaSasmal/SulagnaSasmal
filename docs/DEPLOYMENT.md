# Analytics System Deployment Guide

## Overview

The visitor analytics system consists of three main components:

1. **Analytics Server** — Node.js backend that collects and stores visitor events
2. **Analytics Tracker** — Client-side JavaScript that runs on your profile
3. **Dashboard Generator** — Creates HTML/Markdown reports from collected data

This guide covers deploying the analytics server to various platforms.

---

## Prerequisites

- Node.js 14+ installed locally
- GitHub token (for API queries)
- npm or yarn installed
- `package.json` with required scripts

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Required
PORT=3001                          # Server port (default: 3001)
GITHUB_TOKEN=your_github_token    # GitHub API access
NODE_ENV=production               # Environment mode

# Optional
ANALYTICS_DIR=analytics-data      # Where to store events (default: ../analytics-data)
```

---

## Quick Start (Local Development)

Test the analytics system locally before deploying:

```bash
# 1. Install dependencies
npm install

# 2. Start the analytics server
node scripts/analytics-server.js

# Server output:
# ✅ Server running on http://localhost:3001
# 📁 Analytics stored in: /path/to/analytics-data

# 3. In another terminal, generate a dashboard
node scripts/dashboard-generator.js

# Output:
# ✅ HTML dashboard created: .../analytics-dashboards/index.html
# ✅ Markdown report created: .../analytics-dashboards/ANALYTICS_REPORT.md

# 4. Access dashboard
# Open: http://localhost:3001/analytics/SulagnaSasmal-github-profile
```

---

## Deployment Option 1: Vercel (Recommended)

**Advantages:** Free tier, auto-scaling, serverless, easy GitHub integration

### Step 1: Prepare for Vercel

Vercel runs Node.js backends differently. Create `api/analytics.js`:

```bash
# This is already configured in your workflow
# If deploying manually, ensure the API handler is set up
```

### Step 2: Deploy via Vercel Dashboard

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (interactive)
vercel --prod

# You'll be prompted:
# - Link to GitHub repo? → yes
# - Which scope? → Your GitHub username
# - Project name? → github-profile-analytics
# - Framework? → Other
# - Output directory? → ./
```

### Step 3: Configure Environment Variables

In Vercel dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add:
   ```
   GITHUB_TOKEN = your_github_token
   NODE_ENV = production
   ```

### Step 4: Access Your Deployment

```
Your analytics server runs at:
https://your-vercel-project.vercel.app

Endpoints:
- POST /track — Send events
- GET /analytics/:projectId — Get analytics
- GET /health — Health check
```

### Vercel Limitations

- Max request body: 6 MB
- Max response: 512 MB
- Serverless functions: 60s timeout
- Storage: Not persistent (events stored in project repo only)

**Solution:** For persistent storage, use GitHub to store analytics files:
- Events stored in `analytics-data/` folder
- Auto-committed to GitHub via CI/CD workflow
- Retrieve via GitHub API or raw.githubusercontent.com

---

## Deployment Option 2: Heroku

**Advantages:** Free tier available, simple deployment, persistent file storage

### Step 1: Create Heroku Account & Install CLI

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login
```

### Step 2: Prepare Repository

Create `Procfile` in root:

```
web: node scripts/analytics-server.js
```

Create `.slugignore` (files to exclude):

```
node_modules
.git
metrics/
docs/
assets/
.github/
```

### Step 3: Deploy

```bash
# Create Heroku app
heroku create sulagna-analytics

# Set environment variables
heroku config:set GITHUB_TOKEN=your_github_token
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Step 4: Verify Deployment

```bash
# Check app is running
heroku open

# Test health endpoint
curl https://sulagna-analytics.herokuapp.com/health

# Should return: {"status":"ok","timestamp":1234567890}
```

### Heroku File Storage

By default, files written to Heroku's dyno are not persistent. To persist analytics:

```bash
# Option A: Store in GitHub (recommended)
# Updates CI/CD to auto-commit analytics-data/ folder

# Option B: Use Heroku Postgres
# Add PostgreSQL add-on (paid)
heroku addons:create heroku-postgresql:hobby-dev
```

---

## Deployment Option 3: AWS Lambda + API Gateway

**Advantages:** Auto-scaling, pay-per-use, 1M free requests/month

### Setup

```bash
# Install serverless framework
npm install -g serverless

# Configure AWS credentials
aws configure

# Deploy
serverless deploy

# Output: Your API endpoint URL
```

### Configuration

Edit `serverless.yml`:

```yaml
service: github-profile-analytics

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  environment:
    GITHUB_TOKEN: ${env:GITHUB_TOKEN}

functions:
  api:
    handler: scripts/analytics-server.handler
    events:
      - http:
          path: /{proxy+}
          method: ANY
          cors: true
```

### Limitations

- Cold start: 1-3 seconds first request
- 15-minute timeout for batch operations
- File storage non-persistent (use S3 or RDS)

---

## Deployment Option 4: Docker (Self-Hosted)

**Advantages:** Full control, predictable environment, easy to scale

### Create `Dockerfile`

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy scripts
COPY scripts ./scripts

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start server
CMD ["node", "scripts/analytics-server.js"]
```

### Create `docker-compose.yml`

```yaml
version: '3.8'

services:
  analytics:
    build: .
    ports:
      - "3001:3001"
    environment:
      - GITHUB_TOKEN=${GITHUB_TOKEN}
      - NODE_ENV=production
    volumes:
      - ./analytics-data:/app/analytics-data
    restart: always
```

### Build & Run

```bash
# Build image
docker build -t github-analytics .

# Run container
docker run -p 3001:3001 \
  -e GITHUB_TOKEN=your_token \
  -v $(pwd)/analytics-data:/app/analytics-data \
  github-analytics

# Or use docker-compose
docker-compose up -d
```

---

## Embedding Tracking on Your Profile

Once analytics server is deployed, embed the tracking script:

### Option A: Auto-Initialize

Add to your profile README:

```html
<script src="https://your-analytics-server.com/github-analytics-tracker.js?auto=true"></script>
```

### Option B: Manual Initialization

```html
<script src="https://your-analytics-server.com/github-analytics-tracker.js"></script>
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

### Update Server URL

After deployment, update `scripts/github-analytics-tracker.js` line 22:

```javascript
serverUrl: config.serverUrl || 'https://your-deployed-server.com'
```

---

## Testing Your Deployment

### 1. Health Check

```bash
curl https://your-deployed-server.com/health

# Should return:
# {"status":"ok","timestamp":1709548800000}
```

### 2. Send Test Event

```bash
curl -X POST https://your-deployed-server.com/track \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "SulagnaSasmal-github-profile",
    "event": {
      "type": "pageview",
      "url": "https://github.com/SulagnaSasmal",
      "timestamp": '$(date +%s)'000
    }
  }'

# Should return:
# {"success":true,"event":"pageview","stored":true}
```

### 3. Retrieve Analytics

```bash
curl https://your-deployed-server.com/analytics/SulagnaSasmal-github-profile

# Should return:
# {
#   "projectId": "SulagnaSasmal-github-profile",
#   "pageViews": 1,
#   "uniqueVisitors": 1,
#   "totalClicks": 0,
#   ...
# }
```

---

## Monitoring & Logging

### Real-Time Logs

```bash
# Vercel
vercel logs

# Heroku
heroku logs --tail

# Docker
docker logs -f analytics-container
```

### Error Tracking

Events failing to send are stored locally in browser's `localStorage`. Check:

```javascript
// In browser console
JSON.parse(localStorage.getItem('gh_analytics_events'))
```

### Metrics Dashboard

Generate and view dashboard:

```bash
node scripts/dashboard-generator.js

# Open: analytics-dashboards/index.html
```

---

## Common Issues

### Issue 1: CORS Errors

**Problem:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:** Ensure CORS headers are set in `analytics-server.js`:

```javascript
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
```

### Issue 2: Events Not Being Stored

**Problem:** Requests return 200 but no files created

**Solution:**
```bash
# Check directory permissions
ls -la analytics-data/

# Ensure write permissions
chmod -R 755 analytics-data/

# Check server logs for errors
# (Vercel: vercel logs, Heroku: heroku logs --tail)
```

### Issue 3: Analytics Data Missing After Restart

**Problem:** Data lost on Vercel/Lambda redeploy

**Solution:** Store data in git repository:

```bash
# Add to CI/CD workflow to auto-commit analytics
git add analytics-data/
git commit -m "📊 Update analytics data"
git push origin main
```

### Issue 4: Rate Limiting

**Problem:** `429 Too Many Requests` errors

**Solution:** Implement caching and batching:

```javascript
// Batch events every 5 minutes instead of each request
setInterval(() => {
  analytics.syncQueuedEvents();
}, 5 * 60 * 1000);
```

---

## Production Checklist

- [ ] Environment variables configured (.env or platform variables)
- [ ] Health endpoint responding (`/health` returns 200)
- [ ] Test event successfully tracked via `/track`
- [ ] Analytics retrieval working (`/analytics/:projectId`)
- [ ] CORS properly configured for your domain
- [ ] Data storage location configured (local, git, database)
- [ ] Monitoring/logging set up (email alerts for errors)
- [ ] Daily backup of analytics data (if using file storage)
- [ ] Tracking script embedded on profile README
- [ ] Dashboard first generated successfully

---

## Next Steps

1. **Choose deployment platform** (Vercel recommended for ease)
2. **Deploy analytics server**
3. **Configure environment variables**
4. **Embed tracking script on profile**
5. **Generate and share dashboard**
6. **Monitor analytics for first week**

📖 For complete implementation details, see [docs/ANALYTICS_GUIDE.md](ANALYTICS_GUIDE.md)
