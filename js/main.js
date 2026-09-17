/* ==========================================================================
   AFRICAN STORY VILLAGE — MAIN SITE JS
   --------------------------------------------------------------------------
   Handles: header/footer/newsletter includes, mobile navigation, desktop
   dropdowns, dark/light theme toggle, dynamic footer year, active nav
   state, generic accordion behaviour, and toast notifications.

   IMPORTANT: this site uses fetch() to load components/header.html,
   components/footer.html and components/newsletter.html. fetch() cannot
   read local files over the file:// protocol in most browsers, so this
   site must be served by a local server during development, e.g.:
     python3 -m http.server 5500
   or
     npx serve
   See README.md for full instructions.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------- */
  /* Component includes                                                */
  /* ---------------------------------------------------------------- */
  async function loadIncludes() {
    const nodes = document.querySelectorAll('[data-include]');
    const jobs = Array.from(nodes).map(async (node) => {
      const name = node.getAttribute('data-include');
      try {
        const res = await fetch(`components/${name}.html`);
        if (!res.ok) throw new Error(`Failed to load ${name}.html`);
        node.outerHTML = await res.text();
      } catch (err) {
        console.error('[ASV] Component include failed — is this running on a local server?', err);
        node.innerHTML = `<p style="padding:1rem;color:#a33;">Could not load "${name}" component. Serve this site with a local server (see README.md) instead of opening the file directly.</p>`;
      }
    });
    await Promise.all(jobs);
  }

  /* ---------------------------------------------------------------- */
  /* Mobile navigation                                                  */
  /* ---------------------------------------------------------------- */
  function initMobileNav() {
    const toggle = document.querySelector('.menu-toggle');
    const drawer = document.getElementById('mobile-nav');
    const overlay = document.querySelector('[data-nav-overlay]');
    const closeBtn = document.querySelector('[data-close-menu]');
    if (!toggle || !drawer) return;

    function open() {
      drawer.classList.add('open');
      overlay.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
    toggle.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (overlay) overlay.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    drawer.querySelectorAll('[data-mobile-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-mobile-toggle');
        const sub = document.getElementById(id);
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        sub.classList.toggle('open', !expanded);
      });
    });
  }

  /* ---------------------------------------------------------------- */
  /* Desktop dropdowns                                                  */
  /* ---------------------------------------------------------------- */
  function initDropdowns() {
    const triggers = document.querySelectorAll('.has-dropdown');
    function closeAll() {
      triggers.forEach((t) => {
        t.setAttribute('aria-expanded', 'false');
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.classList.remove('open');
      });
    }
    triggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const panel = document.getElementById(trigger.getAttribute('aria-controls'));
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
        closeAll();
        if (!isOpen && panel) {
          panel.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
    document.addEventListener('click', closeAll);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAll();
    });
  }

  /* ---------------------------------------------------------------- */
  /* Active nav state                                                   */
  /* ---------------------------------------------------------------- */
  function markActiveNav() {
    const page = document.body.dataset.page;
    if (!page) return;
    document.querySelectorAll(`[data-page="${page}"]`).forEach((el) => {
      el.setAttribute('aria-current', 'page');
    });
  }

  /* ---------------------------------------------------------------- */
  /* Theme toggle (system-aware + manual override via localStorage)    */
  /* ---------------------------------------------------------------- */
  function initTheme() {
    const stored = safeGet('asv-theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    }
    document.querySelectorAll('.theme-toggle').forEach((btn) => {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const effectiveCurrent = current || (prefersDark ? 'dark' : 'light');
        const next = effectiveCurrent === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        safeSet('asv-theme', next);
      });
    });
  }

  function safeGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, val) {
    try { window.localStorage.setItem(key, val); } catch (e) { /* ignore */ }
  }

  /* ---------------------------------------------------------------- */
  /* Footer year                                                        */
  /* ---------------------------------------------------------------- */
  function setYear() {
    document.querySelectorAll('[data-year]').forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------------------------------------------------------------- */
  /* Generic accordion (FAQ etc.)                                       */
  /* ---------------------------------------------------------------- */
  function initAccordions() {
    document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const panel = trigger.nextElementSibling;
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', String(!expanded));
        if (!expanded) {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        } else {
          panel.style.maxHeight = 0;
        }
      });
    });
  }

  /* ---------------------------------------------------------------- */
  /* Toast helper (used by forms.js / audio.js)                        */
  /* ---------------------------------------------------------------- */
  window.ASVToast = function (message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), 3200);
  };

  /* ---------------------------------------------------------------- */
  /* Boot                                                               */
  /* ---------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', async () => {
    await loadIncludes();
    initMobileNav();
    initDropdowns();
    markActiveNav();
    initTheme();
    setYear();
    initAccordions();
    /* Let page-level scripts (stories.js, audio.js, search.js) render their
       dynamic cards before carousels measure card widths. */
    document.dispatchEvent(new CustomEvent('asv:includesReady'));
    ASVCarousel.init();
  });
})();
