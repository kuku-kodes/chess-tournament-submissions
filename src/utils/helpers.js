/**
 * Generates a random unique identifier string.
 * @returns {string}
 */
export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Capitalizes the first letter of a string.
 * @param {string} str 
 * @returns {string}
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Truncates text if it exceeds a specified length.
 * @param {string} str 
 * @param {number} length 
 * @returns {string}
 */
export function truncate(str, length = 30) {
  if (!str) return '';
  return str.length > length ? str.substring(0, length) + '...' : str;
}