/**
 * ==============================================================================
 * CAPA DE PRESENTACIÓN: RENDERIZADOR DE SESIONES (ANTI-XSS)
 * ==============================================================================
 * 
 * Se encarga exclusivamente de convertir los objetos de sesión en elementos del DOM
 * de forma completamente segura (usando textContent y createElement).
 */

window.StudyJournal = window.StudyJournal || {};
window.StudyJournal.ui = window.StudyJournal.ui || {};

window.StudyJournal.ui.sessionRenderer = (function() {
  const { formatReadableDate, formatDuration, getStarString } = window.StudyJournal.domain.calculations;

  /**
   * Crea el elemento HTML <article> de una sesión individual.
   */
  function createSessionCard(session, onEdit, onDelete) {
    const article = document.createElement('article');
    article.className = 'session-item';
    article.dataset.id = session.id;

    // 1. Cabecera de la tarjeta
    const header = document.createElement('div');
    header.className = 'session-header';

    const titleWrapper = document.createElement('div');
    titleWrapper.className = 'session-title-wrapper';

    const subjectTitle = document.createElement('h3');
    subjectTitle.className = 'session-subject';
    subjectTitle.textContent = session.subject; // Seguro contra inyección de HTML

    const dateSpan = document.createElement('span');
    dateSpan.className = 'session-date';
    dateSpan.textContent = formatReadableDate(session.date);

    titleWrapper.appendChild(subjectTitle);
    titleWrapper.appendChild(dateSpan);

    // Metadatos (duración y estrellas)
    const metaChips = document.createElement('div');
    metaChips.className = 'session-meta-chips';

    const durationChip = document.createElement('span');
    durationChip.className = 'chip chip-duration';
    durationChip.textContent = `⏱ ${formatDuration(session.duration)}`;

    const ratingChip = document.createElement('span');
    ratingChip.className = 'chip chip-rating';
    ratingChip.textContent = getStarString(session.rating);
    ratingChip.title = `${session.rating} de 5 estrellas`;

    metaChips.appendChild(durationChip);
    metaChips.appendChild(ratingChip);

    header.appendChild(titleWrapper);
    header.appendChild(metaChips);
    article.appendChild(header);

    // 2. Contenido de estudio (si existe)
    if (session.content && session.content.trim() !== '') {
      const body = document.createElement('div');
      body.className = 'session-body';

      const contentParagraph = document.createElement('p');
      contentParagraph.className = 'session-content-text';
      contentParagraph.textContent = session.content; // Seguro contra inyección de HTML

      body.appendChild(contentParagraph);
      article.appendChild(body);
    }

    // 3. Botones de acción
    const footer = document.createElement('div');
    footer.className = 'session-footer';

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'btn btn-secondary btn-sm';
    editBtn.textContent = '✏️ Editar';
    editBtn.addEventListener('click', () => onEdit(session.id));

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'btn btn-danger-outline btn-sm';
    deleteBtn.textContent = '🗑️ Eliminar';
    deleteBtn.addEventListener('click', () => onDelete(session.id));

    footer.appendChild(editBtn);
    footer.appendChild(deleteBtn);
    article.appendChild(footer);

    return article;
  }

  /**
   * Renderiza el listado completo de sesiones en el contenedor indicado.
   */
  function renderList({ container, emptyState, countBadge, sessions, onEdit, onDelete }) {
    const total = sessions.length;
    countBadge.textContent = `${total} ${total === 1 ? 'sesión' : 'sesiones'}`;

    if (total === 0) {
      container.innerHTML = '';
      container.appendChild(emptyState);
      emptyState.classList.remove('hidden');
      return;
    }

    container.innerHTML = '';

    // Orden cronológico descendente (las más recientes primero)
    const sorted = [...sessions].sort((a, b) => {
      const cmp = b.date.localeCompare(a.date);
      if (cmp !== 0) return cmp;
      return b.id.localeCompare(a.id);
    });

    const fragment = document.createDocumentFragment();
    sorted.forEach(session => {
      const card = createSessionCard(session, onEdit, onDelete);
      fragment.appendChild(card);
    });

    container.appendChild(fragment);
  }

  return {
    createSessionCard,
    renderList
  };
})();

