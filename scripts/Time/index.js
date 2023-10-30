/**
 * Get formatted current time
 * @returns {string}
 */
export function getFormattedTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

/**
 * Formats the time provided
 * @param {string} time 
 * @returns {string}
 */
export const formatTime = (time) => time.replace(":", "h");
