/**
 * Header module for NOUS CONCEPTS website.
 * Handles hamburger menu button toggle and dispatches menu-toggle events.
 * Independent from nav.js — communication is via CustomEvent on document.
 */

/**
 * Initializes the header by registering a click event listener
 * on the hamburger menu button.
 */
function initHeader() {
  const menuBtn = document.querySelector('.site-header__menu-btn');
  if (!menuBtn) return;

  menuBtn.addEventListener('click', toggleMenu);
}

/**
 * Toggles the menu state:
 * 1. Reads current aria-expanded on .site-header__menu-btn
 * 2. Toggles aria-expanded between "true" and "false"
 * 3. Updates aria-label accordingly ("Abrir menú" / "Cerrar menú")
 * 4. Dispatches CustomEvent('menu-toggle', { detail: { state } }) on document
 */
function toggleMenu() {
  const menuBtn = document.querySelector('.site-header__menu-btn');
  if (!menuBtn) return;

  const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
  const newState = isExpanded ? 'close' : 'open';

  menuBtn.setAttribute('aria-expanded', String(!isExpanded));
  menuBtn.setAttribute('aria-label', newState === 'open' ? 'Cerrar menú' : 'Abrir menú');

  document.dispatchEvent(new CustomEvent('menu-toggle', {
    detail: { state: newState }
  }));
}

/**
 * Returns the current menu state based on the aria-expanded attribute
 * of the hamburger menu button.
 * @returns {'open' | 'close' | null} Current state, or null if button not found
 */
function getMenuState() {
  const menuBtn = document.querySelector('.site-header__menu-btn');
  if (!menuBtn) return null;

  return menuBtn.getAttribute('aria-expanded') === 'true' ? 'open' : 'close';
}

export { initHeader, toggleMenu, getMenuState };
