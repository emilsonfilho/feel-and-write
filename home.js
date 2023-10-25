import { getFormattedTime } from './time.js';
import { getFullDate } from './date.js';
import { getSessionData, getLocalData, setLocalData } from './storage.js';
import { findObjectByPropertyValue, findAllObjectsByProperties, findAllObjectsInArray, setData } from './research.js';
import { changeState, addCheckbox, addLi, selectElement, addEventToElements } from './addEvent.js';
import { renderStatus, renderElements } from './dom.js';
import { Gratitude } from './classes/Gratitude.js';
import { Intention } from './classes/Intention.js';
import { validateUser } from './validate.js'

window.addEventListener("load", render);
validateUser()

function render() {
  try {
    const userId = getSessionData('user');
    const database = JSON.parse(getLocalData('database'));
    const drawn = Math.floor(Math.random() * 10) + 1;
    const { message } = findObjectByPropertyValue(database, 'messages', 'id', drawn);
    const { nickname } = findObjectByPropertyValue(database, 'users', 'id', userId);
    const time = getFormattedTime();
    const today = getFullDate();
    const { greet, color, timeOfDay } = adjustVariablesByTime(time);

    addClickEventsToButtons(database, userId, time, today);

    renderActions(database, timeOfDay, userId, today);
    renderGratitudes(database, userId, today);
    renderIntentions(database, userId, today);

    changeState('section.message > p', 'textContent', message);
    changeState('section.data > p', 'textContent', time);
    changeState('article.greets > p', 'textContent', `${greet}, ${nickname}!`);
    changeState('header', 'backgroundColor', color);
    changeState('footer', 'backgroundColor', color);
  } catch (e) {
    console.log(e);
  }
}

const addClickEventsToButtons = (database, userId, time, today) => addEventToElements('input[name="add"]', 'click', function(event) {
  let { id: type } = event.target;
  type = type.split('-')[1];
  sendData(type, database, userId, time, today);
});


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

function renderActions(database, timeOfDay, userId, today) {
  const { id: scheduleId } = findObjectByPropertyValue(database, 'schedules', 'timeOfDay', timeOfDay);
  const actions = findAllObjectsByProperties(database, 'actions', {
    scheduleId: scheduleId,
    userId: userId
  });

  renderElements(actions, (action, index) => {
    addCheckbox('.actions', 'action', action, database, today);
    renderStatus('checkbox');
  });
}

function renderGratitudes(database, userId, today) {
  const gratitudes = findAllObjectsByProperties(database, 'gratitudes', {
    userId: userId,
    date: today
  });

  renderElements(gratitudes, (gratitude => {
    addLi('#gratitude-list', gratitude);
    renderStatus('gratitude', userId, database);
  }));
}

function renderIntentions(database, userId, today) {
  const intentions = findAllObjectsByProperties(database, 'intentions', {
    userId: userId,
    date: today
  });

  renderElements(intentions, (intention => {
    addLi('#intention-list', intention);
    renderStatus('intention', userId, database);
  }));
}

function sendData(type, database, userId, time, today) {
  const input = selectElement(`input#${type}`);
  const { value } = input;
  let obj = {};

  if (type === 'gratitude') {
    obj = new Gratitude(userId, value, time, today);
  } else if (type === 'intention') {
    obj = new Intention(userId, value, time, today);
  } else {
    throw new Error('Tipo inválido.');
  }

  setData(database, `${type}s`, obj, input)
  addLi(`#${type}-list`, obj);
  renderStatus(type, userId, database);
}

