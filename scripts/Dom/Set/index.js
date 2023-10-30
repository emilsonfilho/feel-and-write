/**
 * 
 * @param {{element}} element 
 * @param {Array} attributes - An array containing the attributes to be placed on the element
 * @returns 
 */
export function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  return element;
}
