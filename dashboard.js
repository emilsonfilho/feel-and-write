import { findAllObjectsByProperties } from './research.js';
import { formatDate, sortByField } from './date.js';
import { getCurrentPage, renderElements } from './dom.js';
import { getSessionData, getLocalData } from './storage.js';
import { selectElement, createElement } from './addEvent.js';
import { validateUser } from './validate.js';

validateUser();
const currentPage = getCurrentPage();

window.addEventListener("load", render);

function render() {
  try {
    const userId = getSessionData('user');
    const database = JSON.parse(getLocalData('database'));

    setTypePage(database, userId);
  } catch (e) {
    console.log(e);
  }
}

function specificRender(type, database, userId) {
  let objects = findAllObjectsByProperties(database, type, {
    userId: userId
  });
  const section = selectElement('section');

  sortByField(objects, 'date');
  sortByField(objects, 'time');

  renderObjects(objects, section);
}

function renderObjects(objects, container) {
  container.innerHTML = '';
  objects = groupObjectsByText(objects);

  renderElements(objects, ({ date, texts }) => {
    const aside = createElement('aside');
    const h3 = createElement('h3');

    h3.textContent = formatDate(date);

    aside.appendChild(h3);

    texts.forEach(text => {
      const p = createElement('p');
      p.textContent = text;
      aside.appendChild(p);
    });

    container.appendChild(aside);
  });
}

function groupObjectsByText(objects) {
  const groupedByDate = {};

  objects.forEach(({ date, text }) => {
    if (groupedByDate[date]) {
      groupedByDate[date].push(text);
    } else {
      groupedByDate[date] = [text];
    }
  });

  const resultArray = Object.entries(groupedByDate).map(([date, texts]) => ({
    date,
    texts,
  }));

  return resultArray;
}

function setTypePage(database, userId) {
  switch (currentPage) {
    case 'gratitude.html':
      specificRender('gratitudes', database, userId);
      break;
    case 'intention.html':
      specificRender('intentions', database, userId);
      break;
    default:
      throw new Error('Página desconhecida');
  }
}
