import { validateUser } from './validate.js'
import { getSessionData, getLocalData } from './storage.js'
import { findAllObjectsByProperties, setData } from './research.js'
import { addEventToElements, selectElement, createElement, setAttributes } from './addEvent.js'
import { getFullDate, sortByField, formatDate } from './date.js'
import { getFormattedTime, formatTime } from './time.js'
import { DayToDay } from './classes/DayToDay.js'
import { renderElements } from './dom.js'

validateUser()

window.addEventListener("load", render)

function render() {
  try {
    const database = JSON.parse(getLocalData('database'))
    const userId = getSessionData('user')
    const main = selectElement('main')
    const date = getFullDate()
    const time = getFormattedTime()
    const registers = findAllObjectsByProperties(database, 'dayToDays', {
      userId: userId
    })
    sortByField(registers, 'date')
    sortByField(registers, 'time')
    
    renderRegisters(registers, main)
    
    addClickEventsToButtons(database, date, time, userId)
  } catch (e) {
    console.log(e)
  }
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
  const register = new DayToDay(userId, value, time, date)
  
  setData(database, 'dayToDays', register, textarea)
  render()
}

function renderRegisters(registers, main) {
  main.innerHTML = ''
  renderElements(registers, ({ text, time, date }, index) => {
    const section = createElement('section')
    const title = `${formatDate(date)} - ${formatTime(time)}`
    const h2 = createElement('h2')
    const p = createElement('p')
    
    h2.textContent = title
    p.textContent = text
    setPosition(section)
    setBackgroundColor(section)
    
    section.append(h2, p)
    main.appendChild(section)
  })
}

function setPosition(element) {
  const num = Math.floor(Math.random() * 2)
  
  num === 0 ? setAttributes(element, {
    'class': 'left'
  }) : setAttributes(element, {
    'class': 'right'
  })
}

function setBackgroundColor(element) {
  const num = Math.floor(Math.random() * 5)
  
  switch (num) {
    case 0:
      element.style.backgroundColor = '#f75c035b'
      break;
    case 1:
      element.style.backgroundColor = '#d903685b'
      break;
    case 2:
      element.style.backgroundColor = '#8202635b'
      break;
    case 3:
      element.style.backgroundColor = '#04a7775b'
      break;
    case 4:
      element.style.backgroundColor = '#2917205b'
      break;
    default:
      throw new Error('Cor não existente')
  }
}