import { describe, it, expect, vi, afterEach } from 'vitest';
import fc from 'fast-check';
import {
  fetchFeaturedPosts,
  mapApiPostToBlogPost,
  isValidBlogResponse,
  DEFAULT_FIELD_MAP,
} from './blog-service.js';

/**
 * Generador de un string no vacío (con contenido tras trim), garantizando que
 * los campos requeridos sean válidos según hasRequiredFields del servicio.
 */
const nonEmptyStrArb = fc
  .string({ maxLength: 50 })
  .map((s) => `x${s}`);

/**
 * Generador de un objeto crudo de la API_Blog VÁLIDO.
 * Usa los nombres de campo esperados por DEFAULT_FIELD_MAP:
 *   title, featured_image, category, reading_time, excerpt, permalink.
 * Los campos requeridos (title, featured_image, category, permalink) son
 * siempre strings no vacíos para pasar la validación del servicio.
 */
const rawBlogPostArb = fc.record({
  [DEFAULT_FIELD_MAP.title]: nonEmptyStrArb,
  [DEFAULT_FIELD_MAP.imageUrl]: fc.webUrl(),
  [DEFAULT_FIELD_MAP.category]: fc.constantFrom(
    'CINE',
    'SERIE',
    'CÓMIC',
    'ANIMACIÓN',
    'DOCUMENTAL'
  ),
  [DEFAULT_FIELD_MAP.readingTime]: fc.option(fc.integer({ min: 1, max: 60 }), {
    nil: undefined,
  }),
  [DEFAULT_FIELD_MAP.description]: fc.option(fc.string({ maxLength: 200 }), {
    nil: undefined,
  }),
  [DEFAULT_FIELD_MAP.url]: fc.webUrl(),
});

/** Array de posts crudos válidos de longitud variable (N >= 0). */
const blogPostArrayArb = fc.array(rawBlogPostArb, {
  minLength: 0,
  maxLength: 10,
});

/**
 * Prepara un mock de global.fetch que devuelve `arr` como respuesta JSON exitosa.
 */
function mockFetchWith(arr) {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve(arr),
  });
}

describe('blog-service.js - Property tests', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Feature: home-featured-blog-cards, Property 1: Selection limits to first 2 posts in order
  // Validates: Requirements 1.3, 2.2, 2.5
  it('Property 1: selecciona los primeros min(N, 2) posts en orden original', async () => {
    await fc.assert(
      fc.asyncProperty(blogPostArrayArb, async (rawPosts) => {
        mockFetchWith(rawPosts);

        const apiUrl = 'https://blog.example.com/api/posts';

        if (rawPosts.length === 0) {
          // Contrato del servicio: una respuesta sin posts válidos lanza Error.
          await expect(fetchFeaturedPosts(apiUrl)).rejects.toThrow();
          return;
        }

        const result = await fetchFeaturedPosts(apiUrl);
        const expectedLength = Math.min(rawPosts.length, 2);

        // Longitud = min(N, 2)
        expect(result).toHaveLength(expectedLength);

        // Los primeros min(N, 2) elementos en su orden original.
        for (let i = 0; i < expectedLength; i += 1) {
          expect(result[i].title).toBe(rawPosts[i][DEFAULT_FIELD_MAP.title]);
          expect(result[i].url).toBe(rawPosts[i][DEFAULT_FIELD_MAP.url]);
          expect(result[i].category).toBe(
            rawPosts[i][DEFAULT_FIELD_MAP.category]
          );
          expect(result[i].imageUrl).toBe(
            rawPosts[i][DEFAULT_FIELD_MAP.imageUrl]
          );
        }
      }),
      { numRuns: 100 }
    );
  });

  // Feature: home-featured-blog-cards, Property 2: API-to-BlogPost mapping preserves all fields
  // Validates: Requirements 2.3
  it('Property 2: mapea cada campo al valor de origen sin pérdida ni mutación', () => {
    fc.assert(
      fc.property(rawBlogPostArb, (rawPost) => {
        // Snapshot para detectar cualquier mutación del objeto de origen.
        const snapshot = structuredClone(rawPost);

        const post = mapApiPostToBlogPost(rawPost);

        // Campos string requeridos: corresponden exactamente al valor mapeado.
        expect(post.title).toBe(rawPost[DEFAULT_FIELD_MAP.title]);
        expect(post.imageUrl).toBe(rawPost[DEFAULT_FIELD_MAP.imageUrl]);
        expect(post.category).toBe(rawPost[DEFAULT_FIELD_MAP.category]);
        expect(post.url).toBe(rawPost[DEFAULT_FIELD_MAP.url]);

        // imageAlt se deriva del título sin pérdida.
        expect(post.imageAlt).toBe(rawPost[DEFAULT_FIELD_MAP.title]);

        // readingTime: número finito preservado, cualquier otro valor -> null.
        const rawReadingTime = rawPost[DEFAULT_FIELD_MAP.readingTime];
        if (
          typeof rawReadingTime === 'number' &&
          Number.isFinite(rawReadingTime)
        ) {
          expect(post.readingTime).toBe(rawReadingTime);
        } else {
          expect(post.readingTime).toBeNull();
        }

        // description: string no vacío preservado, cualquier otro valor -> null.
        const rawDescription = rawPost[DEFAULT_FIELD_MAP.description];
        if (typeof rawDescription === 'string' && rawDescription.length > 0) {
          expect(post.description).toBe(rawDescription);
        } else {
          expect(post.description).toBeNull();
        }

        // El objeto de origen no debe mutar durante el mapeo.
        expect(rawPost).toEqual(snapshot);
      }),
      { numRuns: 100 }
    );
  });

  // Feature: home-featured-blog-cards, Property 5: Validation rejects invalid blog responses
  // Validates: Requirements 5.3
  it('Property 5: isValidBlogResponse retorna false para cualquier valor inválido', () => {
    // Réplica independiente del criterio de validez del servicio, para no usar
    // la función bajo prueba dentro del filtro del generador.
    const requiredSourceKeys = [
      DEFAULT_FIELD_MAP.title,
      DEFAULT_FIELD_MAP.imageUrl,
      DEFAULT_FIELD_MAP.category,
      DEFAULT_FIELD_MAP.url,
    ];

    function itemHasRequiredFields(item) {
      if (typeof item !== 'object' || item === null || Array.isArray(item)) {
        return false;
      }
      return requiredSourceKeys.every((key) => {
        const value = item[key];
        return typeof value === 'string' && value.trim().length > 0;
      });
    }

    // Un valor es inválido si NO es un array, o es un array sin ningún objeto
    // que contenga todos los campos requeridos como strings no vacíos.
    function isInvalidResponse(data) {
      if (!Array.isArray(data)) return true;
      return !data.some(itemHasRequiredFields);
    }

    fc.assert(
      fc.property(
        fc.anything().filter(isInvalidResponse),
        (invalidValue) => {
          expect(isValidBlogResponse(invalidValue)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('blog-service.js - Error handling (unit tests)', () => {
  const API_URL = 'https://blog.example.com/api/posts';

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Validates: Requirements 5.1, 5.5
  it('lanza Error cuando fetch es rechazado por un error de red', async () => {
    global.fetch = vi
      .fn()
      .mockRejectedValue(new TypeError('Failed to fetch'));

    await expect(fetchFeaturedPosts(API_URL)).rejects.toThrow(Error);
    await expect(fetchFeaturedPosts(API_URL)).rejects.toThrow(/Error de red/);
    await expect(fetchFeaturedPosts(API_URL)).rejects.toThrow(API_URL);
  });

  // Validates: Requirements 5.2, 5.5
  it('lanza Error cuando se excede el timeout (AbortController aborta la petición)', async () => {
    // fetch nunca resuelve por sí mismo: solo rechaza cuando la señal se aborta,
    // reproduciendo el comportamiento real de un timeout vía AbortController.
    global.fetch = vi.fn((url, opts) => {
      return new Promise((_resolve, reject) => {
        opts.signal.addEventListener('abort', () => {
          const abortError = new Error('The operation was aborted');
          abortError.name = 'AbortError';
          reject(abortError);
        });
      });
    });

    // Timeout muy corto para que el setTimeout interno dispare el abort.
    const promise = fetchFeaturedPosts(API_URL, { timeout: 10 });

    await expect(promise).rejects.toThrow(/Timeout de 10ms/);
  });

  // Validates: Requirements 5.1, 5.5
  it('lanza Error con el status cuando la respuesta HTTP es >= 400', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      json: () => Promise.resolve([]),
    });

    await expect(fetchFeaturedPosts(API_URL)).rejects.toThrow(/404/);
    await expect(fetchFeaturedPosts(API_URL)).rejects.toThrow(/Not Found/);
    await expect(fetchFeaturedPosts(API_URL)).rejects.toThrow(API_URL);
  });

  // Validates: Requirements 5.1, 5.5
  it('lanza Error cuando la respuesta no es JSON válido', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () => Promise.reject(new SyntaxError('Unexpected token < in JSON')),
    });

    await expect(fetchFeaturedPosts(API_URL)).rejects.toThrow(
      /no es JSON válido/
    );
    await expect(fetchFeaturedPosts(API_URL)).rejects.toThrow(API_URL);
  });

  // Validates: Requirements 5.3, 5.5
  it('lanza Error cuando el JSON es válido pero no contiene posts válidos', async () => {
    // Array con un objeto que carece de los campos requeridos -> no válido.
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () => Promise.resolve([{ foo: 'bar' }]),
    });

    await expect(fetchFeaturedPosts(API_URL)).rejects.toThrow(
      /no devolvió ninguna entrada válida/
    );
    await expect(fetchFeaturedPosts(API_URL)).rejects.toThrow(API_URL);
  });

  // Validates: Requirements 5.5
  it('el mensaje de error siempre incluye la URL solicitada', async () => {
    const customUrl = 'https://otra-api.example.org/v2/entradas';
    global.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

    await expect(fetchFeaturedPosts(customUrl)).rejects.toThrow(customUrl);
  });
});
