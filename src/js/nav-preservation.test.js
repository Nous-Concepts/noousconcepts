import { describe, it, expect, beforeEach } from 'vitest';
import fc from 'fast-check';
import { setActivePage, listenMenuToggleEvent } from './nav.js';

/**
 * Property 2: Preservation — Desktop Navigation and Event Architecture Unchanged.
 *
 * Observation-first: these tests capture the CURRENT (unfixed) behavior of nav.js
 * so it can be preserved after the mobile-menu-fullscreen fix. They MUST pass on
 * the unfixed code.
 *
 * Behaviors preserved:
 *  - `menu-toggle` CustomEvent with { state: 'open' } adds `.is-open` to #nav-menu
 *    and sets aria-expanded="true" on .nav-toggle.
 *  - `menu-toggle` CustomEvent with { state: 'close' } removes `.is-open` and sets
 *    aria-expanded="false".
 *  - Focus management: closing the menu while focus is inside #nav-menu moves focus
 *    to .site-header__menu-btn.
 *  - setActivePage marks exactly one link matching the current page.
 */

const NAV_TEMPLATE = `
  <button class="site-header__menu-btn" type="button">Menu</button>
  <button class="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Abrir menú">
    <span class="nav-toggle-icon"></span>
  </button>
  <ul id="nav-menu" class="nav-links" role="menubar">
    <li role="none"><a href="home.html" role="menuitem" data-page="home">Inicio</a></li>
    <li role="none"><a href="contenidos.html" role="menuitem" data-page="contenidos">Contenidos</a></li>
    <li role="none"><a href="servicios.html" role="menuitem" data-page="servicios">Servicios</a></li>
  </ul>
`;

describe('nav.js preservation properties', () => {
  // Property 1: aria-expanded reflects the final state of an open/close sequence.
  describe('Property 1: aria-expanded matches final menu-toggle state', () => {
    beforeEach(() => {
      document.body.innerHTML = NAV_TEMPLATE;
      // Register the menu-toggle listener exactly once for this test.
      listenMenuToggleEvent();
    });

    it('after any sequence of open/close events, aria-expanded matches the last state', () => {
      // **Validates: Requirements — Desktop Navigation / Event Architecture (Preservation)**
      fc.assert(
        fc.property(fc.array(fc.constantFrom('open', 'close')), (states) => {
          // Reset DOM/attributes for each generated case so each run is independent.
          const navToggle = document.querySelector('.nav-toggle');
          const navMenu = document.getElementById('nav-menu');
          navToggle.setAttribute('aria-expanded', 'false');
          navMenu.classList.remove('is-open');

          states.forEach((state) => {
            document.dispatchEvent(
              new CustomEvent('menu-toggle', { detail: { state } })
            );
          });

          const last = states.length > 0 ? states[states.length - 1] : null;
          const expected = last === 'open' ? 'true' : 'false';

          // Empty array: initial state remains aria-expanded="false".
          expect(navToggle.getAttribute('aria-expanded')).toBe(expected);

          // is-open class stays consistent with the final state as well.
          if (last === 'open') {
            expect(navMenu.classList.contains('is-open')).toBe(true);
          } else {
            expect(navMenu.classList.contains('is-open')).toBe(false);
          }
        })
      );
    });
  });

  // Property 2: closing the menu with focus inside nav-menu returns focus to the header button.
  describe('Property 2: focus returns to .site-header__menu-btn on close', () => {
    beforeEach(() => {
      document.body.innerHTML = NAV_TEMPLATE;
      listenMenuToggleEvent();
    });

    it('for any open→close sequence with focus inside nav-menu, focus returns to the menu button', () => {
      // **Validates: Requirements — Focus Management (Preservation)**
      fc.assert(
        fc.property(
          // Choose which link inside the menu receives focus before closing.
          fc.integer({ min: 0, max: 2 }),
          (linkIndex) => {
            const navToggle = document.querySelector('.nav-toggle');
            const navMenu = document.getElementById('nav-menu');
            const headerMenuBtn = document.querySelector('.site-header__menu-btn');

            // Reset baseline state.
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('is-open');

            // Open the menu.
            document.dispatchEvent(
              new CustomEvent('menu-toggle', { detail: { state: 'open' } })
            );

            // Move focus to a link inside nav-menu.
            const links = navMenu.querySelectorAll('a');
            const focusTarget = links[linkIndex];
            focusTarget.focus();
            expect(navMenu.contains(document.activeElement)).toBe(true);

            // Close the menu.
            document.dispatchEvent(
              new CustomEvent('menu-toggle', { detail: { state: 'close' } })
            );

            // Focus should return to the header menu button.
            expect(document.activeElement).toBe(headerMenuBtn);
          }
        )
      );
    });
  });

  // Property 3: setActivePage marks exactly one link matching the current page.
  describe('Property 3: setActivePage marks exactly one matching link', () => {
    beforeEach(() => {
      document.body.innerHTML = NAV_TEMPLATE;
    });

    it('for any valid page name, exactly one link has nav-link--active and it matches', () => {
      // **Validates: Requirements — Active Page Indication (Preservation)**
      fc.assert(
        fc.property(fc.constantFrom('home', 'contenidos', 'servicios'), (pageName) => {
          setActivePage(pageName);

          const activeLinks = document.querySelectorAll('.nav-links a.nav-link--active');
          expect(activeLinks.length).toBe(1);
          expect(activeLinks[0].getAttribute('data-page')).toBe(pageName);
        })
      );
    });
  });
});
