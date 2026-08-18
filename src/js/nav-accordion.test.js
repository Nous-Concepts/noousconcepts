import { describe, it, expect, beforeEach } from 'vitest';
import fc from 'fast-check';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { initNavigation } from './nav.js';

/**
 * Property 1: Bug Condition — Accordion Toggle Missing for ENTRETENIMIENTO and EDUCACIÓN.
 *
 * This is the bug condition exploration test. On the UNFIXED code it MUST FAIL:
 * ENTRETENIMIENTO and EDUCACIÓN are rendered as flat <a> links with no
 * .nav-accordion-toggle button, no nested .nav-submenu <ul>, no
 * .nav-accordion-chevron indicator, and no aria-expanded attribute. Clicking
 * therefore never adds .is-expanded to a parent .nav-accordion-item.
 *
 * After the fix (accordion structure in nav.html + initAccordionMenus() in
 * nav.js wired through initNavigation()), this same test PASSES, confirming the
 * expected behavior: each accordion item has a toggle button with a chevron,
 * aria-expanded state, and a nested submenu with the correct sub-item count that
 * expands on click.
 *
 * The test loads the CURRENT contents of src/components/nav.html into the DOM,
 * scopes the property to mobile viewports (≤ 768px) and the two known accordion
 * targets, opens the menu (.is-open), and asserts the accordion structure and
 * toggle behavior.
 *
 * **Validates: Requirements 1.1, 1.2, 1.3, 1.4**
 */

const __dirname = dirname(fileURLToPath(import.meta.url));
const NAV_HTML = readFileSync(
  resolve(__dirname, '../components/nav.html'),
  'utf-8'
);

// Expected sub-item counts per accordion target (from design/requirements).
const EXPECTED_SUBITEM_COUNT = {
  ENTRETENIMIENTO: 5, // Neo Samanía Conexión, La Última Función, Pánico Disfórico, Colombia Mix, Carnaval Distópico
  EDUCACIÓN: 2, // El Combo, Naranja Digital
};

/**
 * Finds the .nav-accordion-toggle button whose visible label matches the given
 * accordion target text (e.g., "ENTRETENIMIENTO"). Returns null when no such
 * toggle exists (the bug condition on unfixed code).
 */
function findToggleByLabel(navMenu, target) {
  const toggles = navMenu.querySelectorAll('.nav-accordion-toggle');
  for (const toggle of toggles) {
    if (toggle.textContent.includes(target)) {
      return toggle;
    }
  }
  return null;
}

describe('nav-accordion: ENTRETENIMIENTO and EDUCACIÓN accordion toggle behavior', () => {
  beforeEach(() => {
    document.body.innerHTML = NAV_HTML;
  });

  it('for any accordion target and mobile viewport (320–768px), the item has a toggle button, chevron, aria-expanded, and a nested submenu that expands on click', () => {
    // **Validates: Requirements 1.1, 1.2, 1.3, 1.4**
    fc.assert(
      fc.property(
        fc.constantFrom('ENTRETENIMIENTO', 'EDUCACIÓN'),
        fc.integer({ min: 320, max: 768 }),
        (target, viewportWidth) => {
          // Reset DOM to the shipped nav.html for each generated case.
          document.body.innerHTML = NAV_HTML;

          // Simulate a mobile viewport width.
          window.innerWidth = viewportWidth;

          // Wire up navigation (after the fix this registers accordion toggles).
          initNavigation();

          const navMenu = document.getElementById('nav-menu');
          expect(navMenu).not.toBeNull();

          // Open the mobile menu (mirrors the .is-open toggle used by nav.js).
          navMenu.classList.add('is-open');
          expect(navMenu.classList.contains('is-open')).toBe(true);

          // Bug Condition 1.1/1.2: a .nav-accordion-toggle button exists for the target.
          const toggle = findToggleByLabel(navMenu, target);
          expect(toggle).not.toBeNull();
          expect(toggle.tagName).toBe('BUTTON');

          // The toggle lives inside a .nav-accordion-item <li>.
          const accordionItem = toggle.closest('.nav-accordion-item');
          expect(accordionItem).not.toBeNull();

          // Bug Condition 1.4: a nested .nav-submenu <ul> exists inside the item
          // with the correct number of sub-items.
          const submenu = accordionItem.querySelector('ul.nav-submenu');
          expect(submenu).not.toBeNull();
          const subItems = submenu.querySelectorAll('li');
          expect(subItems.length).toBe(EXPECTED_SUBITEM_COUNT[target]);

          // Bug Condition 1.3: a .nav-accordion-chevron span exists inside the toggle.
          const chevron = toggle.querySelector('.nav-accordion-chevron');
          expect(chevron).not.toBeNull();

          // aria-expanded is present and initially "false".
          expect(toggle.hasAttribute('aria-expanded')).toBe(true);
          expect(toggle.getAttribute('aria-expanded')).toBe('false');

          // Simulate a click on the toggle: parent gets .is-expanded and
          // aria-expanded flips to "true".
          toggle.click();
          expect(accordionItem.classList.contains('is-expanded')).toBe(true);
          expect(toggle.getAttribute('aria-expanded')).toBe('true');
        }
      )
    );
  });
});
