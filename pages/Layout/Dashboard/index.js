import { api } from '../../../database/api.js';

import { formatDate, sortByField } from '../../../scripts/Date/index.js';
import { createElement } from '../../../scripts/Dom/Create/index.js';
import { getCurrentPage } from '../../../scripts/Dom/CurrentPage/index.js'
import { renderElements } from '../../../scripts/Dom/Render/index.js';
import { selectElement } from '../../../scripts/Dom/Select/index.js';
import { getSessionData } from '../../../scripts/Session/index.js';

import { validateUser } from '../../../utils/validate.js';

validateUser();
const currentPage = getCurrentPage();

window.addEventListener("load", render);

/**
 * Render the elements
 */
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
    case '../Gratitude/index.html':
      specificRender('gratitudes', database, userId);
      break;
    case '../Intention/index.html':
      specificRender('intentions', database, userId);
      break;
    default:
      throw new Error('Página desconhecida');
  }
}
