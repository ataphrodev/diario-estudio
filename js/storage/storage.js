/**
 * ==============================================================================
 * CAPA DE ALMACENAMIENTO (DATA / REPOSITORY LAYER)
 * ==============================================================================
 * 
 * Aísla todos los detalles técnicos de localStorage:
 * - Si en el futuro cambiáramos localStorage por IndexedDB o una API REST,
 *   solo tendríamos que modificar este archivo sin tocar el resto de la app.
 */

window.StudyJournal = window.StudyJournal || {};

window.StudyJournal.storage = (function() {
  const STORAGE_KEY = 'study_journal_data_v1';

  const defaultState = {
    sessions: [],
    settings: {
      weeklyGoalHours: 10
    }
  };

  /**
   * Carga los datos de localStorage con manejo defensivo de errores.
   */
  function loadState() {
    try {
      const rawData = localStorage.getItem(STORAGE_KEY);
      if (!rawData) {
        return { ...defaultState };
      }

      const parsed = JSON.parse(rawData);

      // Verificamos la integridad de los datos cargados
      return {
        sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
        settings: parsed.settings && typeof parsed.settings.weeklyGoalHours === 'number'
          ? parsed.settings
          : { ...defaultState.settings }
      };
    } catch (error) {
      console.error('Error al leer de localStorage. Usando estado inicial:', error);
      return { ...defaultState };
    }
  }

  /**
   * Guarda el estado serializado en localStorage.
   */
  function saveState(state) {
    try {
      const serialized = JSON.stringify(state);
      localStorage.setItem(STORAGE_KEY, serialized);
      return true;
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
      return false;
    }
  }

  return {
    STORAGE_KEY,
    defaultState,
    loadState,
    saveState
  };
})();

