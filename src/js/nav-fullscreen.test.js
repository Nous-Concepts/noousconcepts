import { describe, it, expect, beforeEach } from 'vitest';
import fc from 'fast-check';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

/**
 * Property 1: Bug Condition / Expected Behavior —
 * Mobile Menu Fullscreen Overlay Structure.
 *
 * This is the bug condition exploration test. On the UNFIXED code it MUST FAIL
 * (only 3 links, no .nav-overlay-header, no .nav-close-btn). After the fix it
 * PASSES, confirming the expected behavior: 9 links, an overlay header with the
 * "NOUS CONCEPTS" logo, and a close (X) button.
 *
 * The test loads the CURRENT contents of src/components/nav.html into the DOM
 * (matching the conventions of the other nav tests, but sourcing the markup from
 * the real component so it validates the shipped structure), scopes the property
 * to mobile viewports (≤ 768px), opens the menu (adds .is-open to #nav-menu), and
 * asserts the fullscreen overlay structure.
 *
 * **Validates: Requirements 2.1, 2.2, 2.3, 2.4**
 */

const __dirname = dirname(fileURLToPath(import.meta.url));
const NAV_HTML = readFileSync(
  resolve(__dirname, '../components/nav.html'),
  'utf-8'
);

describe('nav-fullscreen: mobile menu fullscreen overlay structure', () => {
  beforeEach(() => {
    document.body.innerHTML = NAV_HTML;
  });

  it('for any mobile viewport (320–768px), an opened menu is a fullscreen overlay with 9 links, logo header, and close button', () => {
    // **Validates: Requirements 2.1, 2.2, 2.3, 2.4**
    fc.assert(
      fc.property(fc.integer({ min: 320, max: 768 }), (viewportWidth) => {
        // Reset DOM to the shipped nav.html for each generated case.
        document.body.innerHTML = NAV_HTML;

        // Simulate a mobile viewport width.
        window.innerWidth = viewportWidth;

        const navMenu = document.getElementById('nav-menu');
        expect(navMenu).not.toBeNull();

        // Open the mobile menu (mirrors the .is-open toggle used by nav.js).
        navMenu.classList.add('is-open');
        expect(navMenu.classList.contains('is-open')).toBe(true);

        // Expected Behavior 1: exactly 9 top-level <li> navigation links.
        // Scope to direct-child <li> so nested .nav-submenu items (added by the
        // accordion fix) are excluded — the 9 main items are still preserved.
        const listItems = navMenu.querySelectorAll(':scope > li');
        expect(listItems.length).toBe(9);

        // Expected Behavior 2: overlay header exists inside #nav-menu and shows
        // the "NOUS CONCEPTS" logo text.
        const overlayHeader = navMenu.querySelector('.nav-overlay-header');
        expect(overlayHeader).not.toBeNull();
        expect(overlayHeader.textContent).toContain('NOUS CONCEPTS');

        // Expected Behavior 3: close (X) button exists inside #nav-menu with the
        // accessible label "Cerrar menú".
        const closeBtn = navMenu.querySelector('.nav-close-btn');
        expect(closeBtn).not.toBeNull();
        expect(closeBtn.getAttribute('aria-label')).toBe('Cerrar menú');
      })
    );
  });
});
