import { getLocalData } from './storage.js'

export class BaseClass {
  _getUniqueId(dataName) {
    const database = JSON.parse(getLocalData('database'));
    return database[dataName].length + 1;
  }
}