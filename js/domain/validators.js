/**
 * ==============================================================================
 * CAPA DE DOMINIO: VALIDACIONES Y REGLAS DE INTEGRIDAD
 * ==============================================================================
 * 
 * Contiene las reglas que determinan si los datos de una sesión son válidos
 * antes de permitir que entren al estado o se guarden en almacenamiento.
 */

window.StudyJournal = window.StudyJournal || {};
window.StudyJournal.domain = window.StudyJournal.domain || {};

window.StudyJournal.domain.validators = (function() {
  /**
   * Valida los datos brutos de una sesión de estudio.
   * @param {Object} formData
   * @returns {{ isValid: boolean, error: string | null }}
   */
  function validateSessionData(formData) {
    if (!formData.date || typeof formData.date !== 'string' || formData.date.trim() === '') {
      return { isValid: false, error: 'Por favor, selecciona una fecha válida.' };
    }

    if (!formData.subject || typeof formData.subject !== 'string' || formData.subject.trim() === '') {
      return { isValid: false, error: 'La asignatura o tema no puede estar vacía.' };
    }

    const durationNumber = Number(formData.duration);
    if (isNaN(durationNumber) || durationNumber <= 0 || !Number.isInteger(durationNumber)) {
      return { isValid: false, error: 'La duración debe ser un número entero mayor que 0 minutos.' };
    }

    const ratingNumber = Number(formData.rating);
    if (isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
      return { isValid: false, error: 'La valoración debe estar entre 1 y 5 estrellas.' };
    }

    return { isValid: true, error: null };
  }

  return {
    validateSessionData
  };
})();

