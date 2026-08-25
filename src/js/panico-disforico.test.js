import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

// Load HTML and CSS files for testing
const htmlPath = resolve(__dirname, '../pages/panico-disforico.html');
const cssPath = resolve(__dirname, '../styles/panico-disforico.css');

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

/**
 * Task 4.4 — Tab Bar Tests
 * Validates: Requirements for Tab Bar structure and accessibility
 */
describe('Tab Bar', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    // Parse the HTML and inject the body content
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    document.body.innerHTML = doc.body.innerHTML;
  });

  it('existe <nav class="tab-bar" aria-label="Navegación de secciones">', () => {
    const tabBar = document.querySelector('nav.tab-bar[aria-label="Navegación de secciones"]');
    expect(tabBar).toBeTruthy();
  });

  it('la Tab Bar tiene exactamente 3 ítems <a>', () => {
    const tabBar = document.querySelector('nav.tab-bar');
    const items = tabBar.querySelectorAll('a.tab-bar__item');
    expect(items.length).toBe(3);
  });

  it('el ítem con clase tab-bar__item--active apunta a contenidos.html', () => {
    const tabBar = document.querySelector('nav.tab-bar');
    const activeItem = tabBar.querySelector('a.tab-bar__item--active');
    expect(activeItem).toBeTruthy();
    expect(activeItem.getAttribute('href')).toBe('contenidos.html');
  });

  it('los tres aria-label de los ítems son "Ir a Inicio", "Ir a Contenidos (activo)", "Ir a Nosotros"', () => {
    const tabBar = document.querySelector('nav.tab-bar');
    const items = tabBar.querySelectorAll('a.tab-bar__item');
    const labels = Array.from(items).map((item) => item.getAttribute('aria-label'));
    expect(labels).toEqual(['Ir a Inicio', 'Ir a Contenidos (activo)', 'Ir a Nosotros']);
  });

  it('cada ítem contiene un <svg> con aria-hidden="true" y un elemento .tab-bar__label', () => {
    const tabBar = document.querySelector('nav.tab-bar');
    const items = tabBar.querySelectorAll('a.tab-bar__item');

    items.forEach((item) => {
      // Check for SVG with aria-hidden="true"
      const svg = item.querySelector('svg');
      expect(svg).toBeTruthy();
      expect(svg.getAttribute('aria-hidden')).toBe('true');

      // Check for .tab-bar__label
      const label = item.querySelector('.tab-bar__label');
      expect(label).toBeTruthy();
    });
  });
});

/**
 * Helper: extracts media queries from CSS
 */
function extractMediaQueries(css) {
  const mediaRegex = /@media\s*\([^)]*\)\s*\{/g;
  return css.match(mediaRegex) || [];
}

/**
 * Helper: checks if a CSS rule contains literal colors (hex/rgb)
 * Excludes fallback values in var() declarations
 */
function hasLiteralColors(css) {
  // Remove comments and var() declarations with fallbacks
  let cleaned = stripCssComments(css);
  // Remove variable declarations with fallback values
  cleaned = cleaned.replace(/var\([^,)]*,\s*[^)]*\)/g, '');
  // Check for hex colors and rgb/rgba
  const hexPattern = /#[0-9a-fA-F]{3,8}/g;
  const rgbPattern = /rgb\s*\(/g;
  return hexPattern.test(cleaned) || rgbPattern.test(cleaned);
}

describe('CSS y tokens de diseño', () => {
  it('el archivo CSS existe', () => {
    expect(cssPath).toBeTruthy();
    expect(existsSync(cssPath)).toBe(true);
  });

  it('el CSS no contiene colores literales (hex/rgb) salvo el fallback permitido', () => {
    // Get the CSS content without comments
    const cleaned = stripCssComments(cssContent);
    
    // Check for literal colors outside of var() fallbacks
    // The only permitted fallback is in body { background-color: var(--color-bg, #0f0f1a); }
    const permittedFallbacks = ['#0f0f1a'];
    
    // Find all hex colors in the CSS
    const hexMatches = cleaned.match(/#[0-9a-fA-F]{3,8}/g) || [];
    
    // Check that any hex found is in the permitted list
    for (const hex of hexMatches) {
      expect(permittedFallbacks).toContain(hex);
    }
    
    // Check that there are no rgb/rgba colors
    const rgbMatches = cleaned.match(/rgb\s*\([^)]*\)/g) || [];
    expect(rgbMatches).toHaveLength(0);
  });

  it('las media queries usan `min-width` (mobile-first)', () => {
    const cleaned = stripCssComments(cssContent);
    const mediaQueries = extractMediaQueries(cleaned);
    
    // Verify that we have at least one media query
    expect(mediaQueries.length).toBeGreaterThan(0);
    
    // Verify all media queries use min-width (mobile-first approach)
    for (const mediaQuery of mediaQueries) {
      expect(mediaQuery).toContain('min-width');
    }
  });

  it('el breakpoint único es `768px` o `769px`', () => {
    const cleaned = stripCssComments(cssContent);
    
    // Extract all breakpoint values from media queries
    const breakpointPattern = /\(min-width:\s*(\d+px)\)/g;
    const matches = [...cleaned.matchAll(breakpointPattern)];
    const breakpoints = matches.map((m) => m[1]);
    
    // Verify we have exactly one breakpoint
    const uniqueBreakpoints = [...new Set(breakpoints)];
    expect(uniqueBreakpoints).toHaveLength(1);
    
    // Verify it's either 768px or 769px
    const breakpoint = uniqueBreakpoints[0];
    expect(['768px', '769px']).toContain(breakpoint);
  });

  it('`.tab-bar { display: none }` aparece dentro de la media query', () => {
    const cleaned = stripCssComments(cssContent);
    
    // Find the media query section with min-width
    // Using a more flexible pattern to capture the entire media query block
    const mediaQueryMatch = cleaned.match(/@media\s*\([^)]*min-width[^)]*\)\s*\{([\s\S]*)\}(?![\s\S]*@media)/);
    expect(mediaQueryMatch).toBeTruthy();
    
    const mediaQueryContent = mediaQueryMatch[1];
    
    // Check that .tab-bar { display: none } appears in the media query
    // Look for .tab-bar selector followed by display: none
    expect(mediaQueryContent.includes('.tab-bar')).toBe(true);
    expect(mediaQueryContent.includes('display')).toBe(true);
    expect(mediaQueryContent.includes('none')).toBe(true);
    
    // Verify the pattern more specifically: .tab-bar with display: none
    const tabBarPattern = /\.tab-bar\s*\{[\s\S]*?display\s*:\s*none/;
    expect(tabBarPattern.test(mediaQueryContent)).toBe(true);
  });

  it('se referencian `--color-text`, `--font-heading`, `--spacing-md`, `--color-accent`', () => {
    const cleaned = stripCssComments(cssContent);
    
    // Check for each required design token reference
    const requiredTokens = [
      '--color-text',
      '--font-heading',
      '--spacing-md',
      '--color-accent'
    ];
    
    for (const token of requiredTokens) {
      expect(cleaned).toContain(`var(${token}`);
    }
  });

  /**
   * Task 4.7 — Property 4: Contraste WCAG 2.1 AA
   * Validates: Requirements 8.5, 8.6
   */
  it('contraste #eaeaea (texto normal) sobre #0f0f1a (fondo) ≥ 4.5:1 (WCAG 2.1 AA)', () => {
    const ratio = contrastRatio('#eaeaea', '#0f0f1a');
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  it('contraste #a0a0a0 (texto pequeño/muted) sobre #0f0f1a (fondo) ≥ 3:1 (WCAG 2.1 AA)', () => {
    const ratio = contrastRatio('#a0a0a0', '#0f0f1a');
    expect(ratio).toBeGreaterThanOrEqual(3);
  });

  /**
   * Task 4.6 — Property 2: Orden de carga de estilos
   * Validates: Requirements 2.1
   */
  it('en el <head>, el índice de variables.css < main.css < components.css < panico-disforico.css', () => {
    // Parse HTML and extract the <head> section
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const head = doc.querySelector('head');
    
    // Get all link elements with rel="stylesheet"
    const styleLinks = head.querySelectorAll('link[rel="stylesheet"]');
    
    // Map to filenames for easier indexing
    const filenames = Array.from(styleLinks).map((link) => {
      const href = link.getAttribute('href');
      // Extract the filename from the href (e.g., "../styles/variables.css" → "variables.css")
      return href.split('/').pop();
    });
    
    // Find indices of each stylesheet
    const variablesIndex = filenames.indexOf('variables.css');
    const mainIndex = filenames.indexOf('main.css');
    const componentsIndex = filenames.indexOf('components.css');
    const panicoIndex = filenames.indexOf('panico-disforico.css');
    
    // Verify all stylesheets are present
    expect(variablesIndex).toBeGreaterThanOrEqual(0);
    expect(mainIndex).toBeGreaterThanOrEqual(0);
    expect(componentsIndex).toBeGreaterThanOrEqual(0);
    expect(panicoIndex).toBeGreaterThanOrEqual(0);
    
    // Verify the correct order: variables.css < main.css < components.css < panico-disforico.css
    expect(variablesIndex).toBeLessThan(mainIndex);
    expect(mainIndex).toBeLessThan(componentsIndex);
    expect(componentsIndex).toBeLessThan(panicoIndex);
  });
});

/**
 * Task 4.2 — Estructura DOM de Pánico Disfórico
 * Validates: Requirements 1.1, 1.2, 1.5, 3.1, 3.2, 3.4, 4.1, 4.2, 5.1, 5.2, 8.2, 8.3
 */
describe('Pánico Disfórico - Estructura DOM', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    document.body.innerHTML = doc.body.innerHTML;
    document.documentElement.setAttribute('lang', doc.documentElement.getAttribute('lang'));
    document.documentElement.setAttribute('data-theme', doc.documentElement.getAttribute('data-theme'));
    document.title = doc.title;
  });

  it('<html> tiene data-theme="dark" y lang="es"', () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    expect(doc.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(doc.documentElement.getAttribute('lang')).toBe('es');
  });

  it('<title> es "Pánico Disfórico — NOUS CONCEPTS"', () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    expect(doc.title).toBe('Pánico Disfórico — NOUS CONCEPTS');
  });

  it('orden en <body>: skip link → header-placeholder → nav-placeholder → main → tab-bar → footer-placeholder', () => {
    const children = Array.from(document.body.children);

    const skipLinkIndex = children.findIndex(
      (el) => el.tagName.toLowerCase() === 'a' && el.getAttribute('href') === '#main-content'
    );
    const headerIndex = children.findIndex((el) => el.id === 'header-placeholder');
    const navIndex = children.findIndex((el) => el.id === 'nav-placeholder');
    const mainIndex = children.findIndex((el) => el.tagName.toLowerCase() === 'main');
    const tabBarIndex = children.findIndex((el) => el.classList.contains('tab-bar'));
    const footerIndex = children.findIndex((el) => el.id === 'footer-placeholder');

    expect(skipLinkIndex).toBeGreaterThanOrEqual(0);
    expect(headerIndex).toBeGreaterThanOrEqual(0);
    expect(navIndex).toBeGreaterThanOrEqual(0);
    expect(mainIndex).toBeGreaterThanOrEqual(0);
    expect(tabBarIndex).toBeGreaterThanOrEqual(0);
    expect(footerIndex).toBeGreaterThanOrEqual(0);

    expect(skipLinkIndex).toBeLessThan(headerIndex);
    expect(headerIndex).toBeLessThan(navIndex);
    expect(navIndex).toBeLessThan(mainIndex);
    expect(mainIndex).toBeLessThan(tabBarIndex);
    expect(tabBarIndex).toBeLessThan(footerIndex);
  });

  it('<main> tiene id="main-content" y aria-label="Pánico Disfórico — Serie"', () => {
    const main = document.querySelector('main');
    expect(main).not.toBeNull();
    expect(main.getAttribute('id')).toBe('main-content');
    expect(main.getAttribute('aria-label')).toBe('Pánico Disfórico — Serie');
  });

  it('existe exactamente un <h1> con texto "Pánico Disfórico"', () => {
    const h1Elements = document.querySelectorAll('h1');
    expect(h1Elements.length).toBe(1);
    expect(h1Elements[0].textContent.trim()).toBe('Pánico Disfórico');
  });

  it('.panico-disforico__label contiene texto "SERIE"', () => {
    const label = document.querySelector('.panico-disforico__label');
    expect(label).not.toBeNull();
    expect(label.textContent.trim()).toBe('SERIE');
  });

  it('.panico-disforico__description contiene la descripción completa de la serie', () => {
    const description = document.querySelector('.panico-disforico__description');
    expect(description).not.toBeNull();
    const expectedText = 'Una serie trans media que cuenta diversas historias de eventos relacionados con el mundo paranormal, mayormente inspirados en relatos reales. Explora diversos géneros desde el Terror, el Horror y el Suspenso, en formato de Comic Digital.';
    expect(description.textContent).toContain(expectedText);
  });

  it('.panico-disforico__hero tiene src con "contenidos/panico-disforico/hero.webp" y alt con longitud 10–125 caracteres', () => {
    const hero = document.querySelector('.panico-disforico__hero');
    expect(hero).not.toBeNull();
    expect(hero.getAttribute('src')).toContain('contenidos/panico-disforico/hero.webp');

    const alt = hero.getAttribute('alt');
    expect(alt).toBeTruthy();
    expect(alt.length).toBeGreaterThanOrEqual(10);
    expect(alt.length).toBeLessThanOrEqual(125);
  });

  it('.panico-disforico__cta tiene href="contenidos.html#panico-disforico" y texto "Más Contenido →"', () => {
    const cta = document.querySelector('.panico-disforico__cta');
    expect(cta).not.toBeNull();
    expect(cta.getAttribute('href')).toBe('contenidos.html#panico-disforico');
    expect(cta.textContent.trim()).toBe('Más Contenido →');
  });
});

/**
 * Task 4.3 — Placeholders y main.js
 * Validates: Requirements 2.1, 2.2, 2.3, 6.1
 */
describe('Placeholders y main.js', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    document.body.innerHTML = doc.body.innerHTML;
  });

  it('#header-placeholder existe en el DOM estático', () => {
    const headerPlaceholder = document.querySelector('#header-placeholder');
    expect(headerPlaceholder).not.toBeNull();
    expect(headerPlaceholder).toBeTruthy();
  });

  it('#nav-placeholder existe en el DOM estático', () => {
    const navPlaceholder = document.querySelector('#nav-placeholder');
    expect(navPlaceholder).not.toBeNull();
    expect(navPlaceholder).toBeTruthy();
  });

  it('#footer-placeholder existe en el DOM estático', () => {
    const footerPlaceholder = document.querySelector('#footer-placeholder');
    expect(footerPlaceholder).not.toBeNull();
    expect(footerPlaceholder).toBeTruthy();
  });

  it('<script type="module" src="../js/main.js"> está presente en el HTML', () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const script = doc.querySelector('script[type="module"][src="../js/main.js"]');
    expect(script).not.toBeNull();
    expect(script).toBeTruthy();
  });
});
