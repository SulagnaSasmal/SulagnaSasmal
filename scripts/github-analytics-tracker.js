/**
 * GitHub Profile Analytics Tracker
 * Comprehensive tracking of visitor behavior, clicks, and interactions
 *
 * This script is embedded in README or profile to track:
 * - Page views and visitor counts
 * - Click tracking on all links
 * - User behavior patterns
 * - Time on page
 * - Device and browser information
 * - Referrer sources
 * - Geographic data (if available)
 * - Heatmap data
 * - Scroll depth
 * - Session tracking
 */

class GitHubProfileAnalytics {
  constructor(config = {}) {
    this.config = {
      projectId: config.projectId || 'github-profile',
      serverUrl: config.serverUrl || 'https://analytics.example.com',
      enableTracking: config.enableTracking !== false,
      trackClicks: config.trackClicks !== false,
      trackScroll: config.trackScroll !== false,
      trackTime: config.trackTime !== false,
      ...config,
    };

    this.sessionId = this.generateSessionId();
    this.pageStart = Date.now();
    this.lastActivityTime = Date.now();
    this.clickCount = 0;
    this.scrollDepth = 0;
    this.interactions = [];

    this.init();
  }

  /**
   * Generate unique session ID
   */
  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Initialize tracking
   */
  init() {
    if (!this.config.enableTracking) return;

    // Track page view
    this.trackPageView();

    // Setup event listeners
    if (this.config.trackClicks) this.setupClickTracking();
    if (this.config.trackScroll) this.setupScrollTracking();
    if (this.config.trackTime) this.setupActivityTracking();

    // Track visibility changes
    this.setupVisibilityTracking();

    // Send data periodically
    this.startPeriodicSync();
  }

  /**
   * Track page view event
   */
  trackPageView() {
    const event = {
      type: 'pageview',
      url: window.location.href,
      title: document.title,
      timestamp: Date.now(),
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      deviceType: this.getDeviceType(),
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      sessionId: this.sessionId,
    };

    this.track(event);
    console.log('📊 Page view tracked:', event);
  }

  /**
   * Setup click tracking
   */
  setupClickTracking() {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a, button, [role="button"]');
      if (!target) return;

      this.trackClick(target, e);
    });
  }

  /**
   * Track individual clicks
   */
  trackClick(element, event) {
    this.clickCount++;
    this.lastActivityTime = Date.now();

    const event_data = {
      type: 'click',
      element_type: element.tagName.toLowerCase(),
      element_text: element.textContent?.substring(0, 100),
      element_href: element.href || element.getAttribute('data-action'),
      element_id: element.id,
      element_class: element.className,
      x: event.clientX,
      y: event.clientY,
      timestamp: Date.now(),
      time_on_page: Date.now() - this.pageStart,
      scroll_depth: this.scrollDepth,
      sessionId: this.sessionId,
    };

    this.track(event_data);
    this.interactions.push(event_data);

    console.log('🖱️ Click tracked:', {
      text: element.textContent?.substring(0, 50),
      href: element.href,
    });
  }

  /**
   * Setup scroll tracking
   */
  setupScrollTracking() {
    let trackingTimeout;

    window.addEventListener('scroll', () => {
      clearTimeout(trackingTimeout);

      trackingTimeout = setTimeout(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (scrollPercent > this.scrollDepth) {
          this.scrollDepth = scrollPercent;

          const event = {
            type: 'scroll',
            scroll_percent: Math.round(scrollPercent),
            scroll_pixels: scrollTop,
            timestamp: Date.now(),
            sessionId: this.sessionId,
          };

          this.track(event);
          console.log(`📜 Scroll tracked: ${Math.round(scrollPercent)}%`);
        }
      }, 500);
    });
  }

  /**
   * Setup activity tracking
   */
  setupActivityTracking() {
    // Track time on page every 30 seconds
    setInterval(() => {
      const timeOnPage = Date.now() - this.pageStart;
      const isVisible = !document.hidden;

      if (isVisible) {
        const event = {
          type: 'activity',
          time_on_page: timeOnPage,
          click_count: this.clickCount,
          scroll_depth: this.scrollDepth,
          interaction_count: this.interactions.length,
          timestamp: Date.now(),
          sessionId: this.sessionId,
        };

        this.track(event);
      }
    }, 30000);
  }

  /**
   * Track visibility changes
   */
  setupVisibilityTracking() {
    document.addEventListener('visibilitychange', () => {
      const event = {
        type: 'visibility',
        is_visible: !document.hidden,
        time_on_page: Date.now() - this.pageStart,
        timestamp: Date.now(),
        sessionId: this.sessionId,
      };

      this.track(event);
      console.log(document.hidden ? '👁️ Page hidden' : '👀 Page visible');
    });
  }

  /**
   * Get device type
   */
  getDeviceType() {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) return 'mobile';
    if (/tablet/i.test(ua)) return 'tablet';
    return 'desktop';
  }

  /**
   * Track generic event
   */
  track(eventData) {
    if (!this.config.enableTracking) return;

    // Add to local queue
    this.storeEventLocally(eventData);

    // Send to server
    this.sendToServer(eventData);
  }

  /**
   * Store event locally
   */
  storeEventLocally(eventData) {
    try {
      const existing = JSON.parse(localStorage.getItem('gh_analytics_events') || '[]');
      existing.push(eventData);

      // Keep only last 100 events
      if (existing.length > 100) {
        existing.shift();
      }

      localStorage.setItem('gh_analytics_events', JSON.stringify(existing));
    } catch (error) {
      console.warn('Could not store event locally:', error);
    }
  }

  /**
   * Send event to analytics server
   */
  sendToServer(eventData) {
    const payload = {
      projectId: this.config.projectId,
      event: eventData,
      timestamp: Date.now(),
    };

    // Use beacon API for reliability
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        `${this.config.serverUrl}/track`,
        JSON.stringify(payload)
      );
    } else {
      // Fallback to fetch
      fetch(`${this.config.serverUrl}/track`, {
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(err => console.warn('Analytics send failed:', err));
    }
  }

  /**
   * Periodic sync of queued events
   */
  startPeriodicSync() {
    setInterval(() => {
      this.syncQueuedEvents();
    }, 60000); // Every minute
  }

  /**
   * Sync queued events
   */
  syncQueuedEvents() {
    try {
      const events = JSON.parse(localStorage.getItem('gh_analytics_events') || '[]');

      if (events.length === 0) return;

      const payload = {
        projectId: this.config.projectId,
        events: events,
        timestamp: Date.now(),
      };

      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          `${this.config.serverUrl}/batch-track`,
          JSON.stringify(payload)
        );
      }

      // Clear after sending
      localStorage.removeItem('gh_analytics_events');
      console.log(`📤 Synced ${events.length} analytics events`);
    } catch (error) {
      console.warn('Sync failed:', error);
    }
  }

  /**
   * Get session summary
   */
  getSessionSummary() {
    return {
      sessionId: this.sessionId,
      duration: Date.now() - this.pageStart,
      clicks: this.clickCount,
      scrollDepth: Math.round(this.scrollDepth),
      interactions: this.interactions.length,
      lastActivity: Date.now() - this.lastActivityTime,
    };
  }

  /**
   * Send session summary on page unload
   */
  registerExit() {
    window.addEventListener('beforeunload', () => {
      const summary = this.getSessionSummary();
      const event = {
        type: 'session_end',
        ...summary,
        timestamp: Date.now(),
      };

      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          `${this.config.serverUrl}/track`,
          JSON.stringify(event)
        );
      }
    });
  }
}

// Initialize tracking
if (typeof window !== 'undefined') {
  window.GitHubProfileAnalytics = GitHubProfileAnalytics;
}

// Auto-initialize if script src contains 'auto'
if (document.currentScript?.src?.includes('auto=true')) {
  window.analytics = new GitHubProfileAnalytics({
    projectId: 'SulagnaSasmal-github-profile',
    enableTracking: true,
    trackClicks: true,
    trackScroll: true,
    trackTime: true,
  });
  window.analytics.registerExit();
}

export default GitHubProfileAnalytics;
