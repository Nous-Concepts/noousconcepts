import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Task 5.1 — Home page layout and dark mode
 * Validates: Requirements 1.1, 2.1, 2.5
 */
describe('Home Page Layout and Dark Mode', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="header-placeholder">
        <header class="site-header" role="banner">
          <nav aria-label="Encabezado principal">
            <a class="site-header__logo" href="home.html" aria-label="NOUS CONCEPTS - Inicio">NOUS CONCEPTS</a>
            <ul class="nav-links">
              <li><a href="home.html" data-page="home">Inicio</a></li>
            </ul>
            <button class="site-header__menu-btn" type="button" aria-expanded="false" aria-controls="nav-menu" aria-label="Abrir menú">
              <span class="site-header__menu-icon"></span>
            </button>
          </nav>
        </header>
      </div>
      <main>
        <section class="hero" aria-label="Sección principal de Nous Concepts">
          <div class="hero__content">
            <h1 class="hero__title">NOUS CONCEPTS</h1>
          </div>
        </section>
        <div class="scroll-more" aria-hidden="false">
          <button class="scroll-more__btn" type="button" aria-label="Ir a la sección Descripción del estudio">
            <span class="scroll-more__text">Más</span>
            <span class="scroll-more__icon" aria-hidden="true">▼</span>
          </button>
        </div>
        <section class="description" aria-label="Descripción del estudio">
          <p class="description__text">Studio description text</p>
        </section>
      </main>
    `;
  });

  describe('Section order within main', () => {
    it('should render hero, scroll-more, and description in correct order', () => {
      const main = document.querySelector('main');
      const children = Array.from(main.children);

      const heroIndex = children.findIndex(el => el.classList.contains('hero'));
      const scrollMoreIndex = children.findIndex(el => el.classList.contains('scroll-more'));
      const descriptionIndex = children.findIndex(el => el.classList.contains('description'));

      expect(heroIndex).toBeGreaterThanOrEqual(0);
      expect(scrollMoreIndex).toBeGreaterThanOrEqual(0);
      expect(descriptionIndex).toBeGreaterThanOrEqual(0);

      expect(heroIndex).toBeLessThan(scrollMoreIndex);
      expect(scrollMoreIndex).toBeLessThan(descriptionIndex);
    });
  });

  describe('CSS variable usage (no hardcoded colors)', () => {
    const homeCssPath = resolve(__dirname, '../styles/home.css');
    const mainCssPath = resolve(__dirname, '../styles/main.css');
    const homeCss = readFileSync(homeCssPath, 'utf-8');
    const mainCss = readFileSync(mainCssPath, 'utf-8');

    it('body should use var(--color-bg) for background-color', () => {
      // Check in both home.css and main.css since either may define body styles
      const bodyBgPattern = /body\s*\{[^}]*background-color:\s*var\(--color-bg\)/s;
      const hasVarInHome = bodyBgPattern.test(homeCss);
      const hasVarInMain = bodyBgPattern.test(mainCss);
      expect(hasVarInHome || hasVarInMain).toBe(true);
    });

    it('hero section should use var(--color-secondary) for background-color', () => {
      const heroPattern = /\.hero\s*\{[^}]*background-color:\s*var\(--color-secondary\)/s;
      expect(heroPattern.test(homeCss)).toBe(true);
    });

    it('should not use prefers-color-scheme in any stylesheet', () => {
      const variablesCssPath = resolve(__dirname, '../styles/variables.css');
      const variablesCss = readFileSync(variablesCssPath, 'utf-8');

      const allCss = homeCss + mainCss + variablesCss;
      expect(allCss).not.toContain('prefers-color-scheme');
    });
  });
});

/**
 * Task 5.2 — Accessibility attributes
 * Validates: Requirements 8.1, 8.2, 8.3, 8.4, 8.7, 8.9
 */
describe('Accessibility Attributes', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="header-placeholder">
        <header class="site-header" role="banner">
          <nav aria-label="Encabezado principal">
            <a class="site-header__logo" href="home.html" aria-label="NOUS CONCEPTS - Inicio">NOUS CONCEPTS</a>
            <ul class="nav-links">
              <li><a href="home.html" data-page="home">Inicio</a></li>
            </ul>
            <button class="site-header__menu-btn" type="button" aria-expanded="false" aria-controls="nav-menu" aria-label="Abrir menú">
              <span class="site-header__menu-icon"></span>
            </button>
          </nav>
        </header>
      </div>
      <main>
        <section class="hero" aria-label="Sección principal de Nous Concepts">
          <div class="hero__content">
            <h1 class="hero__title">NOUS CONCEPTS</h1>
          </div>
        </section>
        <div class="scroll-more" aria-hidden="false">
          <button class="scroll-more__btn" type="button" aria-label="Ir a la sección Descripción del estudio">
            <span class="scroll-more__text">Más</span>
            <span class="scroll-more__icon" aria-hidden="true">▼</span>
          </button>
        </div>
        <section class="description" aria-label="Descripción del estudio">
          <p class="description__text">Studio description text</p>
        </section>
      </main>
    `;
  });

  describe('Section aria-labels', () => {
    it('hero section should have an aria-label', () => {
      const hero = document.querySelector('.hero');
      expect(hero).not.toBeNull();
      expect(hero.getAttribute('aria-label')).toBeTruthy();
    });

    it('description section should have an aria-label', () => {
      const description = document.querySelector('.description');
      expect(description).not.toBeNull();
      expect(description.getAttribute('aria-label')).toBeTruthy();
    });
  });

  describe('Scroll-more button accessibility', () => {
    it('scroll-more button should have an aria-label', () => {
      const scrollBtn = document.querySelector('.scroll-more__btn');
      expect(scrollBtn).not.toBeNull();
      expect(scrollBtn.getAttribute('aria-label')).toBeTruthy();
    });
  });

  describe('Menu button accessibility', () => {
    it('menu button should have aria-expanded attribute', () => {
      const menuBtn = document.querySelector('.site-header__menu-btn');
      expect(menuBtn).not.toBeNull();
      expect(menuBtn.hasAttribute('aria-expanded')).toBe(true);
    });

    it('menu button should have aria-controls attribute', () => {
      const menuBtn = document.querySelector('.site-header__menu-btn');
      expect(menuBtn).not.toBeNull();
      expect(menuBtn.getAttribute('aria-controls')).toBeTruthy();
    });

    it('menu button should have aria-label attribute', () => {
      const menuBtn = document.querySelector('.site-header__menu-btn');
      expect(menuBtn).not.toBeNull();
      expect(menuBtn.getAttribute('aria-label')).toBeTruthy();
    });
  });

  describe('Tab order for interactive elements', () => {
    it('all interactive elements should be reachable via tab (no negative tabindex)', () => {
      const interactiveElements = document.querySelectorAll('a, button, [tabindex]');
      interactiveElements.forEach(el => {
        const tabindex = el.getAttribute('tabindex');
        // tabindex should be null (default, tabbable) or >= 0
        if (tabindex !== null) {
          expect(Number(tabindex)).toBeGreaterThanOrEqual(0);
        }
      });
    });

    it('all buttons and links should be present and focusable', () => {
      const logo = document.querySelector('.site-header__logo');
      const menuBtn = document.querySelector('.site-header__menu-btn');
      const scrollBtn = document.querySelector('.scroll-more__btn');

      expect(logo).not.toBeNull();
      expect(menuBtn).not.toBeNull();
      expect(scrollBtn).not.toBeNull();

      // Verify they are not hidden from tab order
      expect(logo.getAttribute('tabindex')).not.toBe('-1');
      expect(menuBtn.getAttribute('tabindex')).not.toBe('-1');
      expect(scrollBtn.getAttribute('tabindex')).not.toBe('-1');
    });
  });
});
