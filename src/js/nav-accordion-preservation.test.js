import { describe, it, expect, beforeEach } from 'vitest';
import fc from 'fast-check';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { initNavigation } from './nav.js';

/**
 * Property 2: Preservation — Non-Accordion Items and Overlay Controls Unchanged.
 *
 * Observation-first: these tests capture the CURRENT (unfixed) behavior of the
 * mobile fullscreen menu so it can be preserved after the accordion submenu fix
 * (ENTRETENIMIENTO / EDUCACIÓN). They MUST pass on the UNFIXED code and must keep
 * passing after the fix.
 *
 * The markup is sourced from the real component (src/components/nav.html) so the
 * tests validate the shipped structure, matching the convention used by
 * nav-fullscreen.test.js.
 *
 * Behaviors preserved:
 *  - Clicking a non-accordion item (PRESENTACIÓN, GDE, RSE, I+D, SIRUMA,
 *    Servicios, ¿Quienes Somos?) closes the overlay (funnels through
 *    closeMobileMenu → menu-toggle 'close').
 *  - The close (X) button and the Escape key both close the overlay and restore
 *    ARIA state (aria-expanded="false").
 *  - The 9 main <li> items remain in the correct order.
 *  - .nav-overlay-header contains the "NOUS CONCEPTS" logo and the .nav-close-btn.
 *  - Desktop (viewport > 768px) shows the nav inline: the default (unopened)
 *    state exposes all 9 links without the .is-open overlay class.
 *
 * NOTE ON ROBUSTNESS TO THE FIX: after the fix, ENTRETENIMIENTO and EDUCACIÓN
 * become accordion items (a <button> toggle + a nested .nav-submenu <ul>). The
 * "main item order" assertion therefore reads the label from each main item's
 * top-level control (:scope > a, :scope > button) and strips the chevron glyph
 * (›), so it stays correct both before and after the fix.
 */

const __dirname = dirname(fileURLToPath(import.meta.url));
const NAV_HTML = readFileSync(
  resolve(__dirname, '../components/nav.html'),
  'utf-8'
);

// The 9 main navigation items in their required order.
const MAIN_ITEMS_ORDER = [
  'PRESENTACIÓN',
  'ENTRETENIMIENTO',
  'EDUCACIÓN',
  'GDE',
  'RSE',
  'I+D',
  'SIRUMA',
  'Servicios',
  '¿Quienes Somos?',
];

// Items that are NOT accordions and must keep navigating + closing the overlay.
const NON_ACCORDION_ITEMS = [
  'PRESENTACIÓN',
  'GDE',
  'RSE',
  'I+D',
  'SIRUMA',
  'Servicios',
  '¿Quienes Somos?',
];

/**
 * Reads the visible label of a main <li>'s top-level control, stripping the
 * accordion chevron glyph so it matches both plain links (unfixed) and accordion
 * toggle buttons (fixed).
 */
function mainItemLabel(li) {
  const control = li.querySelector(':scope > a, :scope > button');
  return control.textContent.replace('›', '').trim();
}

/** Returns the ordered list of main <li> elements (direct children of #nav-menu). */
function getMainItems(navMenu) {
  return Array.from(navMenu.children).filter((el) => el.tagName === 'LI');
}

/** Opens the overlay via the established menu-toggle 'open' event. */
function openMenu() {
  document.dispatchEvent(
    new CustomEvent('menu-toggle', { detail: { state: 'open' } })
  );
}

describe('nav accordion preservation properties', () => {
  // Property 1: clicking a non-accordion item closes the overlay.
  describe('Property: non-accordion items close the overlay on click', () => {
    beforeEach(() => {
      document.body.innerHTML = NAV_HTML;
      initNavigation();
    });

    it('for any non-accordion item, clicking it closes the overlay and restores ARIA', () => {
      // **Validates: Requirements 3.1**
      fc.assert(
        fc.property(fc.constantFrom(...NON_ACCORDION_ITEMS), (itemText) => {
          const navMenu = document.getElementById('nav-menu');
          const navToggle = document.querySelector('.nav-toggle');

          // Open the overlay before each generated case.
          openMenu();
          expect(navMenu.classList.contains('is-open')).toBe(true);

          // Locate the non-accordion link by its label.
          const links = Array.from(navMenu.querySelectorAll('li > a'));
          const link = links.find((a) => a.textContent.trim() === itemText);
          expect(link).toBeTruthy();

          // Clicking navigates in a real browser; here it must close the overlay.
          link.click();

          expect(navMenu.classList.contains('is-open')).toBe(false);
          expect(navToggle.getAttribute('aria-expanded')).toBe('false');
        })
      );
    });
  });

  // Property 2: close button (X) and Escape key close the overlay and restore ARIA.
  describe('Property: close button and Escape close the overlay', () => {
    beforeEach(() => {
      document.body.innerHTML = NAV_HTML;
      initNavigation();
    });

    it('for any close method after any open/close sequence, the overlay ends closed with ARIA restored', () => {
      // **Validates: Requirements 3.2**
      fc.assert(
        fc.property(
          // A prelude of open/close toggles, then a definitive close action.
          fc.array(fc.constantFrom('open', 'close'), { maxLength: 6 }),
          fc.constantFrom('close-button', 'escape'),
          (sequence, closeMethod) => {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            const closeBtn = navMenu.querySelector('.nav-close-btn');

            // Reset to a known baseline.
            navMenu.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');

            // Apply the generated open/close prelude.
            sequence.forEach((state) => {
              document.dispatchEvent(
                new CustomEvent('menu-toggle', { detail: { state } })
              );
            });

            // Ensure the menu is open, then close it via the chosen control.
            openMenu();
            expect(navMenu.classList.contains('is-open')).toBe(true);

            if (closeMethod === 'close-button') {
              closeBtn.click();
            } else {
              document.dispatchEvent(
                new KeyboardEvent('keydown', { key: 'Escape' })
              );
            }

            expect(navMenu.classList.contains('is-open')).toBe(false);
            expect(navToggle.getAttribute('aria-expanded')).toBe('false');
          }
        )
      );
    });
  });

  // Property 3: the 9 main items always appear in the correct order.
  describe('Property: 9 main items remain in correct order', () => {
    beforeEach(() => {
      document.body.innerHTML = NAV_HTML;
    });

    it('for any viewport width, the 9 main items appear in the required order', () => {
      // **Validates: Requirements 3.3**
      fc.assert(
        fc.property(fc.integer({ min: 320, max: 1920 }), (viewportWidth) => {
          document.body.innerHTML = NAV_HTML;
          window.innerWidth = viewportWidth;

          const navMenu = document.getElementById('nav-menu');
          const mainItems = getMainItems(navMenu);

          expect(mainItems.length).toBe(9);
          expect(mainItems.map(mainItemLabel)).toEqual(MAIN_ITEMS_ORDER);
        })
      );
    });
  });

  // Property 4: overlay header contains the logo and the close button.
  describe('Property: overlay header contains logo and close button', () => {
    beforeEach(() => {
      document.body.innerHTML = NAV_HTML;
    });

    it('for any open/closed state, .nav-overlay-header holds "NOUS CONCEPTS" and .nav-close-btn', () => {
      // **Validates: Requirements 3.4**
      fc.assert(
        fc.property(fc.boolean(), (isOpen) => {
          document.body.innerHTML = NAV_HTML;
          const navMenu = document.getElementById('nav-menu');
          if (isOpen) navMenu.classList.add('is-open');

          const overlayHeader = navMenu.querySelector('.nav-overlay-header');
          expect(overlayHeader).not.toBeNull();
          expect(overlayHeader.textContent).toContain('NOUS CONCEPTS');

          const closeBtn = overlayHeader.querySelector('.nav-close-btn');
          expect(closeBtn).not.toBeNull();
          expect(closeBtn.getAttribute('aria-label')).toBe('Cerrar menú');
        })
      );
    });
  });

  // Property 5: desktop nav (> 768px) shows all links inline without overlay state.
  describe('Property: desktop nav displays inline without overlay behavior', () => {
    beforeEach(() => {
      document.body.innerHTML = NAV_HTML;
    });

    it('for any desktop viewport (> 768px), the default state exposes all 9 links without .is-open', () => {
      // **Validates: Requirements 3.5**
      fc.assert(
        fc.property(fc.integer({ min: 769, max: 2560 }), (viewportWidth) => {
          document.body.innerHTML = NAV_HTML;
          window.innerWidth = viewportWidth;

          const navMenu = document.getElementById('nav-menu');

          // Desktop shows the nav inline: it is NOT in the fullscreen overlay
          // (.is-open) state by default.
          expect(navMenu.classList.contains('is-open')).toBe(false);

          // All 9 navigation links remain present and reachable inline.
          const mainItems = getMainItems(navMenu);
          expect(mainItems.length).toBe(9);
          expect(mainItems.map(mainItemLabel)).toEqual(MAIN_ITEMS_ORDER);
        })
      );
    });
  });
});
