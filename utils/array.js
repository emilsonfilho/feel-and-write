export const findAllObjectsInArray = (array, propertyName, propertyValue) =>
  array.filter((object) => object[propertyName] === propertyValue);
