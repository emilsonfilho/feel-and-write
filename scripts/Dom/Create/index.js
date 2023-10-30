import { api } from "../../../database/api"
import { renderStatus } from "../Render"
import { setAttributes } from "../Set"
// FALTA UPDATEPROPERTY NOS IMPORTS

/**
 * Creates an element
 * @param {string} element - the query
 * @returns {Element} - created DOM Element
 */
export const createElement = (element) => document.createElement(element)
  
export function createCheckbox(name, id, date) {
    let checkbox = createElement('input')
    checkbox = setAttributes(checkbox, {
      'type': 'checkbox',
      'name': name,
      'id': id
    })
    checkbox.addEventListener('change', () => {
      checkbox.checked = true
      api().put('actions').where('id', id).to('lastOccurrence', date)
      renderStatus('checkbox')
    })
    return checkbox
  }

  
export function createLabel(labelFor, text) {
    let label = createElement('label')
    label = setAttributes(label, {
      'for': labelFor
    })
    label.textContent = text
    return label
  }
  
  export function createDivWithClass(cssClass) {
    let div = createElement('div')
    div = setAttributes(div, {
      'class': cssClass
    })
    return div
  }