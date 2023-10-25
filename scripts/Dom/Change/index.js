
export function changeState(selector, property, value) {
    const element = document.querySelector(selector);
    if (element) {
      if (property === 'textContent') {
        element.textContent = value
      } else {
        element.style[property] = value;
      }
    }
  }