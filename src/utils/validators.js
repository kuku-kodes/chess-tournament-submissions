/**
 * Validates player registration input data.
 * @param {Object} data - Player object
 * @returns {Object} - { isValid, errors }
 */
export function validatePlayer(data) {
  const errors = {};
  if (!data.name || data.name.trim() === '') {
    errors.name = 'Player name is required.';
  }
  if (data.rating !== undefined && (isNaN(data.rating) || data.rating < 100 || data.rating > 3000)) {
    errors.rating = 'Rating must be between 100 and 3000.';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validates tournament creation input data.
 * @param {Object} data - Tournament object
 * @returns {Object} - { isValid, errors }
 */
export function validateTournament(data) {
  const errors = {};
  if (!data.title || data.title.trim() === '') {
    errors.title = 'Tournament title is required.';
  }
  if (!data.format) {
    errors.format = 'Tournament format is required.';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}