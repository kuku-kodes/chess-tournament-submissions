/**
 * Formats a date into a standard string (YYYY-MM-DD).
 * @param {Date|string|number} date 
 * @returns {string}
 */
export function formatDate(date = new Date()) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

/**
 * Formats a date with time included (YYYY-MM-DD HH:MM).
 * @param {Date|string|number} date 
 * @returns {string}
 */
export function formatDateTime(date = new Date()) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  const dateStr = formatDate(d);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  
  return `${dateStr} ${hours}:${minutes}`;
}