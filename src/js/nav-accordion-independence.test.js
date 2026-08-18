import { describe, it, expect, beforeEach } from 'vitest';
import fc from 'fast-check';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { initNavigation } from './nav.js';

/**
 * Property 3: Independent Accordion State — Accordions Operate Independently.
 *
 * Expanding or collapsing one accordion (ENTRETENIMIENTO / EDUCACIÓN) must never
 * affect the other. Both can be open simultaneously; there is no mutual-exclusion
 * logic. initAccordionMenus() only toggles the `is-expanded` class and the
 * `aria-expanded` attribute of the clicked toggle's own `.nav-accordion-item`.
 *
 * The test loads the shipped src/components/nav.html into jsdom (matching the
 * convention used by nav-accordion.test.js and nav-accordion-preservation.test.js),
 * wires up navigation via initNavigation(), opens the overlay, and applies an
 * arbitrary sequence of toggle clicks. It independently tracks the expected state
 * of each accordion (each click flips only its own target) and asserts the DOM
 * matches, and that toggling one target never changes the other target's state.
 *
 * **Validates: Requirements 2.4**
 */

const __dirname = dirname(fileURLToPath(import.meta.url));
const NAV_HTML = readFileSync(
  resolve(__dirname, '../components/nav.html'),
  'utf-8'
);

const TARGETS = ['ENTRETENIMIENTO', 'EDUCACIÓN'];

// Expected sub-item counts per accordion target (from design/requirements).
const EXPECTED_SUBITEM_COUNT = {
  ENTRETENIMIENTO: 5, // Neo Samanía Conexión, La Última Función, Pánico Disfórico, Colombia Mix, Carnaval Distópico
  EDUCACIÓN: 2, // El Combo, Naranja Digital
};

/**
 * Finds the .nav-accordion-toggle button whose visible label matches the given
 * accordion target text (e.g., "ENTRETENIMIENTO").
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

/**
 * Sets up a fresh DOM from the shipped nav.html, wires navigation, opens the
 * overlay, and returns the accordion toggle + item elements keyed by target.
 */
function setupAccordions() {
  document.body.innerHTML = NAV_HTML;
  initNavigation();

  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.add('is-open');

  const accordions = {};
  for (const target of TARGETS) {
    const toggle = findToggleByLabel(navMenu, target);
    accordions[target] = {
      toggle,
      item: toggle.closest('.nav-accordion-item'),
    };
  }
  return { navMenu, accordions };
}

/**
 * Asserts the DOM state of every accordion matches the independently-tracked
 * expected state map ({ ENTRETENIMIENTO: bool, EDUCACIÓN: bool }).
 */
function assertMatchesExpected(accordions, expected) {
  for (const target of TARGETS) {
    const { toggle, item } = accordions[target];
    expect(item.classList.contains('is-expanded')).toBe(expected[target]);
    expect(toggle.getAttribute('aria-expanded')).toBe(String(expected[target]));
  }
}

describe('nav-accordion independence: accordions operate independently', () => {
  beforeEach(() => {
    document.body.innerHTML = NAV_HTML;
  });

  it('for any sequence of toggle clicks, each accordion state matches an independently-tracked expectation and toggling one never affects the other', () => {
    // **Validates: Requirements 2.4**
    fc.assert(
      fc.property(
        fc.array(fc.constantFrom('ENTRETENIMIENTO', 'EDUCACIÓN'), {
          maxLength: 12,
        }),
        (clickSequence) => {
          const { accordions } = setupAccordions();

          // Independently-tracked expected state: a click flips only its own target.
          const expected = { ENTRETENIMIENTO: false, EDUCACIÓN: false };

          // Initial state: both collapsed.
          assertMatchesExpected(accordions, expected);

          for (const target of clickSequence) {
            const other = target === 'ENTRETENIMIENTO' ? 'EDUCACIÓN' : 'ENTRETENIMIENTO';
            const otherBefore = expected[other];

            // Apply the click and flip only this target's expected state.
            accordions[target].toggle.click();
            expected[target] = !expected[target];

            // The clicked target now matches its flipped expectation.
            expect(
              accordions[target].item.classList.contains('is-expanded')
            ).toBe(expected[target]);
            expect(
              accordions[target].toggle.getAttribute('aria-expanded')
            ).toBe(String(expected[target]));

            // The OTHER target is completely unaffected by this click.
            expect(
              accordions[other].item.classList.contains('is-expanded')
            ).toBe(otherBefore);
            expect(
              accordions[other].toggle.getAttribute('aria-expanded')
            ).toBe(String(otherBefore));

            // Full-state cross-check against the independent tracker.
            assertMatchesExpected(accordions, expected);
          }
        }
      )
    );
  });

  it('concrete case: expanding ENTRETENIMIENTO then EDUCACIÓN leaves BOTH expanded simultaneously (7 sub-items: 5 + 2)', () => {
    // **Validates: Requirements 2.4**
    const { accordions } = setupAccordions();

    // Expand ENTRETENIMIENTO.
    accordions.ENTRETENIMIENTO.toggle.click();
    expect(
      accordions.ENTRETENIMIENTO.item.classList.contains('is-expanded')
    ).toBe(true);
    expect(
      accordions.ENTRETENIMIENTO.toggle.getAttribute('aria-expanded')
    ).toBe('true');

    // Expand EDUCACIÓN.
    accordions.EDUCACIÓN.toggle.click();
    expect(accordions.EDUCACIÓN.item.classList.contains('is-expanded')).toBe(
      true
    );
    expect(accordions.EDUCACIÓN.toggle.getAttribute('aria-expanded')).toBe(
      'true'
    );

    // BOTH remain expanded simultaneously — no mutual exclusion.
    expect(
      accordions.ENTRETENIMIENTO.item.classList.contains('is-expanded')
    ).toBe(true);
    expect(accordions.EDUCACIÓN.item.classList.contains('is-expanded')).toBe(
      true
    );

    // 7 sub-items total are present across both expanded submenus (5 + 2).
    const entSubItems = accordions.ENTRETENIMIENTO.item.querySelectorAll(
      'ul.nav-submenu li'
    );
    const eduSubItems = accordions.EDUCACIÓN.item.querySelectorAll(
      'ul.nav-submenu li'
    );
    expect(entSubItems.length).toBe(EXPECTED_SUBITEM_COUNT.ENTRETENIMIENTO);
    expect(eduSubItems.length).toBe(EXPECTED_SUBITEM_COUNT.EDUCACIÓN);
    expect(entSubItems.length + eduSubItems.length).toBe(7);
  });
});
