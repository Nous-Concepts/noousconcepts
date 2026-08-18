import { describe, it, expect, beforeEach } from 'vitest';
import { getPageNameFromPath, setActivePage, toggleMobileMenu, initNavigation, listenMenuToggleEvent } from './nav.js';

describe('nav.js', () => {
  describe('getPageNameFromPath', () => {
    it('extracts "home" from a path ending in home.html', () => {
      expect(getPageNameFromPath('/pages/home.html')).toBe('home');
    });

    it('extracts "contenidos" from a path ending in contenidos.html', () => {
      expect(getPageNameFromPath('/src/pages/contenidos.html')).toBe('contenidos');
    });

    it('extracts "servicios" from a path ending in servicios.html', () => {
      expect(getPageNameFromPath('/servicios.html')).toBe('servicios');
    });

    it('returns "home" for empty path', () => {
      expect(getPageNameFromPath('')).toBe('home');
    });

    it('returns "home" for null/undefined path', () => {
      expect(getPageNameFromPath(null)).toBe('home');
      expect(getPageNameFromPath(undefined)).toBe('home');
    });

    it('returns "home" for root path "/"', () => {
      expect(getPageNameFromPath('/')).toBe('home');
    });

    it('returns "home" for index.html', () => {
      expect(getPageNameFromPath('/index.html')).toBe('home');
    });

    it('strips query parameters before extracting page name', () => {
      expect(getPageNameFromPath('/pages/servicios.html?foo=bar')).toBe('servicios');
    });

    it('strips hash fragments before extracting page name', () => {
      expect(getPageNameFromPath('/pages/contenidos.html#section')).toBe('contenidos');
    });

    it('handles plain filename without leading path', () => {
      expect(getPageNameFromPath('home.html')).toBe('home');
    });
  });

  describe('setActivePage', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <ul class="nav-links">
          <li><a href="home.html" data-page="home">Inicio</a></li>
          <li><a href="contenidos.html" data-page="contenidos">Contenidos</a></li>
          <li><a href="servicios.html" data-page="servicios">Servicios</a></li>
        </ul>
      `;
    });

    it('adds nav-link--active class to the matching page link', () => {
      setActivePage('contenidos');
      const activeLink = document.querySelector('[data-page="contenidos"]');
      expect(activeLink.classList.contains('nav-link--active')).toBe(true);
    });

    it('removes nav-link--active from previously active links', () => {
      setActivePage('home');
      setActivePage('servicios');

      const homeLink = document.querySelector('[data-page="home"]');
      const serviciosLink = document.querySelector('[data-page="servicios"]');

      expect(homeLink.classList.contains('nav-link--active')).toBe(false);
      expect(serviciosLink.classList.contains('nav-link--active')).toBe(true);
    });

    it('only one link is active at a time', () => {
      setActivePage('home');
      const activeLinks = document.querySelectorAll('.nav-link--active');
      expect(activeLinks.length).toBe(1);
    });

    it('no link is active if pageName does not match any data-page', () => {
      setActivePage('nonexistent');
      const activeLinks = document.querySelectorAll('.nav-link--active');
      expect(activeLinks.length).toBe(0);
    });
  });

  describe('toggleMobileMenu', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <button class="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Abrir menú">
          <span class="nav-toggle-icon"></span>
        </button>
        <ul id="nav-menu" class="nav-links">
          <li><a href="home.html" data-page="home">Inicio</a></li>
        </ul>
      `;
    });

    it('sets aria-expanded to true when opening menu', () => {
      toggleMobileMenu();
      const toggle = document.querySelector('.nav-toggle');
      expect(toggle.getAttribute('aria-expanded')).toBe('true');
    });

    it('sets aria-expanded back to false when closing menu', () => {
      toggleMobileMenu(); // open
      toggleMobileMenu(); // close
      const toggle = document.querySelector('.nav-toggle');
      expect(toggle.getAttribute('aria-expanded')).toBe('false');
    });

    it('adds is-open class to nav-menu when opening', () => {
      toggleMobileMenu();
      const menu = document.getElementById('nav-menu');
      expect(menu.classList.contains('is-open')).toBe(true);
    });

    it('removes is-open class from nav-menu when closing', () => {
      toggleMobileMenu(); // open
      toggleMobileMenu(); // close
      const menu = document.getElementById('nav-menu');
      expect(menu.classList.contains('is-open')).toBe(false);
    });

    it('updates aria-label to "Cerrar menú" when opened', () => {
      toggleMobileMenu();
      const toggle = document.querySelector('.nav-toggle');
      expect(toggle.getAttribute('aria-label')).toBe('Cerrar menú');
    });

    it('updates aria-label to "Abrir menú" when closed', () => {
      toggleMobileMenu(); // open
      toggleMobileMenu(); // close
      const toggle = document.querySelector('.nav-toggle');
      expect(toggle.getAttribute('aria-label')).toBe('Abrir menú');
    });
  });

  describe('initNavigation', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <button class="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Abrir menú">
          <span class="nav-toggle-icon"></span>
        </button>
        <ul id="nav-menu" class="nav-links">
          <li><a href="home.html" data-page="home">Inicio</a></li>
          <li><a href="contenidos.html" data-page="contenidos">Contenidos</a></li>
          <li><a href="servicios.html" data-page="servicios">Servicios</a></li>
        </ul>
      `;
    });

    it('registers click event on nav-toggle button', () => {
      initNavigation();
      const toggle = document.querySelector('.nav-toggle');
      toggle.click();
      expect(toggle.getAttribute('aria-expanded')).toBe('true');
    });

    it('sets active page based on current path', () => {
      // jsdom defaults location to about:blank, so getPageNameFromPath returns "home"
      initNavigation();
      const homeLink = document.querySelector('[data-page="home"]');
      expect(homeLink.classList.contains('nav-link--active')).toBe(true);
    });
  });

  describe('listenMenuToggleEvent', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <button class="site-header__menu-btn" type="button">Menu</button>
        <button class="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Abrir menú">
          <span class="nav-toggle-icon"></span>
        </button>
        <ul id="nav-menu" class="nav-links">
          <li><a href="home.html" data-page="home">Inicio</a></li>
          <li><a href="contenidos.html" data-page="contenidos">Contenidos</a></li>
        </ul>
      `;
      listenMenuToggleEvent();
    });

    it('adds is-open class and sets aria-expanded to true on menu-toggle open event', () => {
      document.dispatchEvent(new CustomEvent('menu-toggle', { detail: { state: 'open' } }));

      const navMenu = document.getElementById('nav-menu');
      const navToggle = document.querySelector('.nav-toggle');

      expect(navMenu.classList.contains('is-open')).toBe(true);
      expect(navToggle.getAttribute('aria-expanded')).toBe('true');
    });

    it('removes is-open class and sets aria-expanded to false on menu-toggle close event', () => {
      // First open the menu
      document.dispatchEvent(new CustomEvent('menu-toggle', { detail: { state: 'open' } }));
      // Then close it
      document.dispatchEvent(new CustomEvent('menu-toggle', { detail: { state: 'close' } }));

      const navMenu = document.getElementById('nav-menu');
      const navToggle = document.querySelector('.nav-toggle');

      expect(navMenu.classList.contains('is-open')).toBe(false);
      expect(navToggle.getAttribute('aria-expanded')).toBe('false');
    });

    it('moves focus to .site-header__menu-btn when closing and active element is inside nav-menu', () => {
      // Open the menu first
      document.dispatchEvent(new CustomEvent('menu-toggle', { detail: { state: 'open' } }));

      // Focus an element inside nav-menu
      const linkInsideMenu = document.querySelector('#nav-menu a');
      linkInsideMenu.focus();
      expect(document.activeElement).toBe(linkInsideMenu);

      // Close the menu
      document.dispatchEvent(new CustomEvent('menu-toggle', { detail: { state: 'close' } }));

      const headerMenuBtn = document.querySelector('.site-header__menu-btn');
      expect(document.activeElement).toBe(headerMenuBtn);
    });

    it('does not change focus when closing and active element is NOT inside nav-menu', () => {
      // Open the menu first
      document.dispatchEvent(new CustomEvent('menu-toggle', { detail: { state: 'open' } }));

      // Focus the header menu button (outside nav-menu)
      const headerMenuBtn = document.querySelector('.site-header__menu-btn');
      headerMenuBtn.focus();
      expect(document.activeElement).toBe(headerMenuBtn);

      // Close the menu
      document.dispatchEvent(new CustomEvent('menu-toggle', { detail: { state: 'close' } }));

      // Focus should remain on the header menu button (unchanged)
      expect(document.activeElement).toBe(headerMenuBtn);
    });
  });
});
