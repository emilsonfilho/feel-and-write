/**
 * Offers a database-aligned consumption API
 * @returns object
 */
export function api() {
  const error404 = "Nenhum resultado encontrado.";
  let db = JSON.parse(localStorage.getItem("database"));

  /**
   * Get a specific table from the database
   * @param {string} tableName - The name of the table you want to
   * @returns {array} The table
   */
  const getTable = (tableName) => db[tableName];
  /**
   * Save the database in localStorage
   * @param {object} database - The database you want to save
   */
  const save = (database) => {
    localStorage.setItem("database", JSON.stringify(database));
  };

  if (!db || Object.keys(db).length === 0) {
    return { error: error404, save: save };
  }

  /**
   * Get the data from the database according with the table selected
   * @param {string} tableName
   * @returns {object}
   */
  function get(tableName) {
    const table = getTable(tableName);

    if (!table) {
      return { error: error404 };
    }

    /**
     * Filter the data searched
     * @param {object} properties - An object with the properties you want to correspond
     * @returns {object}
     */
    function where(properties) {
      const response = table.filter((object) =>
        Object.entries(properties).every(
          ([key, value]) => object[key] === value,
        ),
      );

      if (!response.length) {
        return { response: [], error: error404 };
      }

      /**
       * Select the first result in the search
       * @returns {object}
       */
      function first() {
        const first = response[0];
        if (!first) {
          return { error: error404 };
        } else {
          return { response: first };
        }
      }

      return { response, first };
    }

    return { response: table, where };
  }

  /**
   * Set data in database
   * @param {string} tableName - Specifies the name of the table to which you want to insert the data
   * @returns {object}
   */
  function set(tableName) {
    const table = getTable(tableName);

    if (!table) {
      throw new Error(error404);
    }

    /**
     * Insert and save data in database
     * @param {object | Action | DayToDay | Distraction | Dream | Gratitude | Intention | User } data - Data to insert in table
     */
    function data(data) {
      if (typeof data !== "object") {
        throw new Error(
          "Tipo de dados não correspondente ao exigido pela estruturação do banco de de dados: ",
          typeof data,
        );
      }

      table.push(data);
      save(db);
    }

    return { data };
  }

  /**
   * Update data in database
   * @param {string} tableName
   * @returns {object}
   */
  function put(tableName) {
    const table = getTable(tableName);

    if (!table) {
      throw new Error(error404);
    }

    /**
     * Select the right field to update
     * @param {string} field - field in table to compare
     * @param {any} value - value to compare
     * @returns {object}
     */
    function where(field, value) {
      const target = table.find((entry) => entry[field] === value);

      if (!target) {
        throw new Error(error404);
      }

      /**
       * Says where and how the data will be updated
       * @param {string} updatedField - field to update the data
       * @param {any} updatedValue - value in field to update
       */
      function to(updatedField, updatedValue) {
        if (!target.hasOwnProperty(updatedField)) {
          throw new Error("Campo não encontrado na tabela.");
        }

        target[updatedField] = updatedValue;
        save(db);
      }

      return { to };
    }

    return { where };
  }

  /**
   * Delete data in database
   * @returns {object}
   */
  function destroy() {
    /**
     * Delete all database
     */
    function all() {
      localStorage.removeItem("database");
    }

    /**
     * Select table to delete
     * @param {string} tableName
     * @returns {object}
     */
    function table(tableName) {
      let table = getTable(tableName);

      if (!table) {
        throw new Error(error404);
      }

      /**
       * Delete all table
       */
      function all() {
        delete db[tableName];
      }

      /**
       * Selects the corre
       * @param {string} field - Select the field to compare
       * @param {any} value - Says the value to compare
       */
      function where(field, value) {
        const target = table.find((entry) => entry[field] === value);

        if (!target) {
          throw new Error(error404);
        }

        const index = table.indexOf(target);

        if (index === -1) {
          throw new Error(error404);
        }

        table.splice(index, 1);
        save(db);
      }

      return { all, where };
    }

    return { all, table };
  }

  /**
   * Clear database
   * @returns {object}
   */
  function clear() {
    /**
     * Clear all database
     */
    function all() {
      for (let table in db) {
        if (Array.isArray(db[table])) {
          db[table] = [];
        } else if (typeof db[table] === "object") {
          all(db[table]);
        }
      }
    }

    /**
     * Says which table will be cleared
     * @param {string} tableName
     */
    function table(tableName) {
      const table = getTable(tableName);

      if (!table) {
        throw new Error(error404);
      }

      table = [];
      save(db);
    }

    return { all, table };
  }

  return { response: db, get, set, put, destroy, clear, save };
}
