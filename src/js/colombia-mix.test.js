/**
 * Unit tests for loadComponent - Task 5.1
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { loadComponent } from './main.js';

describe('loadComponent (colombia-mix)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('inserts fetched HTML into the matching placeholder element', async () => {
    const html = '<header>Test Header</header>';
    document.body.innerHTML = '<div id="header-placeholder"></div>';
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => html,
    });

    await loadComponent('#header-placeholder', '../components/header.html');

    const placeholder = document.querySelector('#header-placeholder');
    expect(placeholder.innerHTML).toBe(html);
    expect(global.fetch).toHaveBeenCalledWith('../components/header.html');
  });

  it('does not throw and logs error when selector does not exist in the DOM', async () => {
    document.body.innerHTML = '';
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(
      loadComponent('#nonexistent-placeholder', '../components/nav.html')
    ).resolves.toBeUndefined();

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Element not found')
    );
    errorSpy.mockRestore();
  });

  it('logs an error to console when fetch rejects (network error)', async () => {
    document.body.innerHTML = '<div id="footer-placeholder"></div>';
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await loadComponent('#footer-placeholder', '../components/footer.html');

    expect(errorSpy).toHaveBeenCalled();
    expect(document.getElementById('footer-placeholder').innerHTML).toBe('');
    errorSpy.mockRestore();
  });
});