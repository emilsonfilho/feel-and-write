import { renderStatus } from "../Render"
import { setAttributes } from "../Set"
// FALTA UPDATEPROPERTY NOS IMPORTS

export const createElement = (element) => document.createElement(element)
  
export function createCheckbox(name, id, database, date) {
    let checkbox = createElement('input')
    checkbox = setAttributes(checkbox, {
      'type': 'checkbox',
      'name': name,
      'id': id
    })
    checkbox.addEventListener('change', () => {
      checkbox.checked = true
      updateProperty(database, 'actions', 'id', id, 'lastOccurrence', date)
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