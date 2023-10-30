/**
 * Find objects according an array
 * @param {Array} array 
 * @param {string} propertyName - Usually the table name
 * @param {string | number | object | Array} propertyValue - Value in the table
 * @returns {Object[]}
 */
export const findAllObjectsInArray = (array, propertyName, propertyValue) =>
  array.filter((object) => object[propertyName] === propertyValue);
