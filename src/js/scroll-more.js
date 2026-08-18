/**
 * Scroll More Button — Scroll suave hacia la siguiente sección.
 * Requiere estructura HTML:
 *   <div class="scroll-more">
 *     <button class="scroll-more__btn" ...>...</button>
 *   </div>
 */

/**
 * Dado un botón, encuentra la siguiente sección hermana y hace scroll suave hacia ella.
 * @param {HTMLElement} button - El botón .scroll-more__btn que fue clickeado
 */
function scrollToNextSection(button) {
  if (!button) return;

  const scrollMoreContainer = button.closest('.scroll-more');
  if (!scrollMoreContainer) return;

  // Buscar el siguiente hermano que sea un <section>
  let sibling = scrollMoreContainer.nextElementSibling;
  while (sibling) {
    if (sibling.tagName === 'SECTION') {
      sibling.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    sibling = sibling.nextElementSibling;
  }

  // Si no existe una siguiente sección, no hacer nada
}

/**
 * Inicializa todos los botones .scroll-more__btn registrando click handlers.
 */
function initScrollMoreButtons() {
  const buttons = document.querySelectorAll('.scroll-more__btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      scrollToNextSection(btn);
    });
  });
}

export { initScrollMoreButtons, scrollToNextSection };
