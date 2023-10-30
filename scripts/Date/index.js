/**
 * Get the current full date
 * @returns {string}
 */
export function getFullDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear());

  return `${year}-${month}-${day}`;
}

/**
 * Format the given date
 * @param {string} date - A string which contains the date to be formatted
 * @returns {Date}
 */
export function formatDate(date) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

export function sortByField(array, field, descending = true) {
  return array.sort((a, b) => {
    if (descending) {
      return new Date(b[field]) - new Date(a[field]);
    } else {
      return new Date(a[field]) - new Date(b[field]);
    }
  });
}
