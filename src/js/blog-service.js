/**
 * Blog service module for NOUS CONCEPTS website.
 * Encapsulates fetching, validating, and transforming blog posts from the
 * corporate blog API into the internal BlogPost format used by the featured
 * cards section. Pure data logic — no DOM access.
 */

/**
 * @typedef {Object} BlogPost
 * @property {string} title - Título de la entrada
 * @property {string} imageUrl - URL de la imagen destacada
 * @property {string} imageAlt - Texto alternativo (derivado del título)
 * @property {string} category - Categoría (ej: "CINE", "SERIE")
 * @property {number|null} readingTime - Minutos de lectura (null si ausente)
 * @property {string|null} description - Extracto/descripción (null si ausente)
 * @property {string} url - URL al artículo completo
 */

/**
 * Default mapping between BlogPost fields and the raw API field names.
 * Configurable to adapt to the real API without changing the mapping logic.
 * @type {Record<string, string>}
 */
export const DEFAULT_FIELD_MAP = {
  title: 'title',
  imageUrl: 'featured_image',
  category: 'category',
  readingTime: 'reading_time',
  description: 'excerpt',
  url: 'permalink',
};

/** Default maximum number of posts returned by fetchFeaturedPosts. */
const DEFAULT_MAX_POSTS = 2;

/** Default request timeout in milliseconds. */
const DEFAULT_TIMEOUT = 8000;

/**
 * Fields that must be present (and non-empty strings) for a raw post to be
 * considered valid. These map to the required BlogPost fields.
 */
const REQUIRED_SOURCE_FIELDS = ['title', 'imageUrl', 'category', 'url'];

/**
 * Determines whether a value is a plain object (not null, not an array).
 * @param {unknown} value
 * @returns {boolean}
 */
function isPlainObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Checks whether a single raw post object contains all required fields as
 * non-empty strings, using the provided field map.
 * @param {unknown} rawPost - Candidate raw post object
 * @param {Record<string, string>} [fieldMap=DEFAULT_FIELD_MAP] - Field mapping
 * @returns {boolean}
 */
function hasRequiredFields(rawPost, fieldMap = DEFAULT_FIELD_MAP) {
  if (!isPlainObject(rawPost)) return false;

  return REQUIRED_SOURCE_FIELDS.every(function (field) {
    const sourceKey = fieldMap[field];
    const value = rawPost[sourceKey];
    return typeof value === 'string' && value.trim().length > 0;
  });
}

/**
 * Validates that a parsed JSON response is an array containing at least one
 * object with the required BlogPost fields.
 * @param {unknown} data - Respuesta parseada del JSON
 * @param {Record<string, string>} [fieldMap=DEFAULT_FIELD_MAP] - Field mapping
 * @returns {boolean}
 */
export function isValidBlogResponse(data, fieldMap = DEFAULT_FIELD_MAP) {
  if (!Array.isArray(data)) return false;

  return data.some(function (item) {
    return hasRequiredFields(item, fieldMap);
  });
}

/**
 * Transforms a raw API post object into a normalized BlogPost.
 * Optional fields (readingTime, description) default to null when absent or
 * of an unexpected type. imageAlt is derived from the title.
 * @param {Object} rawPost - Objeto crudo de la API
 * @param {Record<string, string>} [fieldMap=DEFAULT_FIELD_MAP] - Field mapping
 * @returns {BlogPost} Post normalizado
 */
export function mapApiPostToBlogPost(rawPost, fieldMap = DEFAULT_FIELD_MAP) {
  const source = isPlainObject(rawPost) ? rawPost : {};

  const title = source[fieldMap.title];
  const rawReadingTime = source[fieldMap.readingTime];
  const rawDescription = source[fieldMap.description];

  const readingTime =
    typeof rawReadingTime === 'number' && Number.isFinite(rawReadingTime)
      ? rawReadingTime
      : null;

  const description =
    typeof rawDescription === 'string' && rawDescription.length > 0
      ? rawDescription
      : null;

  return {
    title: title,
    imageUrl: source[fieldMap.imageUrl],
    imageAlt: title,
    category: source[fieldMap.category],
    readingTime: readingTime,
    description: description,
    url: source[fieldMap.url],
  };
}

/**
 * Requests featured blog posts from the corporate blog API.
 * Performs an HTTP GET with an AbortController-based timeout, validates the
 * response, and returns up to `maxPosts` transformed BlogPosts in original
 * order.
 * @param {string} apiUrl - URL de la API del blog
 * @param {Object} [options] - Opciones de configuración
 * @param {number} [options.maxPosts=2] - Número máximo de posts a devolver
 * @param {number} [options.timeout=8000] - Timeout en ms
 * @param {Record<string, string>} [options.fieldMap=DEFAULT_FIELD_MAP] - Field mapping
 * @returns {Promise<BlogPost[]>} Array de 0-maxPosts posts transformados
 * @throws {Error} Si la petición falla, timeout, HTTP no exitoso, JSON inválido
 *   o respuesta sin posts válidos. El mensaje incluye la URL solicitada.
 */
export async function fetchFeaturedPosts(apiUrl, options = {}) {
  const maxPosts = options.maxPosts != null ? options.maxPosts : DEFAULT_MAX_POSTS;
  const timeout = options.timeout != null ? options.timeout : DEFAULT_TIMEOUT;
  const fieldMap = options.fieldMap || DEFAULT_FIELD_MAP;

  const controller = new AbortController();
  const timeoutId = setTimeout(function () {
    controller.abort();
  }, timeout);

  let response;
  try {
    response = await fetch(apiUrl, {
      method: 'GET',
      signal: controller.signal,
    });
  } catch (error) {
    clearTimeout(timeoutId);
    if (error && error.name === 'AbortError') {
      throw new Error(
        `Timeout de ${timeout}ms al solicitar las entradas del blog desde ${apiUrl}`
      );
    }
    throw new Error(
      `Error de red al solicitar las entradas del blog desde ${apiUrl}: ${error && error.message}`
    );
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    throw new Error(
      `La API del blog respondió con un estado no exitoso ${response.status} ${response.statusText} desde ${apiUrl}`
    );
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error(
      `La respuesta de la API del blog no es JSON válido desde ${apiUrl}: ${error && error.message}`
    );
  }

  if (!isValidBlogResponse(data, fieldMap)) {
    throw new Error(
      `La API del blog no devolvió ninguna entrada válida desde ${apiUrl}`
    );
  }

  return data
    .filter(function (item) {
      return hasRequiredFields(item, fieldMap);
    })
    .slice(0, maxPosts)
    .map(function (item) {
      return mapApiPostToBlogPost(item, fieldMap);
    });
}
