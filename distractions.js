import { validateUser } from './validate.js'
import { getSessionData, getLocalData } from './storage.js'
import { addEventToElements, createElement, selectElement, setAttributes } from './addEvent.js'
import { Distraction } from './Class_Distraction.js'
import { setData, findAllObjectsByProperties, removeProperty } from './research.js'
import { renderElements } from './dom.js'

validateUser()

window.addEventListener("load", render)

function render() {
  try {
    const database = JSON.parse(getLocalData('database'))
    const userId = getSessionData('user')
    
    addClickEventToButton(userId, database)
    
    renderDistractions(userId, database)
  } catch (e) {
    console.log(e)
  }
}

function addClickEventToButton(userId, database) {
  if (!addClickEventToButton.added) {
    addClickEventToButton.added = true
    addEventToElements('#addDistraction', 'click', function() {
      sendData(userId, database)
    })
  }
}

function sendData(userId, database) {
  const input = selectElement('input[type="text"]')
  const { value } = input
  const distraction = new Distraction(userId, value)
  setData(database, 'distractions', distraction, input)
  render()
}

function renderDistractions(userId, database) {
  const distractions = findAllObjectsByProperties(database, 'distractions', {
    userId: userId
  })
  
  const ul = selectElement('ul')
  ul.innerHTML = ''
  
  renderElements(distractions, ({ id, text }) => {
    const div = createElement('div')
    const li = createElement('li')
    const input = createElement('input')
    
    li.textContent = text
    setAttributes(input, {
      'type': 'button',
      'name': 'removeDistraction',
      'id': id,
      'value': 'Concluído'
    })
    input.addEventListener('click', () => {
      removeProperty(database, 'distractions', 'id', id)
      renderDistractions(userId, database)
    })
    
    div.append(li, input)
    ul.appendChild(div)
  })
}