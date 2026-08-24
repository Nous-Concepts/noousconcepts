/**
 * Featured cards module for NOUS CONCEPTS website.
 * Handles rendering of the "Estrenos Destacados" section: loading state,
 * error state, individual cards, and orchestration of the fetch/render flow.
 * Data logic lives in ./blog-service.js — this module owns the DOM/HTML.
 */

import { fetchFeaturedPosts } from './blog-service.js';

/** Default CSS selector for the cards container. */
const DEFAULT_CONTAINER_SELECTOR = '.featured__cards';

/** Default number of cards / skeleton placeholders to show. */
const DEFAULT_MAX_POSTS = 2;

/**
 * Escapes a string for safe interpolation into HTML text content and quoted
 * attribute values. External API data must never be injected raw.
 * @param {unknown} value - Value to escape (coerced to string)
 * @returns {string} HTML-escaped string
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
 * Generates the HTML for the loading state (skeleton placeholders).
 * The container is announced politely to assistive technologies.
 * @param {number} [count=2] - Number of skeleton placeholders to generate
 * @returns {string} HTML string
 */
export function renderLoadingState(count = DEFAULT_MAX_POSTS) {
  const safeCount = Number.isInteger(count) && count > 0 ? count : DEFAULT_MAX_POSTS;

  const skeletons = Array.from({ length: safeCount })
    .map(function () {
      return (
        '<div class="featured__skeleton" aria-hidden="true">' +
        '<div class="featured__skeleton-image"></div>' +
        '<div class="featured__skeleton-line featured__skeleton-line--short"></div>' +
        '<div class="featured__skeleton-line"></div>' +
        '<div class="featured__skeleton-line featured__skeleton-line--long"></div>' +
        '</div>'
      );
    })
    .join('');

  return (
    '<div class="featured__loading" aria-live="polite">' +
    '<span class="featured__loading-text">Cargando estrenos destacados…</span>' +
    skeletons +
    '</div>'
  );
}

/**
 * Generates the HTML for the error state.
 * Uses role="status" so assistive technologies announce the message.
 * @returns {string} HTML string
 */
export function renderErrorState() {
  return (
    '<div class="featured__error" role="status">' +
    '<p class="featured__error-message">No se pudieron cargar los estrenos destacados.</p>' +
    '</div>'
  );
}

/**
 * Generates the HTML for a single featured card from a BlogPost.
 * Optional fields (readingTime, description) are omitted when null so no empty
 * elements or placeholders are rendered. The link's accessible name includes
 * the post title.
 * @param {import('./blog-service.js').BlogPost} post - Normalized blog post
 * @returns {string} HTML string of the card
 */
export function renderCard(post) {
  const title = escapeHtml(post.title);
  const imageUrl = escapeHtml(post.imageUrl);
  const imageAlt = escapeHtml(post.imageAlt != null ? post.imageAlt : post.title);
  const category = escapeHtml(post.category);
  const url = escapeHtml(post.url);

  const readingTimeHtml =
    post.readingTime != null
      ? '<span class="featured-card__reading-time">' +
        escapeHtml(post.readingTime) +
        ' min de lectura</span>'
      : '';

  const descriptionHtml =
    post.description != null
      ? '<p class="featured-card__description">' + escapeHtml(post.description) + '</p>'
      : '';

  return (
    '<article class="featured-card">' +
    '<img class="featured-card__image" src="' +
    imageUrl +
    '" alt="' +
    imageAlt +
    '" loading="lazy" />' +
    '<div class="featured-card__body">' +
    '<span class="featured-card__category">' +
    category +
    '</span>' +
    readingTimeHtml +
    '<h3 class="featured-card__heading">' +
    title +
    '</h3>' +
    descriptionHtml +
    '<a class="featured-card__link" href="' +
    url +
    '" aria-label="Leer el artículo: ' +
    title +
    '">Leer más</a>' +
    '</div>' +
    '</article>'
  );
}

/**
 * Initializes the featured cards section: shows the loading state, fetches the
 * blog posts, and renders the cards on success or the error state on failure.
 * Any exception is caught and logged with console.error (including the URL);
 * no exception propagates to the global scope.
 * @param {Object} [config] - Optional configuration
 * @param {string} [config.apiUrl] - Blog API URL
 * @param {string} [config.containerSelector='.featured__cards'] - Cards container selector
 * @param {number} [config.maxPosts=2] - Maximum number of posts to render
 * @param {number} [config.timeout] - Request timeout in ms (passed to the service)
 * @returns {Promise<void>}
 */
export async function initFeaturedCards(config = {}) {
  const containerSelector = config.containerSelector || DEFAULT_CONTAINER_SELECTOR;
  const maxPosts = config.maxPosts != null ? config.maxPosts : DEFAULT_MAX_POSTS;
  const apiUrl = config.apiUrl;

  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error(
      `initFeaturedCards: no se encontró el contenedor para el selector "${containerSelector}"`
    );
    return;
  }

  // 1. Show loading state.
  container.innerHTML = renderLoadingState(maxPosts);

  // 2. Fetch data and render cards or error state.
  try {
    const posts = await fetchFeaturedPosts(apiUrl, {
      maxPosts: maxPosts,
      timeout: config.timeout,
    });

    container.innerHTML = posts
      .map(function (post) {
        return renderCard(post);
      })
      .join('');
  } catch (error) {
    console.error(
      `initFeaturedCards: error al cargar los estrenos destacados desde ${apiUrl}:`,
      error
    );
    container.innerHTML = renderErrorState();
  }
}
