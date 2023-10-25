import { setLocalData } from '../storage.js'

export function findObjectByPropertyValue(database, objectName, propertyName, propertyValue) {
  const response = database[objectName].find(object => object[propertyName] === propertyValue);
  
  if (response) {
    return response
  } else {
    return null
  }
}

export const findAllObjectsByProperties = (database, objectName, properties) => {
  return database[objectName].filter(object => {
    return Object.entries(properties).every(([key, value]) => object[key] === value);
  });
};

export function findAllObjectsInArray(array, propertyName, propertyValue) {
  return array.filter(object => object[propertyName] === propertyValue)
}

export function updateProperty(database, table, objectKey, targetValue, propertyToUpdate, newValue) {
  const targetObject = database[table].find((entry) => entry[objectKey] === targetValue);
  if (targetObject) {
    targetObject[propertyToUpdate] = newValue;
    setLocalData('database', database)
  }
}

export function setData(database, table, obj, input) {
  input.value === '' && (() => { throw new Error('Input não pode ser vazio!')})()
  
  database[table].push(obj);
  setLocalData('database', database);
  input.value = '';
}

export function removeProperty(database, table, objectKey, targetValue) {
  const targetObject = findObjectByPropertyValue(database, table, objectKey, targetValue)
  
  if (targetObject) {
    const index = database[table].indexOf(targetObject)
    
    if (index !== -1) {
      database[table].splice(index, 1);
      setLocalData('database', database)
    } else {
      throw new Error('Index não encontrado')
    }
  } else {
    throw new Error('Objeto não encontrado')
  }
}