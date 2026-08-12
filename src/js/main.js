/**
 * Component loader module for NOUS CONCEPTS website.
 * Loads reusable HTML fragments (nav, footer) into page placeholders via fetch.
 */

import { initNavigation } from './nav.js';

/**
 * Loads an HTML fragment from componentPath and inserts it into the element
 * matching the given selector.
 * @param {string} selector - CSS selector for the placeholder element
 * @param {string} componentPath - Relative path to the HTML fragment file
 */
async function loadComponent(selector, componentPath) {
  try {
    const element = document.querySelector(selector);
    if (!element) {
      console.error(`loadComponent: Element not found for selector "${selector}"`);
      return;
    }

    const response = await fetch(componentPath);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${componentPath}: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    element.innerHTML = html;
  } catch (error) {
    console.error(`loadComponent: Error loading "${componentPath}" into "${selector}":`, error);
  }
}

/**
 * Orchestrates the loading of reusable components and initializes page functionality.
 * Loads nav and footer components, then initializes navigation interactivity.
 */
async function initPage() {
  await loadComponent('#nav-placeholder', '../components/nav.html');
  await loadComponent('#footer-placeholder', '../components/footer.html');

  // Initialize navigation after the nav HTML has been inserted into the DOM
  initNavigation();
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initPage);

export { loadComponent, initPage };
