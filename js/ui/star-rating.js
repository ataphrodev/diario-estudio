/**
 * ==============================================================================
 * CAPA DE PRESENTACIÓN: COMPONENTE INTERACTIVO DE ESTRELLAS
 * ==============================================================================
 * 
 * Gestiona el comportamiento visual y los eventos del selector de 1 a 5 estrellas.
 */

window.StudyJournal = window.StudyJournal || {};
window.StudyJournal.ui = window.StudyJournal.ui || {};

window.StudyJournal.ui.starRating = (function() {
  let starContainer = null;
  let ratingInput = null;
  let ratingText = null;
  let starButtons = [];

  function updateVisualStars(value, isHover = false) {
    starButtons.forEach(button => {
      const buttonValue = Number(button.dataset.value);
      if (isHover) {
        button.classList.toggle('hover', buttonValue <= value);
      } else {
        button.classList.toggle('active', buttonValue <= value);
      }
    });

    if (!isHover) {
      ratingInput.value = value;
      ratingText.textContent = `${value} de 5 estrellas`;
    }
  }

  function init(initialValue = 5) {
    starContainer = document.getElementById('star-rating');
    ratingInput = document.getElementById('rating');
    ratingText = document.getElementById('rating-text');
    if (!starContainer || !ratingInput || !ratingText) return;

    starButtons = Array.from(starContainer.querySelectorAll('.star-btn'));

    starButtons.forEach(button => {
      const value = Number(button.dataset.value);

      button.addEventListener('click', () => {
        updateVisualStars(value, false);
      });

      button.addEventListener('mouseenter', () => {
        updateVisualStars(value, true);
      });
    });

    starContainer.addEventListener('mouseleave', () => {
      starButtons.forEach(button => button.classList.remove('hover'));
      updateVisualStars(Number(ratingInput.value) || 5, false);
    });

    setValue(initialValue);
  }

  function setValue(value) {
    const safeValue = Math.max(1, Math.min(5, Number(value) || 5));
    if (ratingInput) ratingInput.value = safeValue;
    if (ratingText) ratingText.textContent = `${safeValue} de 5 estrellas`;

    starButtons.forEach(button => {
      const buttonValue = Number(button.dataset.value);
      button.classList.toggle('active', buttonValue <= safeValue);
      button.classList.remove('hover');
    });
  }

  function getValue() {
    return ratingInput ? Number(ratingInput.value) || 5 : 5;
  }

  return {
    init,
    setValue,
    getValue
  };
})();

