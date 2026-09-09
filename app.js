/**
 * Knitting Chart Generator - Application Entry Point / Compatibility Bridge
 * Includes Dark/Light Theme System & Umami Analytics Integration
 */

let currentTheme = 'dark';

/**
 * Safely tracks custom events with Umami Analytics
 */
function trackEvent(eventName, eventData = {}) {
  if (window.umami && typeof window.umami.track === 'function') {
    try {
      window.umami.track(eventName, eventData);
    } catch (err) {}
  }
}

/**
 * Updates UI buttons icon and attributes based on active theme
 */
function updateThemeButtons(theme) {
  const buttons = [
    document.getElementById('theme-toggle-btn'),
    document.getElementById('theme-toggle-btn-mobile')
  ];

  buttons.forEach(btn => {
    if (btn) {
      if (theme === 'light') {
        btn.textContent = '🌙';
        btn.setAttribute('title', 'Switch to Dark Theme');
        btn.setAttribute('aria-label', 'Switch to Dark Theme');
      } else {
        btn.textContent = '☀️';
        btn.setAttribute('title', 'Switch to Light Theme');
        btn.setAttribute('aria-label', 'Switch to Light Theme');
      }
    }
  });
}

/**
 * Apply theme to DOM, storage, and toggle button icons
 */
function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  if (document.body) {
    document.body.setAttribute('data-theme', theme);
  }

  try {
    localStorage.setItem('theme', theme);
  } catch (e) {
    try {
      sessionStorage.setItem('theme', theme);
    } catch (e2) {}
  }

  updateThemeButtons(theme);
}

/**
 * Toggle theme between dark and light
 */
function toggleTheme() {
  const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
  trackEvent('toggle-theme', { theme: targetTheme });
  applyTheme(targetTheme);

  // If inside an iframe, broadcast to parent window
  try {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'theme-change', theme: targetTheme }, '*');
    }
  } catch (e) {}
}

/**
 * Initialize saved or system preference theme
 */
function initTheme() {
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem('theme') || sessionStorage.getItem('theme');
  } catch (e) {}

  if (savedTheme === 'light' || savedTheme === 'dark') {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    applyTheme('light');
  } else {
    applyTheme('dark');
  }
}

// Bind globally immediately so onclick attributes work
window.applyTheme = applyTheme;
window.toggleTheme = toggleTheme;
window.trackEvent = trackEvent;
window.initTheme = initTheme;

// Attach click listeners to DOM elements
function setupThemeListeners() {
  applyTheme(currentTheme);

  const desktopBtn = document.getElementById('theme-toggle-btn');
  if (desktopBtn) {
    desktopBtn.onclick = toggleTheme;
  }

  const mobileBtn = document.getElementById('theme-toggle-btn-mobile');
  if (mobileBtn) {
    mobileBtn.onclick = toggleTheme;
  }
}

// Initialize theme state
initTheme();

// Attach listeners on ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupThemeListeners);
} else {
  setupThemeListeners();
}
window.addEventListener('load', setupThemeListeners);

// Listen for storage changes from other tabs or parent window
window.addEventListener('storage', (e) => {
  if (e.key === 'theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
    applyTheme(e.newValue);
  }
});

// Listen for direct postMessage theme synchronization from parent window / iframe
window.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'theme-change' && (e.data.theme === 'light' || e.data.theme === 'dark')) {
    applyTheme(e.data.theme);
  }
});
