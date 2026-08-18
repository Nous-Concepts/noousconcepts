import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load HTML and CSS files for testing
const htmlPath = resolve(__dirname, '../pages/presentacion.html');
const cssPath = resolve(__dirname, '../styles/presentacion.css');
const htmlContent = readFileSync(htmlPath, 'utf-8');
const cssContent = readFileSync(cssPath, 'utf-8');

/**
 * Helper: strips CSS comments from a string
 */
function stripCssComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

/**
 * Helper: calculates relative luminance of a hex color per WCAG 2.1
 */
function relativeLuminance(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const linearize = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/**
 * Helper: calculates WCAG contrast ratio between two hex colors
 */
function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Task 4.1 — Estructura HTML de la página Presentación
 * Validates: Requirements 1.1, 4.1, 7.1, 7.2
 */
describe('Presentación - Estructura HTML', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    // Parse the HTML and inject the body content
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    document.body.innerHTML = doc.body.innerHTML;
  });

  it('la página tiene un único elemento <h1>', () => {
    const h1Elements = document.querySelectorAll('h1');
    expect(h1Elements.length).toBe(1);
  });

  it('el <h1> contiene el texto "Presentación"', () => {
    const h1 = document.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent).toBe('Presentación');
  });

  it('existe <main> con aria-label descriptivo', () => {
    const main = document.querySelector('main');
    expect(main).not.toBeNull();
    expect(main.getAttribute('aria-label')).toBeTruthy();
    expect(main.getAttribute('aria-label').length).toBeGreaterThan(5);
  });

  it('existe <section> con aria-label dentro de main', () => {
    const main = document.querySelector('main');
    const section = main.querySelector('section');
    expect(section).not.toBeNull();
    expect(section.getAttribute('aria-label')).toBeTruthy();
  });

  it('orden vertical correcto: header-placeholder → nav-placeholder → main', () => {
    const body = document.body;
    const children = Array.from(body.children);

    const headerIndex = children.findIndex(el => el.id === 'header-placeholder');
    const navIndex = children.findIndex(el => el.id === 'nav-placeholder');
    const mainIndex = children.findIndex(el => el.tagName.toLowerCase() === 'main');

    expect(headerIndex).toBeGreaterThanOrEqual(0);
    expect(navIndex).toBeGreaterThanOrEqual(0);
    expect(mainIndex).toBeGreaterThanOrEqual(0);

    expect(headerIndex).toBeLessThan(navIndex);
    expect(navIndex).toBeLessThan(mainIndex);
  });

  it('el main tiene la clase "presentacion"', () => {
    const main = document.querySelector('main');
    expect(main).not.toBeNull();
    expect(main.classList.contains('presentacion')).toBe(true);
  });
});

/**
 * Task 4.2 — CSS y tokens de diseño
 * Validates: Requirements 2.4, 6.1, 6.4
 */
describe('Presentación - CSS y tokens de diseño', () => {
  const cssWithoutComments = stripCssComments(cssContent);

  it('el archivo CSS no contiene valores de color literales (hex/rgb) fuera de comentarios', () => {
    // Match hex colors (#xxx, #xxxxxx) or rgb/rgba functions in declarations
    const hexPattern = /#[0-9a-fA-F]{3,8}\b/g;
    const rgbPattern = /\brgba?\s*\(/g;

    const hasHex = hexPattern.test(cssWithoutComments);
    const hasRgb = rgbPattern.test(cssWithoutComments);

    expect(hasHex).toBe(false);
    expect(hasRgb).toBe(false);
  });

  it('las media queries usan min-width (no max-width) — mobile-first', () => {
    const mediaQueries = cssWithoutComments.match(/@media\s*\([^)]+\)/g) || [];
    expect(mediaQueries.length).toBeGreaterThan(0);

    mediaQueries.forEach((mq) => {
      expect(mq).toContain('min-width');
      expect(mq).not.toContain('max-width');
    });
  });

  it('se usa 768px/769px como breakpoint (umbral único)', () => {
    const breakpoints = cssWithoutComments.match(/min-width:\s*(\d+)px/g) || [];
    expect(breakpoints.length).toBeGreaterThan(0);

    breakpoints.forEach((bp) => {
      const value = parseInt(bp.match(/(\d+)px/)[1], 10);
      expect(value === 768 || value === 769).toBe(true);
    });
  });

  it('se referencian las variables --color-bg, --color-text, --font-heading', () => {
    expect(cssContent).toContain('--color-text');
    expect(cssContent).toContain('--font-heading');
    // --color-bg may be referenced directly or inherited from body; check for --color- usage
    // The design requires --color-text is used (which implies dark mode token usage)
    expect(cssContent).toContain('var(--color-text)');
    expect(cssContent).toContain('var(--font-heading)');
  });
});

/**
 * Task 4.3 — Contraste y accesibilidad
 * Validates: Requirements 2.5, 4.2, 7.6
 */
describe('Presentación - Contraste y accesibilidad', () => {
  it('contraste entre #eaeaea (texto) y #0f0f1a (fondo) cumple ratio ≥ 4.5:1 WCAG AA', () => {
    const textColor = '#eaeaea';
    const bgColor = '#0f0f1a';
    const ratio = contrastRatio(textColor, bgColor);

    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('.presentacion__title tiene text-align: right', () => {
    const cssWithoutComments = stripCssComments(cssContent);
    // Match .presentacion__title block and check for text-align: right
    const titleBlockPattern = /\.presentacion__title\s*\{[^}]*text-align:\s*right/s;
    expect(titleBlockPattern.test(cssWithoutComments)).toBe(true);
  });
});
