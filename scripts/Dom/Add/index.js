import { selectElement } from "../Select"
import { createCheckbox, createDivWithClass, createElement, createLabel } from "../Create"

export function addCheckbox(query, name, { id, dailyTask, lastOccurrence }, today) {
    const container = selectElement(query)
    const div = createDivWithClass('wrapper')
    const checkbox = createCheckbox(name, id, today)
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

  export function addEventToElements(query, eventType, func) {
    const elements = Array.from(document.querySelectorAll(query))
    elements.forEach(element => {
      element.addEventListener(eventType, func)
    })
  }