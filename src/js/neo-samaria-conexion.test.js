import { describe, it, expect, beforeEach } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load HTML file for testing
const htmlPath = resolve(__dirname, '../pages/neo-samaria-conexion.html');
const htmlContent = readFileSync(htmlPath, 'utf-8');

/**
 * Task 5.1 — Estructura DOM de la página Neo Samaria Conexión
 * Validates: Requirements 1.1, 4.1, 4.7, 5.1, 6.1, 6.4, 6.5, 8.1, 8.2, 8.3, 8.4, 8.9, 9.1, 9.3
 */
describe('Neo Samaria Conexión - Estructura DOM', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    // Parse the HTML and inject the body content
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    document.body.innerHTML = doc.body.innerHTML;
  });

  it('la página tiene un único elemento <h1> con texto "Neo Samaria Conexión"', () => {
    const h1Elements = document.querySelectorAll('h1');
    expect(h1Elements.length).toBe(1);
    
    const h1 = document.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent.trim()).toBe('Neo Samaria Conexión');
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

  it('<main> tiene clase "neo-samaria" y aria-label descriptivo', () => {
    const main = document.querySelector('main');
    expect(main).not.toBeNull();
    expect(main.classList.contains('neo-samaria')).toBe(true);
    
    const ariaLabel = main.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel.length).toBeGreaterThan(5);
  });

  it('existe <section> con aria-label para sinopsis', () => {
    const main = document.querySelector('main');
    const synopsisSection = main.querySelector('section.neo-samaria__synopsis');
    
    expect(synopsisSection).not.toBeNull();
    
    const ariaLabel = synopsisSection.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel.toLowerCase()).toContain('sinopsis');
  });

  it('existe <section> con aria-label para imágenes', () => {
    const main = document.querySelector('main');
    const imagesSection = main.querySelector('section.neo-samaria__images');
    
    expect(imagesSection).not.toBeNull();
    
    const ariaLabel = imagesSection.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel.toLowerCase()).toContain('imágenes');
  });

  it('existen dos elementos <img> dentro de la sección de imágenes', () => {
    const imagesSection = document.querySelector('.neo-samaria__images');
    expect(imagesSection).not.toBeNull();
    
    const images = imagesSection.querySelectorAll('img');
    expect(images.length).toBe(2);
  });

  it('cada imagen tiene atributo alt con longitud entre 10 y 125 caracteres', () => {
    const images = document.querySelectorAll('.neo-samaria__images img');
    expect(images.length).toBe(2);
    
    images.forEach((img, index) => {
      const alt = img.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt.length).toBeGreaterThanOrEqual(10);
      expect(alt.length).toBeLessThanOrEqual(125);
    });
  });

  it('ausencia de textos prohibidos en el contenido', () => {
    const fullText = document.body.textContent.toLowerCase();
    
    const forbiddenPhrases = [
      'en construcción',
      'under construction',
      'coming soon',
      'próximamente',
      'work in progress',
      'lorem ipsum',
      'placeholder'
    ];
    
    forbiddenPhrases.forEach(phrase => {
      expect(fullText).not.toContain(phrase);
    });
  });

  it('el <h1> es el primer elemento de contenido en <main>', () => {
    const main = document.querySelector('main');
    expect(main).not.toBeNull();
    
    // Get first child element (ignoring text nodes and comments)
    const firstElement = main.querySelector('*');
    expect(firstElement.tagName.toLowerCase()).toBe('h1');
  });

  it('la sección de sinopsis contiene el texto completo esperado', () => {
    const synopsisSection = document.querySelector('.neo-samaria__synopsis');
    expect(synopsisSection).not.toBeNull();
    
    const synopsisText = synopsisSection.textContent.trim();
    expect(synopsisText).toContain('En una época donde lo poco que queda de humanidad');
    expect(synopsisText).toContain('Neo Samaria');
    expect(synopsisText).toContain('LA ULTIMA CIUDAD DEL CARIBE COLOMBIANO');
  });

  it('las imágenes tienen rutas correctas hacia la carpeta neo-samaria', () => {
    const images = document.querySelectorAll('.neo-samaria__images img');
    expect(images.length).toBe(2);
    
    images.forEach(img => {
      const src = img.getAttribute('src');
      expect(src).toBeTruthy();
      expect(src).toContain('neo-samaria');
      expect(src).toContain('contenidos');
    });
  });

  it('cada imagen tiene un contenedor con clase neo-samaria__image-wrapper', () => {
    const wrappers = document.querySelectorAll('.neo-samaria__image-wrapper');
    expect(wrappers.length).toBe(2);
    
    wrappers.forEach(wrapper => {
      const img = wrapper.querySelector('img');
      expect(img).not.toBeNull();
    });
  });
});
