/**
 * Verifies if an object is equivalent to ther
 * @param {object} objA - the first object
 * @param {object} objB - the second object
 * @returns {boolean}
 */
export function isEquivalent(objA, objB) {
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!keysB.includes(key)) {
      return false;
    }
  }

  for (const key of keysB) {
    if (!keysA.includes(key)) {
      return false;
    }
  }

  return true;
}
