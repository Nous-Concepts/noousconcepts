import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import fc from 'fast-check';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import {
  renderCard,
  renderLoadingState,
  renderErrorState,
  initFeaturedCards,
} from './featured-cards.js';

/**
 * Feature: home-featured-blog-cards, Property 3: Rendered card contains all present BlogPost fields
 * Validates: Requirements 2.4, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
 *
 * Para cualquier BlogPost válido, renderCard produce HTML que contiene:
 * imageUrl como img src, título como alt, categoría, título como heading,
 * url como href, y (si no son null) readingTime formateado como
 * "{n} min de lectura" y la descripción.
 */

/**
 * Réplica del escapado que aplica renderCard (escapeHtml en featured-cards.js).
 * Necesaria para comparar contra la salida cruda sin depender de la
 * normalización del parser HTML (saltos de línea, caracteres de control, etc.).
 */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Generador de un BlogPost válido (design.md → Testing Strategy).
 * imageAlt se deriva del título, conforme al modelo de datos (imageAlt = título)
 * y a mapApiPostToBlogPost, de modo que el atributo alt corresponde al título.
 */
const blogPostArb = fc
  .record({
    title: fc.string({ minLength: 1, maxLength: 200 }),
    imageUrl: fc.webUrl(),
    category: fc.stringOf(
      fc.constantFrom('CINE', 'SERIE', 'CÓMIC', 'ANIMACIÓN', 'DOCUMENTAL')
    ),
    readingTime: fc.option(fc.integer({ min: 1, max: 60 }), { nil: null }),
    description: fc.option(fc.string({ minLength: 1, maxLength: 500 }), {
      nil: null,
    }),
    url: fc.webUrl(),
  })
  .map((post) => ({ ...post, imageAlt: post.title }));

describe('featured-cards.js - Property tests', () => {
  // Feature: home-featured-blog-cards, Property 3: Rendered card contains all present BlogPost fields
  // Validates: Requirements 2.4, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
  it('Property 3: la tarjeta renderizada contiene todos los campos presentes del BlogPost', () => {
    fc.assert(
      fc.property(blogPostArb, (post) => {
        const html = renderCard(post);

        // imageUrl como src del <img> (Req 3.1).
        expect(html).toContain('src="' + escapeHtml(post.imageUrl) + '"');

        // título como atributo alt del <img> (Req 3.1).
        expect(html).toContain('alt="' + escapeHtml(post.title) + '"');

        // categoría como etiqueta de categoría (Req 3.2).
        expect(html).toContain(
          '<span class="featured-card__category">' +
            escapeHtml(post.category) +
            '</span>'
        );

        // título como encabezado de la tarjeta (Req 3.4).
        expect(html).toContain(
          '<h3 class="featured-card__heading">' +
            escapeHtml(post.title) +
            '</h3>'
        );

        // url como href del enlace navegable (Req 3.6).
        expect(html).toContain('href="' + escapeHtml(post.url) + '"');

        // readingTime (si no es null) con formato "{n} min de lectura" (Req 3.3).
        if (post.readingTime != null) {
          expect(html).toContain(
            '<span class="featured-card__reading-time">' +
              escapeHtml(post.readingTime) +
              ' min de lectura</span>'
          );
        }

        // descripción (si no es null) como texto de extracto (Req 3.5).
        if (post.description != null) {
          expect(html).toContain(
            '<p class="featured-card__description">' +
              escapeHtml(post.description) +
              '</p>'
          );
        }
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * Feature: home-featured-blog-cards, Property 4: Optional fields absent when null produce no empty elements
 * Validates: Requirements 3.7
 *
 * Para cualquier BlogPost con readingTime=null, renderCard produce HTML que no
 * contiene un elemento reading-time (.featured-card__reading-time). Del mismo
 * modo, con description=null, no contiene un elemento description
 * (.featured-card__description). No se renderizan elementos ni marcadores vacíos.
 */

/** BlogPost con readingTime forzado a null (resto de campos válidos). */
const blogPostNoReadingTimeArb = fc
  .record({
    title: fc.string({ minLength: 1, maxLength: 200 }),
    imageUrl: fc.webUrl(),
    category: fc.stringOf(
      fc.constantFrom('CINE', 'SERIE', 'CÓMIC', 'ANIMACIÓN', 'DOCUMENTAL')
    ),
    description: fc.option(fc.string({ minLength: 1, maxLength: 500 }), {
      nil: null,
    }),
    url: fc.webUrl(),
  })
  .map((post) => ({ ...post, readingTime: null, imageAlt: post.title }));

/** BlogPost con description forzada a null (resto de campos válidos). */
const blogPostNoDescriptionArb = fc
  .record({
    title: fc.string({ minLength: 1, maxLength: 200 }),
    imageUrl: fc.webUrl(),
    category: fc.stringOf(
      fc.constantFrom('CINE', 'SERIE', 'CÓMIC', 'ANIMACIÓN', 'DOCUMENTAL')
    ),
    readingTime: fc.option(fc.integer({ min: 1, max: 60 }), { nil: null }),
    url: fc.webUrl(),
  })
  .map((post) => ({ ...post, description: null, imageAlt: post.title }));

describe('featured-cards.js - Property 4: campos opcionales ausentes cuando son null', () => {
  // Feature: home-featured-blog-cards, Property 4: Optional fields absent when null produce no empty elements
  // Validates: Requirements 3.7
  it('Property 4a: con readingTime=null no se renderiza el elemento reading-time', () => {
    fc.assert(
      fc.property(blogPostNoReadingTimeArb, (post) => {
        const html = renderCard(post);
        expect(html).not.toContain('featured-card__reading-time');
      }),
      { numRuns: 100 }
    );
  });

  // Feature: home-featured-blog-cards, Property 4: Optional fields absent when null produce no empty elements
  // Validates: Requirements 3.7
  it('Property 4b: con description=null no se renderiza el elemento description', () => {
    fc.assert(
      fc.property(blogPostNoDescriptionArb, (post) => {
        const html = renderCard(post);
        expect(html).not.toContain('featured-card__description');
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * Task 5.2 — Accesibilidad de navegación por teclado en Seccion_Destacados
 * Validates: Requirements 9.1, 9.3, 9.4
 *
 * Estos tests verifican que:
 * - Los enlaces de las tarjetas son elementos <a> nativos (alcanzables con Tab
 *   en orden lógico del DOM y activables con Enter de forma nativa) — Req 9.1, 9.4.
 * - Existen indicadores de foco visibles (outline 2px sólido en --color-accent,
 *   offset 2px) para todos los elementos interactivos de la sección — Req 9.3.
 */

/** BlogPost de ejemplo con todos los campos presentes. */
function makePost(overrides = {}) {
  return {
    title: 'Título de prueba',
    imageUrl: 'https://example.com/img.jpg',
    imageAlt: 'Alt de prueba',
    category: 'CINE',
    readingTime: 5,
    description: 'Descripción de prueba',
    url: 'https://example.com/articulo',
    ...overrides,
  };
}

describe('Task 5.2 — Navegación por teclado de las Tarjeta_Destacada', () => {
  describe('Enlaces como anclas nativas (Req 9.1, 9.4)', () => {
    it('el enlace de la tarjeta es un elemento <a> nativo con href', () => {
      const container = document.createElement('div');
      container.innerHTML = renderCard(makePost({ url: 'https://example.com/post-1' }));

      const link = container.querySelector('.featured-card__link');
      expect(link).not.toBeNull();
      expect(link.tagName).toBe('A');
      // Un <a> con href es alcanzable con Tab y activable con Enter de forma nativa.
      expect(link.getAttribute('href')).toBe('https://example.com/post-1');
    });

    it('el enlace no está fuera del orden de tabulación (sin tabindex negativo)', () => {
      const container = document.createElement('div');
      container.innerHTML = renderCard(makePost());

      const link = container.querySelector('.featured-card__link');
      const tabindex = link.getAttribute('tabindex');
      // null (por defecto, tabulable) o >= 0. Nunca negativo.
      if (tabindex !== null) {
        expect(Number(tabindex)).toBeGreaterThanOrEqual(0);
      }
      expect(tabindex).not.toBe('-1');
    });

    it('el nombre accesible del enlace incluye el título de la entrada (Req 9.2 relacionado)', () => {
      const post = makePost({ title: 'Estreno especial' });
      const container = document.createElement('div');
      container.innerHTML = renderCard(post);

      const link = container.querySelector('.featured-card__link');
      const accessibleName =
        (link.getAttribute('aria-label') || '') + ' ' + (link.textContent || '');
      expect(accessibleName).toContain('Estreno especial');
    });

    it('con múltiples tarjetas los enlaces aparecen en orden lógico del DOM (Req 9.1)', () => {
      const posts = [
        makePost({ title: 'Primero', url: 'https://example.com/1' }),
        makePost({ title: 'Segundo', url: 'https://example.com/2' }),
      ];
      const container = document.createElement('div');
      container.innerHTML = posts.map(renderCard).join('');

      const links = Array.from(container.querySelectorAll('.featured-card__link'));
      expect(links).toHaveLength(2);
      // El orden de los enlaces en el DOM sigue el orden visual de las tarjetas.
      expect(links[0].getAttribute('href')).toBe('https://example.com/1');
      expect(links[1].getAttribute('href')).toBe('https://example.com/2');
      // Todos son anclas nativas.
      links.forEach((link) => expect(link.tagName).toBe('A'));
    });
  });

  describe('Indicadores de foco visibles en elementos interactivos (Req 9.3)', () => {
    const cssPath = resolve(__dirname, '../styles/featured-cards.css');
    const css = readFileSync(cssPath, 'utf-8');

    it('el enlace de la tarjeta define un outline de foco visible', () => {
      const focusPattern =
        /\.featured-card__link:focus-visible\s*\{[^}]*outline:\s*2px\s+solid\s+var\(--color-accent\)[^}]*\}/s;
      expect(focusPattern.test(css)).toBe(true);
    });

    it('el enlace de la tarjeta define un outline-offset de 2px en foco', () => {
      const offsetPattern =
        /\.featured-card__link:focus-visible\s*\{[^}]*outline-offset:\s*2px[^}]*\}/s;
      expect(offsetPattern.test(css)).toBe(true);
    });

    it('el Boton_Mas_Contenido (CTA) define un outline de foco visible', () => {
      const focusPattern =
        /\.featured__cta:focus-visible\s*\{[^}]*outline:\s*2px\s+solid\s+var\(--color-accent\)[^}]*\}/s;
      expect(focusPattern.test(css)).toBe(true);
    });

    it('el Boton_Mas_Contenido (CTA) define un outline-offset de 2px en foco', () => {
      const offsetPattern =
        /\.featured__cta:focus-visible\s*\{[^}]*outline-offset:\s*2px[^}]*\}/s;
      expect(offsetPattern.test(css)).toBe(true);
    });
  });

  describe('El Boton_Mas_Contenido es un enlace nativo (Req 9.1, 9.4)', () => {
    it('la sección estática expone el CTA como <a> con href a contenidos.html', () => {
      const htmlPath = resolve(__dirname, '../pages/home.html');
      const html = readFileSync(htmlPath, 'utf-8');
      document.documentElement.innerHTML = html;

      const cta = document.querySelector('.featured__cta');
      expect(cta).not.toBeNull();
      expect(cta.tagName).toBe('A');
      expect(cta.getAttribute('href')).toBe('contenidos.html');
      // No debe quedar fuera del orden de tabulación.
      expect(cta.getAttribute('tabindex')).not.toBe('-1');
    });
  });
});

/**
 * Feature: home-featured-blog-cards, Property 6: Card link accessible name includes post title
 * Validates: Requirements 9.2, 9.5
 *
 * Para cualquier BlogPost válido, renderCard produce HTML cuyo enlace navegable
 * (.featured-card__link) tiene un nombre accesible —vía aria-label o contenido
 * de texto— que incluye el título del post. Además, la imagen de la tarjeta
 * incluye un atributo alt no vacío (WCAG 2.1 nivel A).
 */

/**
 * Generador de un BlogPost válido (design.md → Testing Strategy).
 * imageAlt se deriva del título, conforme al modelo de datos (imageAlt = título),
 * garantizando así un alt no vacío para títulos no vacíos.
 */
const blogPostAccessibleArb = fc
  .record({
    title: fc.string({ minLength: 1, maxLength: 200 }),
    imageUrl: fc.webUrl(),
    category: fc.stringOf(
      fc.constantFrom('CINE', 'SERIE', 'CÓMIC', 'ANIMACIÓN', 'DOCUMENTAL')
    ),
    readingTime: fc.option(fc.integer({ min: 1, max: 60 }), { nil: null }),
    description: fc.option(fc.string({ minLength: 1, maxLength: 500 }), {
      nil: null,
    }),
    url: fc.webUrl(),
  })
  .map((post) => ({ ...post, imageAlt: post.title }));

/**
 * Calcula el nombre accesible de un elemento de enlace siguiendo la precedencia
 * de ARIA: si existe un aria-label no vacío, ese es el nombre accesible; en
 * caso contrario, se usa el contenido de texto del elemento.
 * @param {Element} el - Elemento enlace
 * @returns {string} Nombre accesible
 */
function accessibleName(el) {
  const ariaLabel = el.getAttribute('aria-label');
  if (ariaLabel != null && ariaLabel.trim() !== '') {
    return ariaLabel;
  }
  return el.textContent || '';
}

/**
 * El parser HTML normaliza los retornos de carro (CR y CRLF) a saltos de línea
 * (LF) tanto en texto como en valores de atributo. Aplicamos la misma
 * normalización al título esperado para comparar contra el valor ya parseado.
 * @param {string} value
 * @returns {string}
 */
function normalizeNewlines(value) {
  return String(value).replace(/\r\n?/g, '\n');
}

describe('featured-cards.js - Property 6: nombre accesible del enlace incluye el título', () => {
  // Feature: home-featured-blog-cards, Property 6: Card link accessible name includes post title
  // Validates: Requirements 9.2, 9.5
  it('Property 6: el nombre accesible del enlace de la tarjeta incluye el título del post', () => {
    fc.assert(
      fc.property(blogPostAccessibleArb, (post) => {
        const container = document.createElement('div');
        container.innerHTML = renderCard(post);

        const link = container.querySelector('.featured-card__link');
        expect(link).not.toBeNull();

        // El nombre accesible (aria-label o texto) incluye el título (Req 9.2).
        const name = normalizeNewlines(accessibleName(link));
        expect(name).toContain(normalizeNewlines(post.title));

        // La imagen tiene un alt no vacío (Req 9.5, WCAG 2.1 nivel A).
        const img = container.querySelector('.featured-card__image');
        expect(img).not.toBeNull();
        const alt = img.getAttribute('alt');
        expect(alt).not.toBeNull();
        expect(alt.length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * Task 2.5 — Unit tests para estados de carga y error en featured-cards.js
 * Validates: Requirements 4.1, 4.2, 4.3, 5.1, 5.4, 5.5
 *
 * Cubren:
 * - renderLoadingState: HTML con clase featured__loading y aria-live="polite".
 * - renderErrorState: HTML con clase featured__error y mensaje informativo.
 * - initFeaturedCards: muestra loading mientras el fetch está en curso,
 *   reemplaza loading por tarjetas en éxito, muestra el estado de error cuando
 *   el fetch falla, y loguea el error en consola incluyendo la URL solicitada.
 */

const API_URL = 'https://blog.example.com/api/posts';

/**
 * Objeto crudo de la API_Blog válido, usando los nombres de campo esperados por
 * DEFAULT_FIELD_MAP (title, featured_image, category, reading_time, excerpt,
 * permalink), de modo que fetchFeaturedPosts lo considere una entrada válida.
 */
function makeRawPost(overrides = {}) {
  return {
    title: 'Estreno de prueba',
    featured_image: 'https://example.com/img.jpg',
    category: 'CINE',
    reading_time: 5,
    excerpt: 'Descripción de prueba',
    permalink: 'https://example.com/articulo',
    ...overrides,
  };
}

describe('featured-cards.js - renderLoadingState (Req 4.3)', () => {
  it('genera HTML con la clase featured__loading', () => {
    const html = renderLoadingState();
    expect(html).toContain('class="featured__loading"');
  });

  it('incluye el atributo aria-live="polite"', () => {
    const html = renderLoadingState();
    expect(html).toContain('aria-live="polite"');
  });
});

describe('featured-cards.js - renderErrorState (Req 5.1, 5.4)', () => {
  it('genera HTML con la clase featured__error', () => {
    const html = renderErrorState();
    expect(html).toContain('class="featured__error"');
  });

  it('incluye un mensaje informativo no vacío para el usuario', () => {
    const container = document.createElement('div');
    container.innerHTML = renderErrorState();

    const message = container.querySelector('.featured__error-message');
    expect(message).not.toBeNull();
    expect(message.textContent.trim().length).toBeGreaterThan(0);
    expect(message.textContent).toContain('No se pudieron cargar');
  });
});

describe('featured-cards.js - initFeaturedCards (Req 4.1, 4.2, 5.1, 5.5)', () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '<div class="featured__cards"></div>';
    container = document.querySelector('.featured__cards');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  // Validates: Requirements 4.1
  it('muestra el estado de carga mientras el fetch está en curso', async () => {
    // fetch devuelve una promesa aún no resuelta para simular una petición en
    // curso; el estado de carga debe estar presente antes de que resuelva.
    let resolveFetch;
    const pending = new Promise((resolve) => {
      resolveFetch = resolve;
    });
    global.fetch = vi.fn().mockReturnValue(pending);

    const initPromise = initFeaturedCards({
      apiUrl: API_URL,
      containerSelector: '.featured__cards',
    });

    // Antes de resolver: el contenedor muestra el estado de carga.
    expect(container.innerHTML).toContain('featured__loading');
    expect(container.innerHTML).toContain('aria-live="polite"');

    // Resolver el fetch para completar el flujo sin dejar promesas colgadas.
    resolveFetch({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () => Promise.resolve([makeRawPost()]),
    });
    await initPromise;
  });

  // Validates: Requirements 4.2
  it('reemplaza el estado de carga por las tarjetas renderizadas en éxito', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () =>
        Promise.resolve([
          makeRawPost({ title: 'Primero', permalink: 'https://example.com/1' }),
          makeRawPost({ title: 'Segundo', permalink: 'https://example.com/2' }),
        ]),
    });

    await initFeaturedCards({
      apiUrl: API_URL,
      containerSelector: '.featured__cards',
    });

    // El estado de carga ya no está presente.
    expect(container.innerHTML).not.toContain('featured__loading');

    // Se renderizan las tarjetas con los datos del blog.
    const cards = container.querySelectorAll('.featured-card');
    expect(cards).toHaveLength(2);
    expect(container.innerHTML).toContain('Primero');
    expect(container.innerHTML).toContain('Segundo');
  });

  // Validates: Requirements 5.1, 5.4
  it('muestra el estado de error cuando el fetch falla', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

    await initFeaturedCards({
      apiUrl: API_URL,
      containerSelector: '.featured__cards',
    });

    // El estado de carga se reemplaza por el estado de error.
    expect(container.innerHTML).not.toContain('featured__loading');
    expect(container.innerHTML).toContain('featured__error');
    // No se renderiza ninguna tarjeta.
    expect(container.querySelectorAll('.featured-card')).toHaveLength(0);
  });

  // Validates: Requirements 5.5
  it('loguea el error en consola incluyendo la URL solicitada', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

    await initFeaturedCards({
      apiUrl: API_URL,
      containerSelector: '.featured__cards',
    });

    expect(errorSpy).toHaveBeenCalled();
    // Al menos una llamada a console.error incluye la URL solicitada.
    const loggedWithUrl = errorSpy.mock.calls.some((args) =>
      args.some((arg) => typeof arg === 'string' && arg.includes(API_URL))
    );
    expect(loggedWithUrl).toBe(true);
  });
});
