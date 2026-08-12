import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { loadComponent, initPage } from './main.js';

describe('main.js - Component Loader', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('loadComponent', () => {
    it('should load HTML content into the target element', async () => {
      document.body.innerHTML = '<div id="nav-placeholder"></div>';

      const mockHtml = '<nav>Test Nav</nav>';
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(mockHtml),
      });

      await loadComponent('#nav-placeholder', '../components/nav.html');

      const placeholder = document.getElementById('nav-placeholder');
      expect(placeholder.innerHTML).toBe(mockHtml);
      expect(global.fetch).toHaveBeenCalledWith('../components/nav.html');
    });

    it('should log error and leave placeholder empty when fetch fails', async () => {
      document.body.innerHTML = '<div id="nav-placeholder"></div>';
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await loadComponent('#nav-placeholder', '../components/nav.html');

      const placeholder = document.getElementById('nav-placeholder');
      expect(placeholder.innerHTML).toBe('');
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('should log error and leave placeholder empty when network error occurs', async () => {
      document.body.innerHTML = '<div id="nav-placeholder"></div>';
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      await loadComponent('#nav-placeholder', '../components/nav.html');

      const placeholder = document.getElementById('nav-placeholder');
      expect(placeholder.innerHTML).toBe('');
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('should log error when selector does not match any element', async () => {
      document.body.innerHTML = '<div id="other"></div>';
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await loadComponent('#nonexistent', '../components/nav.html');

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Element not found')
      );
    });

    it('should not break the page if one component fails to load', async () => {
      document.body.innerHTML = `
        <div id="nav-placeholder"></div>
        <div id="footer-placeholder"></div>
        <main>Page content</main>
      `;
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      await loadComponent('#nav-placeholder', '../components/nav.html');

      // Page content remains intact
      expect(document.querySelector('main').textContent).toBe('Page content');
      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  describe('initPage', () => {
    it('should load nav and footer components and call initNavigation', async () => {
      document.body.innerHTML = `
        <div id="nav-placeholder"></div>
        <div id="footer-placeholder"></div>
      `;

      const navHtml = '<nav class="main-nav"><button class="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Abrir menú"></button><ul id="nav-menu" class="nav-links"><li><a href="home.html" data-page="home">Inicio</a></li></ul></nav>';
      const footerHtml = '<footer>Footer content</footer>';

      global.fetch = vi.fn().mockImplementation((url) => {
        if (url.includes('nav.html')) {
          return Promise.resolve({ ok: true, text: () => Promise.resolve(navHtml) });
        }
        if (url.includes('footer.html')) {
          return Promise.resolve({ ok: true, text: () => Promise.resolve(footerHtml) });
        }
        return Promise.reject(new Error('Unknown component'));
      });

      await initPage();

      // Nav was loaded into the placeholder
      const navPlaceholder = document.getElementById('nav-placeholder');
      expect(navPlaceholder.querySelector('.main-nav')).not.toBeNull();
      // Footer was loaded into the placeholder
      expect(document.getElementById('footer-placeholder').innerHTML).toBe(footerHtml);
      // Both components were fetched
      expect(global.fetch).toHaveBeenCalledTimes(2);
      // initNavigation was called (adds nav-link--active class to the matching link)
      const activeLink = navPlaceholder.querySelector('.nav-link--active');
      expect(activeLink).not.toBeNull();
    });

    it('should still load footer even if nav fails', async () => {
      document.body.innerHTML = `
        <div id="nav-placeholder"></div>
        <div id="footer-placeholder"></div>
      `;
      vi.spyOn(console, 'error').mockImplementation(() => {});

      const footerHtml = '<footer>Footer content</footer>';

      global.fetch = vi.fn().mockImplementation((url) => {
        if (url.includes('nav.html')) {
          return Promise.reject(new Error('Network error'));
        }
        if (url.includes('footer.html')) {
          return Promise.resolve({ ok: true, text: () => Promise.resolve(footerHtml) });
        }
        return Promise.reject(new Error('Unknown'));
      });

      await initPage();

      expect(document.getElementById('nav-placeholder').innerHTML).toBe('');
      expect(document.getElementById('footer-placeholder').innerHTML).toBe(footerHtml);
    });
  });
});
