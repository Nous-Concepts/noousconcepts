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
}

// Export functions for testing and external use
export { initNavigation, toggleMobileMenu, setActivePage, getPageNameFromPath };
