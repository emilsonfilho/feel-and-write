import { addEventToElements, selectElement, createElement, changeState } from './addEvent.js'
import { getSessionData, getLocalData } from './storage.js'
import { setData, findAllObjectsByProperties } from './research.js'
import { Dream } from './classes/Dream.js'
import { getFormattedTime, formatTime } from './time.js'
import { getFullDate, formatDate, sortByField } from './date.js'
import { renderElements } from './dom.js'
import { validateUser } from './validate.js'

validateUser()

window.addEventListener("load", render)

function render() {
  const userId = getSessionData('user')
  const database = JSON.parse(getLocalData('database'))
  const date = getFullDate()
  const time = getFormattedTime()
  const dreams = findAllObjectsByProperties(database, 'dreams', {
    userId: userId
  })
  const section = selectElement('section.records')
  
  sortByField(dreams, 'date')
  sortByField(dreams, 'time')
  
  renderDreams(dreams, section)
  
  addClickEventsToButtons(database, date, time, userId)
}

const addClickEventsToButtons = (database, date, time, userId) => {
  if (!addClickEventsToButtons.added) {
    addClickEventsToButtons.added = true; 
    addEventToElements('#send', 'click', () => {
      sendData(database, date, time, userId)
    })
  }
}

function sendData(database, date, time, userId) {
  const textarea = selectElement('textarea')
  const { value } = textarea
  const dream = new Dream(userId, value, time, date)
  
  setData(database, 'dreams', dream, textarea)
  render()
}

function renderDreams(dreams, section) {
  section.innerHTML = ''
  renderElements(dreams, ({ text, time, date }) => {
    const title = `${formatDate(date)} - ${formatTime(time)}`
    const aside = createElement('aside')
    const h3 = createElement('h3')
    const p = createElement('p')
    
    h3.textContent = title
    p.textContent = text
    
    aside.append(h3, p)
    section.appendChild(aside)
  })
}