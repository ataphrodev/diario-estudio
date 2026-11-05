/**
 * ==============================================================================
 * APLICACIÓN PRINCIPAL (ORQUESTADOR / APPLICATION CONTROLLER)
 * ==============================================================================
 * 
 * Este archivo actúa como el orquestador central (o Controller en arquitectura MVC / Clean Architecture):
 * 1. Mantiene el estado en memoria de la aplicación.
 * 2. Escucha los eventos de usuario en el formulario.
 * 3. Delega la validación a la capa de Dominio (validators.js).
 * 4. Delega la persistencia a la capa de Almacenamiento (storage.js).
 * 5. Delega la representación visual a la capa de UI (session-renderer.js y star-rating.js).
 */

window.StudyJournal = window.StudyJournal || {};

window.StudyJournal.app = (function() {
  // Acceso a los módulos de cada capa
  const { calculations, validators } = window.StudyJournal.domain;
  const storage = window.StudyJournal.storage;
  const { starRating, sessionRenderer } = window.StudyJournal.ui;

  // Estado mutable en memoria
  let state = { ...storage.defaultState };
  let currentEditingId = null;

  // Referencias a elementos clave del DOM
  let elements = {};

  function cacheDOMElements() {
    elements = {
      form: document.getElementById('session-form'),
      formTitle: document.getElementById('form-title'),
      formBadge: document.getElementById('form-mode-badge'),
      submitBtn: document.getElementById('submit-btn'),
      cancelBtn: document.getElementById('cancel-edit-btn'),
      formError: document.getElementById('form-error'),
      dateInput: document.getElementById('date'),
      subjectInput: document.getElementById('subject'),
      durationInput: document.getElementById('duration'),
      contentInput: document.getElementById('content'),
      sessionsContainer: document.getElementById('sessions-container'),
      emptyState: document.getElementById('empty-state'),
      sessionCountBadge: document.getElementById('session-count-badge')
    };
  }

  function showFormError(message) {
    if (message) {
      elements.formError.textContent = message;
      elements.formError.classList.remove('hidden');
    } else {
      elements.formError.textContent = '';
      elements.formError.classList.add('hidden');
    }
  }

  function resetForm() {
    elements.form.reset();
    currentEditingId = null;

    elements.dateInput.value = calculations.getTodayDateString();
    starRating.setValue(5);

    elements.formTitle.textContent = 'Registrar sesión';
    elements.formBadge.classList.add('hidden');
    elements.submitBtn.textContent = 'Guardar sesión';
    elements.cancelBtn.classList.add('hidden');
    showFormError(null);
  }

  function render() {
    sessionRenderer.renderList({
      container: elements.sessionsContainer,
      emptyState: elements.emptyState,
      countBadge: elements.sessionCountBadge,
      sessions: state.sessions,
      onEdit: startEdit,
      onDelete: deleteSession
    });
  }

  function addSession(sessionData) {
    const newSession = {
      id: calculations.generateId(),
      ...sessionData
    };
    state.sessions.push(newSession);
    storage.saveState(state);
    render();
  }

  function updateSession(id, sessionData) {
    const index = state.sessions.findIndex(s => s.id === id);
    if (index !== -1) {
      state.sessions[index] = {
        ...state.sessions[index],
        ...sessionData
      };
      storage.saveState(state);
      render();
    }
  }

  function startEdit(id) {
    const session = state.sessions.find(s => s.id === id);
    if (!session) return;

    currentEditingId = id;
    elements.dateInput.value = session.date;
    elements.subjectInput.value = session.subject;
    elements.durationInput.value = session.duration;
    elements.contentInput.value = session.content || '';
    starRating.setValue(session.rating || 5);

    elements.formTitle.textContent = 'Editar sesión';
    elements.formBadge.classList.remove('hidden');
    elements.submitBtn.textContent = 'Actualizar sesión';
    elements.cancelBtn.classList.remove('hidden');
    showFormError(null);

    document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth' });
  }

  function deleteSession(id) {
    const session = state.sessions.find(s => s.id === id);
    if (!session) return;

    const message = `¿Seguro que deseas eliminar la sesión de "${session.subject}" del ${calculations.formatReadableDate(session.date)}?`;
    if (!window.confirm(message)) return;

    if (currentEditingId === id) {
      resetForm();
    }

    state.sessions = state.sessions.filter(s => s.id !== id);
    storage.saveState(state);
    render();
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    const rawData = {
      date: elements.dateInput.value,
      subject: elements.subjectInput.value.trim(),
      duration: elements.durationInput.value.trim(),
      content: elements.contentInput.value.trim(),
      rating: starRating.getValue()
    };

    // Validación pura desde la capa de Dominio
    const validation = validators.validateSessionData(rawData);
    if (!validation.isValid) {
      showFormError(validation.error);
      return;
    }

    showFormError(null);

    const payload = {
      date: rawData.date,
      subject: rawData.subject,
      duration: Number(rawData.duration),
      content: rawData.content,
      rating: Number(rawData.rating)
    };

    if (currentEditingId) {
      updateSession(currentEditingId, payload);
    } else {
      addSession(payload);
    }

    resetForm();
  }

  function init() {
    cacheDOMElements();

    // 1. Cargar estado desde el almacenamiento
    state = storage.loadState();

    // 2. Inicializar componentes de UI
    starRating.init(5);
    elements.dateInput.value = calculations.getTodayDateString();

    // 3. Vincular eventos
    elements.form.addEventListener('submit', handleFormSubmit);
    elements.cancelBtn.addEventListener('click', resetForm);

    // 4. Renderizar vista inicial
    render();
  }

  return {
    init,
    getState: () => state
  };
})();

// Inicialización cuando el DOM esté preparado
document.addEventListener('DOMContentLoaded', window.StudyJournal.app.init);

