/**
 * Fetches the data located in the sessionStorage.
 * @param {string} key - sessionStorage key
 * @returns {object}
 */
export const getSessionData = (key) => JSON.parse(sessionStorage.getItem(key));

/**
 * Set data into the sessionStorage
 * @param {string} key
 * @param {object | number | string} value
 */
export const setSessionData = (key, value) => {
  if (typeof value === "object") {
    sessionStorage.setItem(key, JSON.stringify(value));
  } else {
    sessionStorage.setItem(key, value);
  }
};

/**
 * Remove data in sessionStorage
 * @param {string} key - sessionStorage key
 * @returns {void}
 */
export const removeSessionData = (key) => sessionStorage.removeItem(key);
