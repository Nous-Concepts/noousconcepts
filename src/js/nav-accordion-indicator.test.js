import { describe, it, expect, beforeEach } from 'vitest';
import fc from 'fast-check';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { initNavigation } from './nav.js';

/**
 * Property 4: Visual Indicator Presence — Chevron Reflects Expanded/Collapsed State.
 *
 * Each accordion item (ENTRETENIMIENTO / EDUCACIÓN) must ALWAYS display a
 * `.nav-accordion-chevron` indicator, and that indicator's visual state must
 * track the expand/collapse state of its parent `.nav-accordion-item`. In the
 * shipped CSS (src/styles/components.css) the rule
 * `.nav-accordion-item.is-expanded .nav-accordion-chevron { transform: rotate(90deg); }`
 * drives the chevron rotation, so the presence/absence of `.is-expanded` on the
 * parent item is exactly what makes the chevron rotate. This test asserts:
 *
 *   1. The chevron span exists inside the toggle in EVERY state (before any
 *      click and after every subsequent toggle).
 *   2. After each toggle the chevron's visual state tracks `.is-expanded` on the
 *      parent `.nav-accordion-item` (collapsed → no `.is-expanded`; expanded →
 *      `.is-expanded` present, which is what drives the CSS rotate(90deg)).
 *   3. `aria-expanded` on the toggle stays consistent with `.is-expanded`
 *      (true ⇔ expanded).
 *
 * The test loads the shipped src/components/nav.html into jsdom (matching the
 * convention used by nav-accordion.test.js and nav-accordion-independence.test.js),
 * wires up navigation via initNavigation(), opens the overlay, and applies a
 * generated number of toggle clicks.
 *
 * **Validates: Requirements 2.3**
 */

const __dirname = dirname(fileURLToPath(import.meta.url));
const NAV_HTML = readFileSync(
  resolve(__dirname, '../components/nav.html'),
  'utf-8'
);

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

describe('nav-accordion indicator: chevron reflects expanded/collapsed state', () => {
  beforeEach(() => {
    document.body.innerHTML = NAV_HTML;
  });

  it('for any accordion target and any number of toggles (0–5), the chevron is always present and its visual state (.is-expanded) tracks aria-expanded', () => {
    // **Validates: Requirements 2.3**
    fc.assert(
      fc.property(
        fc.constantFrom('ENTRETENIMIENTO', 'EDUCACIÓN'),
        fc.integer({ min: 0, max: 5 }),
        (target, toggleCount) => {
          // Reset DOM to the shipped nav.html for each generated case.
          document.body.innerHTML = NAV_HTML;
          initNavigation();

          const navMenu = document.getElementById('nav-menu');
          navMenu.classList.add('is-open');

          const toggle = findToggleByLabel(navMenu, target);
          expect(toggle).not.toBeNull();
          const accordionItem = toggle.closest('.nav-accordion-item');
          expect(accordionItem).not.toBeNull();

          // The chevron span exists inside the toggle in the initial state.
          const chevron = toggle.querySelector('.nav-accordion-chevron');
          expect(chevron).not.toBeNull();

          // Initial state: collapsed — no .is-expanded, aria-expanded "false".
          let expectedExpanded = false;
          expect(accordionItem.classList.contains('is-expanded')).toBe(
            expectedExpanded
          );
          expect(toggle.getAttribute('aria-expanded')).toBe(
            String(expectedExpanded)
          );

          for (let i = 0; i < toggleCount; i++) {
            toggle.click();
            expectedExpanded = !expectedExpanded;

            // Invariant 1: the chevron indicator is present in EVERY state.
            expect(toggle.querySelector('.nav-accordion-chevron')).not.toBeNull();

            // Invariant 2: the chevron's visual state tracks .is-expanded on the
            // parent item (this class is what drives the CSS rotate(90deg)).
            expect(accordionItem.classList.contains('is-expanded')).toBe(
              expectedExpanded
            );

            // Invariant 3: aria-expanded stays consistent with .is-expanded.
            expect(toggle.getAttribute('aria-expanded')).toBe(
              String(expectedExpanded)
            );
          }
        }
      )
    );
  });
});
