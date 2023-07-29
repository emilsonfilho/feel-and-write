import { addEventToElements, selectElement, createElement, setAttributes } from './addEvent.js'
import { validateUser } from './validate.js'
import { Action } from './Class_Action.js'
import { getSessionData, getLocalData } from './storage.js'
import { setData, findAllObjectsByProperties, removeProperty } from './research.js'
import { renderElements } from './dom.js'

validateUser()

window.addEventListener("load", render)

const schedules = {
  morning: 1,
  afternoon: 2,
  night: 3
};

function render() {
  try {
    const userId = getSessionData('user')
    const database = JSON.parse(getLocalData('database'))
    
    addClickEventsToButtons(userId, database)
    
    renderActions(userId, database, schedules.morning, 'morning');
    renderActions(userId, database, schedules.afternoon, 'afternoon');
    renderActions(userId, database, schedules.night, 'night');
  } catch (e) {
    console.log(e)
  }
}

const addClickEventsToButtons = (userId, database) => {
  if (!addClickEventsToButtons.added) {
    addClickEventsToButtons.added = true; 
    addEventToElements('input[name="add"]', 'click', function (event) {
      let { id: type } = event.target;
      type = type.split('add-')[1];
      sendData(userId, type, database);
    });
  }
}

function sendData(userId, type, database) {
  const input = selectElement(`input#${type}`)
  const { value } = input
  type = type.split('-')[0]
  const action = new Action(userId, type, value)
  setData(database, 'actions', action, input)
  render();
}

function renderActions(userId, database, scheduleId, sectionClass) {
  const actions = findAllObjectsByProperties(database, 'actions', {
    userId: userId,
    scheduleId: scheduleId
  });
  const ul = selectElement(`section.${sectionClass} > ul`);
  ul.innerHTML = '';

  renderElements(actions, ({ dailyTask, id }, index) => {
    const div = createElement('div');
    const li = createElement('li');
    const input = createElement('input');

    li.textContent = dailyTask;
    setAttributes(input, {
      'type': 'button',
      'name': `remove-${sectionClass}-action`,
      'id': id,
      'value': 'Remover'
    });
    input.addEventListener('click', () => {
      removeProperty(database, 'actions', 'id', id);
      renderActions(userId, database, scheduleId, sectionClass);
    });
    div.append(li, input);
    ul.appendChild(div);
  });
}
