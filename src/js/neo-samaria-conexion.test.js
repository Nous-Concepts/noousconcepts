import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

// Load HTML and CSS files for testing
const htmlPath = resolve(__dirname, '../pages/neo-samaria-conexion.html');
const cssPath = resolve(__dirname, '../styles/neo-samaria-conexion.css');

const htmlContent = readFileSync(htmlPath, 'utf-8');
const cssContent = existsSync(cssPath) ? readFileSync(cssPath, 'utf-8') : '';

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

const PROHIBITED_TEXTS = [
  'En Construcción',
  'Under Construction',
  'Coming Soon',
  'Próximamente',
  'Work in Progress',
  'Lorem Ipsum',
  'Placeholder',
];

/**
 * Task 5.1 — Estructura DOM de la página Neo Samaria Conexión
 * Validates: Requirements 1.1, 4.1, 4.7, 5.1, 6.1, 6.4, 6.5, 8.1, 8.2, 8.3, 8.4, 8.9, 9.1, 9.3
 */
describe('Neo Samaria Conexión - Estructura DOM', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    document.body.innerHTML = doc.body.innerHTML;
  });

  it('la página tiene un único elemento <h1> con el texto "Neo Samaria Conexión"', () => {
    const h1Elements = document.querySelectorAll('h1');
    expect(h1Elements.length).toBe(1);
    expect(h1Elements[0].textContent.trim()).toBe('Neo Samaria Conexión');
  });

  it('orden vertical correcto: header-placeholder → nav-placeholder → main', () => {
    const children = Array.from(document.body.children);

    const headerIndex = children.findIndex((el) => el.id === 'header-placeholder');
    const navIndex = children.findIndex((el) => el.id === 'nav-placeholder');
    const mainIndex = children.findIndex((el) => el.tagName.toLowerCase() === 'main');

    expect(headerIndex).toBeGreaterThanOrEqual(0);
    expect(navIndex).toBeGreaterThanOrEqual(0);
    expect(mainIndex).toBeGreaterThanOrEqual(0);

    expect(headerIndex).toBeLessThan(navIndex);
    expect(navIndex).toBeLessThan(mainIndex);
  });

  it('el <main> tiene la clase "neo-samaria" y un aria-label descriptivo', () => {
    const main = document.querySelector('main');
    expect(main).not.toBeNull();
    expect(main.classList.contains('neo-samaria')).toBe(true);
    const ariaLabel = main.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel.length).toBeGreaterThan(5);
  });

  it('existe una <section> de sinopsis con aria-label', () => {
    const synopsis = document.querySelector('.neo-samaria__synopsis');
    expect(synopsis).not.toBeNull();
    expect(synopsis.tagName.toLowerCase()).toBe('section');
    expect(synopsis.getAttribute('aria-label')).toBeTruthy();
  });

  it('existe una <section> de imágenes con aria-label', () => {
    const images = document.querySelector('.neo-samaria__images');
    expect(images).not.toBeNull();
    expect(images.tagName.toLowerCase()).toBe('section');
    expect(images.getAttribute('aria-label')).toBeTruthy();
  });

  it('existen exactamente dos elementos <img> dentro de la sección de imágenes', () => {
    const imgs = document.querySelectorAll('.neo-samaria__images img');
    expect(imgs.length).toBe(2);
  });

  it('cada imagen tiene un atributo alt con longitud entre 10 y 125 caracteres', () => {
    const imgs = document.querySelectorAll('.neo-samaria__images img');
    imgs.forEach((img) => {
      const alt = img.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt.length).toBeGreaterThanOrEqual(10);
      expect(alt.length).toBeLessThanOrEqual(125);
    });
  });

  it('no contiene textos prohibidos ("En Construcción", "Lorem Ipsum", etc.)', () => {
    const text = document.body.textContent.toLowerCase();
    PROHIBITED_TEXTS.forEach((phrase) => {
      expect(text).not.toContain(phrase.toLowerCase());
    });
  });
});

/**
 * Task 5.2 — CSS y tokens de diseño
 * Validates: Requirements 2.4, 2.5, 7.1, 7.4, 8.8
 */
describe('Neo Samaria Conexión - CSS y tokens de diseño', () => {
  const cssWithoutComments = stripCssComments(cssContent);
  // Allow the single permitted literal fallback: var(--color-bg, #0f0f1a)
  const cssWithoutAllowedFallback = cssWithoutComments.replace(
    /var\(\s*--color-bg\s*,\s*#0f0f1a\s*\)/g,
    'var(--color-bg)'
  );

  it('el archivo CSS existe', () => {
    expect(existsSync(cssPath)).toBe(true);
  });

  it('el CSS no contiene valores de color literales (hex/rgb) salvo el fallback permitido', () => {
    const hexPattern = /#[0-9a-fA-F]{3,8}\b/g;
    const rgbPattern = /\brgba?\s*\(/g;

    expect(hexPattern.test(cssWithoutAllowedFallback)).toBe(false);
    expect(rgbPattern.test(cssWithoutAllowedFallback)).toBe(false);
  });

  it('las media queries usan min-width (mobile-first)', () => {
    const mediaQueries = cssWithoutComments.match(/@media\s*\([^)]+\)/g) || [];
    expect(mediaQueries.length).toBeGreaterThan(0);

    mediaQueries.forEach((mq) => {
      expect(mq).toContain('min-width');
      expect(mq).not.toContain('max-width');
    });
  });

  it('el breakpoint único es 768px o 769px', () => {
    const breakpoints = cssWithoutComments.match(/min-width:\s*(\d+)px/g) || [];
    expect(breakpoints.length).toBeGreaterThan(0);

    breakpoints.forEach((bp) => {
      const value = parseInt(bp.match(/(\d+)px/)[1], 10);
      expect(value === 768 || value === 769).toBe(true);
    });
  });

  it('se referencian las variables --color-text, --font-heading y --spacing-md', () => {
    expect(cssContent).toContain('var(--color-text)');
    expect(cssContent).toContain('var(--font-heading)');
    expect(cssContent).toContain('--spacing-md');
  });

  it('contraste entre #eaeaea (texto) y #0f0f1a (fondo) cumple ratio ≥ 4.5:1 WCAG AA', () => {
    const ratio = contrastRatio('#eaeaea', '#0f0f1a');
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
});

/**
 * Task 5.3 — Contenido y accesibilidad
 * Validates: Requirements 2.1, 5.1, 6.6, 6.7, 6.9
 */
describe('Neo Samaria Conexión - Contenido y accesibilidad', () => {
  it('el atributo data-theme="dark" está en el elemento <html>', () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    expect(doc.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('la sinopsis contiene "Neo Samaria, LA ULTIMA CIUDAD DEL CARIBE COLOMBIANO"', () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const synopsis = doc.querySelector('.neo-samaria__synopsis');
    expect(synopsis).not.toBeNull();
    expect(synopsis.textContent).toContain(
      'Neo Samaria, LA ULTIMA CIUDAD DEL CARIBE COLOMBIANO'
    );
  });

  it('las imágenes apuntan a rutas en contenidos/neo-samaria/', () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const imgs = doc.querySelectorAll('.neo-samaria__images img');
    expect(imgs.length).toBe(2);
    imgs.forEach((img) => {
      expect(img.getAttribute('src')).toContain('contenidos/neo-samaria/');
    });
  });

  it('los contenedores de imagen tienen estilo para aspect-ratio', () => {
    const cssWithoutComments = stripCssComments(cssContent);
    const wrapperBlockPattern = /\.neo-samaria__image-wrapper\s*\{[^}]*aspect-ratio\s*:/s;
    expect(wrapperBlockPattern.test(cssWithoutComments)).toBe(true);
  });
});
