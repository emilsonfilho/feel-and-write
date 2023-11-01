/**
 * A function who changes the state of the elements
 * @param {string} query
 * @param {string} property - Propertie to be changed
 * @param {string} value - Value to be changed
 */
export function changeState(query, property, value) {
  const element = document.querySelector(query);
  if (element) {
    if (property === "textContent") {
      element.textContent = value;
    } else {
      element.style[property] = value;
    }
  }
}
