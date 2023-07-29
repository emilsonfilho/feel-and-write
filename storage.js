export const getSessionData = property => JSON.parse(sessionStorage.getItem(property));

export const setSessionData = (property, value) => {
  if (typeof value === 'object') {
    sessionStorage.setItem(property, JSON.stringify(value));
  } else {
    sessionStorage.setItem(property, value);
  }
};

export const removeSessionData = property => sessionStorage.removeItem(property);

export const getLocalData = property => localStorage.getItem(property);

export const setLocalData = (property, obj) => localStorage.setItem(property, JSON.stringify(obj));
