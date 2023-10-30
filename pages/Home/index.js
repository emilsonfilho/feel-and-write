import { Gratitude } from '../../classes/Gratitude.js';
import { Intention } from '../../classes/Intention.js';

import { useAuth } from '../../hooks/useAuth.js';

import { getFullDate } from '../../scripts/Date/index.js';
import { addCheckbox, addEventToElements,addLi } from '../../scripts/Dom/Add/index.js';
import { changeState } from '../../scripts/Dom/Change/index.js';
import { renderElements, renderStatus } from '../../scripts/Dom/Render/index.js';
import { selectElement } from '../../scripts/Dom/Select/index.js';
import { getFormattedTime } from '../../scripts/Time/index.js';

import { validateUser } from '../../utils/validate.js';
import { api } from '../../database/api.js';
import { clearInput } from '../../utils/input.js';


window.addEventListener("load", render);

validateUser()

const time = getFormattedTime()
const today = getFullDate()

/**
 * Render the home content
 */
function render() {
  try {
    const userId = useAuth();
    const drawn = Math.floor(Math.random() * 10) + 1;

    const { message } = api().get('messages').where({ id: drawn }).first().response;
    const { nickname } = api().get('users').where({ id: userId }).first().response;

    const { greet, color, timeOfDay } = adjustVariablesByTime(time);

    addClickEventsToButtons(userId, time, today);

    renderActions(timeOfDay, userId);
    renderGratitudes(userId);
    renderIntentions(userId);

    changeState('section.message > p', 'textContent', message);
    changeState('section.data > p', 'textContent', time);
    changeState('article.greets > p', 'textContent', `${greet}, ${nickname}!`);
    changeState('header', 'backgroundColor', color);
    changeState('footer', 'backgroundColor', color);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Add click event into the buttons
 * @param {string} userId 
 * @returns {Function}
 */
const addClickEventsToButtons = (userId) => addEventToElements('input[name="add"]', 'click', function(event) {
  let { id: type } = event.target;
  type = type.split('-')[1];
  sendData(type, userId);
});


/**
 * A function who adjust the layout according the hour of the day
 * @param {number} time - Hour
 * @returns {object}
 */
function adjustVariablesByTime(time) {
  const hours = Number(time.split(':')[0]);
  let greet, color, timeOfDay = '';

  switch (true) {
    case (hours >= 5 && hours < 12):
      greet = 'Bom dia';
      color = '#f75c03';
      timeOfDay = 'Morning';
      break;
    case (hours >= 12 && hours < 18):
      greet = 'Boa tarde';
      color = '#d90368';
      timeOfDay = 'Afternoon';
      break;
    default:
      greet = 'Boa noite';
      color = '#820263';
      timeOfDay = 'Night';
  }

  return { greet, color, timeOfDay };
}

/**
 * Render the actions of the user in the screen
 * @param {string} timeOfDay - Morning / Afternoon / Night
 * @param {number} userId 
 */
function renderActions(timeOfDay, userId) {
  const scheduleId = api().get('schedules').where({ timeOfDay: timeOfDay }).first().response.id
  const { response: actions } = api().get('actions').where({ scheduleId: scheduleId, userId: userId })

  renderElements(actions, action => {
    addCheckbox('.actions', 'action', action, today);
    renderStatus('checkbox');
  });
}

/**
 * Render the gratitudes of the user
 * @param {number} userId 
 */
function renderGratitudes(userId) { 
  const { response: gratitudes } = api().get('gratitudes').where({ userId: userId, date: today })

  renderElements(gratitudes, (gratitude => {
    addLi('#gratitude-list', gratitude);
    renderStatus('gratitude', userId);
  }));
}

/**
 * Render the intentions of the user
 * @param {number} userId 
 */
function renderIntentions(userId) {
  const { response: intentions } = api().get('intentions').where({ userId: userId, date: today })

  renderElements(intentions, (intention => {
    addLi('#intention-list', intention);
    renderStatus('intention', userId);
  }));
}

/**
 * Send data to the backend
 * @param {EventTarget} type 
 * @param {number} userId 
 */
function sendData(type, userId) {
  const input = selectElement(`input#${type}`)
  const { value } = input;
  let obj = {};

  if (type === 'gratitude') {
    obj = new Gratitude(userId, value, time, today);
  } else if (type === 'intention') {
    obj = new Intention(userId, value, time, today);
  } else {
    throw new Error('Tipo inválido.');
  }

  api().set(`${type}s`).data(obj)
  clearInput(input)
  addLi(`#${type}-list`, obj);
  renderStatus(type, userId);
}

