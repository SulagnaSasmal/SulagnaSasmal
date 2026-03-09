/* hub-scripts.js — Documentation Center Platform
   Handles: theme init, theme toggle, copy buttons, mobile nav, active links */

// === THEME INIT (also inlined in <head> to prevent FOUC) ===========
(function () {
  const saved = localStorage.getItem('hub-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

// === DOM-READY SETUP ===============================================
document.addEventListener('DOMContentLoaded', function () {

  // --- Theme toggle ------------------------------------------------
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    updateThemeIcon(themeBtn);
    themeBtn.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('hub-theme', next);
      updateThemeIcon(themeBtn);
    });
  }

  function updateThemeIcon(btn) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.innerHTML = isDark
      ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
      : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  // --- Mobile sidebar toggle ---------------------------------------
  const hamburger = document.getElementById('hamburger');
  const siteNav   = document.getElementById('site-nav');
  if (hamburger && siteNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = siteNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    // Close sidebar when clicking outside
    document.addEventListener('click', function (e) {
      if (siteNav.classList.contains('open') &&
          !siteNav.contains(e.target) &&
          !hamburger.contains(e.target)) {
        siteNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Active nav link detection -----------------------------------
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href) return;
    // Resolve href relative to current page location
    const resolved = new URL(href, window.location.href).pathname.replace(/\/$/, '');
    if (resolved === path || (path === '/' && resolved.endsWith('/portfolio'))) {
      link.classList.add('active');
    }
  });

  // --- Copy-to-clipboard buttons ------------------------------------
  document.querySelectorAll('pre').forEach(function (pre) {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    pre.appendChild(btn);
    btn.addEventListener('click', function () {
      const code = pre.querySelector('code');
      const text = code ? code.innerText : pre.innerText.replace(/^Copy$/m, '').trim();
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      }).catch(function () {
        btn.textContent = 'Failed';
        setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
      });
    });
  });

});
