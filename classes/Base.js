import { api } from "../database/api.js";

export class Base {
  _getUniqueId(table) {
    const { response: db } = api();
    return db[table].length + 1;
  }
}
