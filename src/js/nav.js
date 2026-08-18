/**
 * Navigation module for NOUS CONCEPTS website.
 * Handles mobile menu toggle, active page indication, and ARIA attributes.
 */

/**
 * Extracts the page name from a given path.
 * @param {string} path - The URL path (e.g., "/pages/home.html" or "home.html")
 * @returns {string} The page name (e.g., "home", "contenidos", "servicios")
 */
function getPageNameFromPath(path) {
  if (!path) return 'home';

  // Remove query string and hash
  const cleanPath = path.split('?')[0].split('#')[0];

  // Get the filename from the path
  const filename = cleanPath.split('/').pop() || '';

  // Remove the .html extension
  const pageName = filename.replace('.html', '');

  // Default to 'home' if empty or index
  if (!pageName || pageName === 'index') {
    return 'home';
  }

  return pageName;
}

/**
 * Sets the active page in the navigation by adding the `nav-link--active` class
 * to the corresponding link.
 * @param {string} pageName - The page identifier (e.g., "home", "contenidos", "servicios")
 */
function setActivePage(pageName) {
  const navLinks = document.querySelectorAll('.nav-links a[data-page]');

  navLinks.forEach(function (link) {
    link.classList.remove('nav-link--active');

    if (link.getAttribute('data-page') === pageName) {
      link.classList.add('nav-link--active');
    }
  });
}

/**
 * Toggles the mobile menu visibility and updates ARIA attributes.
 */
function toggleMobileMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!navToggle || !navMenu) return;

  const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';

  navToggle.setAttribute('aria-expanded', String(!isExpanded));
  navToggle.setAttribute('aria-label', isExpanded ? 'Abrir menú' : 'Cerrar menú');
  navMenu.classList.toggle('is-open');
}

/**
 * Locks or unlocks scrolling on the document body. Used to prevent the page
 * behind the fullscreen mobile overlay from scrolling while the menu is open.
 * @param {boolean} locked - When true, sets body overflow to 'hidden'; otherwise clears it.
 */
function setBodyScrollLock(locked) {
  document.body.style.overflow = locked ? 'hidden' : '';
}

/**
 * Closes the mobile menu by dispatching a 'menu-toggle' CustomEvent with
 * state 'close'. This reuses the existing event-driven close path
 * (listenMenuToggleEvent), preserving focus management, ARIA toggling, and
 * scroll unlock. It also keeps the header hamburger button's ARIA state in
 * sync so a subsequent hamburger click reopens the menu correctly.
 */
function closeMobileMenu() {
  const navMenu = document.getElementById('nav-menu');

  // Nothing to do if the menu is not open.
  if (!navMenu || !navMenu.classList.contains('is-open')) return;

  document.dispatchEvent(new CustomEvent('menu-toggle', { detail: { state: 'close' } }));

  // Keep the header hamburger button state consistent with the closed menu.
  const headerMenuBtn = document.querySelector('.site-header__menu-btn');
  if (headerMenuBtn) {
    headerMenuBtn.setAttribute('aria-expanded', 'false');
    headerMenuBtn.setAttribute('aria-label', 'Abrir menú');
  }
}

/**
 * Listens for 'menu-toggle' CustomEvent on document and toggles
 * the nav menu visibility and ARIA attributes accordingly.
 * When the menu closes, manages focus back to the header menu button
 * if focus was inside the nav menu. Also locks/unlocks body scroll so the
 * page behind the fullscreen overlay does not scroll while the menu is open.
 */
function listenMenuToggleEvent() {
  document.addEventListener('menu-toggle', function (event) {
    const state = event.detail && event.detail.state;
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.querySelector('.nav-toggle');

    if (!navMenu || !navToggle) return;

    if (state === 'open') {
      navMenu.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
      setBodyScrollLock(true);
    } else if (state === 'close') {
      // Focus management: move focus to header menu button if active element is inside nav-menu
      if (document.activeElement && navMenu.contains(document.activeElement)) {
        const headerMenuBtn = document.querySelector('.site-header__menu-btn');
        if (headerMenuBtn) {
          headerMenuBtn.focus();
        }
      }

      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      setBodyScrollLock(false);
    }
  });
}

/**
 * Registers the mobile overlay controls:
 *  - Close (X) button click closes the overlay.
 *  - Escape key closes the overlay while it is open.
 *  - Clicking any nav link inside the overlay auto-closes it.
 * All paths funnel through closeMobileMenu(), which dispatches the existing
 * 'menu-toggle' close event so focus management, ARIA state, and scroll lock
 * stay consistent with the established architecture.
 */
function initMobileMenuControls() {
  const navMenu = document.getElementById('nav-menu');

  // Close (X) button inside the overlay.
  const closeBtn = document.querySelector('.nav-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMobileMenu);
  }

  // Escape key closes the overlay when it is open.
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      const menu = document.getElementById('nav-menu');
      if (menu && menu.classList.contains('is-open')) {
        closeMobileMenu();
      }
    }
  });

  // Auto-close the overlay when a navigation link is activated.
  if (navMenu) {
    const links = navMenu.querySelectorAll('a');
    links.forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }
}

/**
 * Registers accordion submenu controls for the mobile fullscreen menu:
 *  - Each `.nav-accordion-toggle` click expands/collapses its own
 *    `.nav-accordion-item` parent by toggling the `is-expanded` class and
 *    updating the `aria-expanded` attribute ("true"/"false").
 *  - Accordions operate independently: toggling one does not collapse others.
 *  - Clicking any link inside a `.nav-submenu` auto-closes the overlay via
 *    closeMobileMenu(), keeping focus management, ARIA state, and scroll lock
 *    consistent with the established architecture.
 */
function initAccordionMenus() {
  const toggles = document.querySelectorAll('.nav-accordion-toggle');

  toggles.forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      const accordionItem = toggle.closest('.nav-accordion-item');
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

      toggle.setAttribute('aria-expanded', String(!isExpanded));

      if (accordionItem) {
        accordionItem.classList.toggle('is-expanded');
      }
    });
  });

  // Auto-close the overlay when a submenu link is activated.
  const submenuLinks = document.querySelectorAll('.nav-submenu a');
  submenuLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });
}

/**
 * Initializes navigation: sets up mobile menu toggle event and marks the active page.
 */
function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');

  if (navToggle) {
    navToggle.addEventListener('click', toggleMobileMenu);
  }

  // Determine and set the active page from the current URL
  const currentPath = window.location.pathname;
  const pageName = getPageNameFromPath(currentPath);
  setActivePage(pageName);

  // Listen for menu-toggle events from the Header component
  listenMenuToggleEvent();

  // Register close button, Escape key, and link auto-close controls
  initMobileMenuControls();

  // Register accordion submenu expand/collapse controls
  initAccordionMenus();
}

// Export functions for testing and external use
export {
  initNavigation,
  toggleMobileMenu,
  setActivePage,
  getPageNameFromPath,
  listenMenuToggleEvent,
  initMobileMenuControls,
  initAccordionMenus,
  closeMobileMenu,
  setBodyScrollLock,
};
