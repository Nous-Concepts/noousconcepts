/**
 * Component loader module for NOUS CONCEPTS website.
 * Loads reusable HTML fragments (header, nav, footer) into page placeholders via fetch.
 */

import { initHeader } from './header.js';
import { initNavigation } from './nav.js';
import { initScrollMoreButtons } from './scroll-more.js';

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
 * Loads header, nav, and footer components, then initializes interactivity.
 */
async function initPage() {
  await loadComponent('#header-placeholder', '../components/header.html');
  await loadComponent('#nav-placeholder', '../components/nav.html');
  await loadComponent('#footer-placeholder', '../components/footer.html');

  initHeader();
  initNavigation();
  initScrollMoreButtons();
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initPage);

export { loadComponent, initPage };
