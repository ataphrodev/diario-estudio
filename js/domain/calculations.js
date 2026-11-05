/**
 * ==============================================================================
 * CAPA DE DOMINIO: CÁLCULOS Y REGLAS DE NEGOCIO PURAS
 * ==============================================================================
 * 
 * En Clean Architecture, la capa de dominio contiene funciones "puras":
 * - No manipula el DOM (nada de document ni window).
 * - No accede a bases de datos ni a localStorage.
 * - Solo recibe datos de entrada, los procesa y devuelve un resultado predecible.
 */

window.StudyJournal = window.StudyJournal || {};
window.StudyJournal.domain = window.StudyJournal.domain || {};

window.StudyJournal.domain.calculations = (function() {
  /**
   * Genera un identificador único para una sesión.
   */
  function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Obtiene la fecha actual en formato local "AAAA-MM-DD".
   * Evita desfases de huso horario causados por toISOString().
   */
  function getTodayDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Convierte "AAAA-MM-DD" en texto en español ("5 de noviembre de 2026").
   */
  function formatReadableDate(dateString) {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);

    return dateObj.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  /**
   * Formatea minutos a horas y minutos legibles ("1 h 30 min", "45 min").
   */
  function formatDuration(minutes) {
    const totalMinutes = Number(minutes);
    if (isNaN(totalMinutes) || totalMinutes <= 0) return '0 min';

    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    if (hours > 0 && remainingMinutes > 0) {
      return `${hours} h ${remainingMinutes} min`;
    } else if (hours > 0) {
      return `${hours} h`;
    }
    return `${remainingMinutes} min`;
  }

  /**
   * Devuelve la representación en caracteres de estrellas ("★★★★☆").
   */
  function getStarString(rating) {
    const score = Math.max(1, Math.min(5, Number(rating) || 5));
    return '★'.repeat(score) + '☆'.repeat(5 - score);
  }

  return {
    generateId,
    getTodayDateString,
    formatReadableDate,
    formatDuration,
    getStarString
  };
})();

