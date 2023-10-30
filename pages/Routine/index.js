import { Action } from '../../classes/Action.js'

import { api } from '../../database/api.js'
import { useAuth } from '../../hooks/useAuth.js'

import { addEventToElements } from '../../scripts/Dom/Add/index.js'
import { createElement } from '../../scripts/Dom/Create/index.js'
import { renderElements } from '../../scripts/Dom/Render/index.js'
import { selectElement } from '../../scripts/Dom/Select/index.js'
import { setAttributes } from '../../scripts/Dom/Set/index.js'
import { clearInput } from '../../utils/input.js'

import { validateUser } from '../../utils/validate.js'

validateUser()

window.addEventListener("load", render)

const schedules = {
  morning: 1,
  afternoon: 2,
  night: 3
};

/**
 * Render the routine of the user
 */
function render() {
  try {
    const userId = useAuth();
    
    addClickEventsToButtons(userId)
    
    renderActions(userId, schedules.morning, 'morning');
    renderActions(userId, schedules.afternoon, 'afternoon');
    renderActions(userId, schedules.night, 'night');
  } catch (e) {
    console.log(e)
  }
}

const addClickEventsToButtons = (userId) => {
  if (!addClickEventsToButtons.added) {
    addClickEventsToButtons.added = true; 
    addEventToElements('input[name="add"]', 'click', function (event) {
      let { id: type } = event.target;
      type = type.split('add-')[1];
      sendData(userId, type);
    });
  }
}

/**
 * Send data to the backend
 * @param {number} userId 
 * @param {string} type - Morning / Afternoon / Night
 */
function sendData(userId, type) {
  const input = selectElement(`input#${type}`)
  const { value } = input
  type = type.split('-')[0]
  const action = new Action(userId, type, value)
  api().set('actions').data(action)
  clearInput(input)
  render();
}

function renderActions(userId, scheduleId, sectionClass) {
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
