/**
 * An arrow function to select an specific element according the query given by the code
 * @param {string} query 
 * @returns {Element}
 */
export const selectElement = query => document.querySelector(query)