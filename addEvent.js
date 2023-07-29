import { getFullDate } from './date.js'
import { renderStatus } from './dom.js'
import { getLocalData } from './storage.js'
import { findObjectByPropertyValue, updateProperty } from './research.js'

export function addEventToElements(query, eventType, func) {
      const elements = Array.from(document.querySelectorAll(query))
      elements.forEach(element => {
        element.addEventListener(eventType, func)
      })
    }

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

export function addCheckbox(query, name, { id, dailyTask, lastOccurrence }, database, today) {
  const container = selectElement(query)
  const div = createDivWithClass('wrapper')
  const checkbox = createCheckbox(name, id, database, today)
  const label = createLabel(id, dailyTask)
  
  lastOccurrence === today && (() => checkbox.checked = true)()
  
  div.append(checkbox, label)
  container.appendChild(div)
}

export function addLi(query, { text }) {
  const container = selectElement(query)
  const li = createElement('li')
  li.textContent = text
  container.appendChild(li)
}

export const selectElement = query => document.querySelector(query)

export const createElement = (element) => document.createElement(element)

export function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  return element
}

function createCheckbox(name, id, database, date) {
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

function createLabel(labelFor, text) {
  let label = createElement('label')
  label = setAttributes(label, {
    'for': labelFor
  })
  label.textContent = text
  return label
}

function createDivWithClass(cssClass) {
  let div = createElement('div')
  div = setAttributes(div, {
    'class': cssClass
  })
  return div
}

