import { api } from "../../../database/api.js";

import { formatDate, sortByField } from "../../../scripts/Date/index.js";
import { createElement } from "../../../scripts/Dom/Create/index.js";
import { getCurrentPage } from "../../../scripts/Dom/CurrentPage/index.js";
import { renderElements } from "../../../scripts/Dom/Render/index.js";
import { selectElement } from "../../../scripts/Dom/Select/index.js";
import { getSessionData } from "../../../scripts/Session/index.js";

import { validateUser } from "../../../utils/validate.js";

validateUser();
const currentPage = getCurrentPage();

window.addEventListener("load", render);

/**
 * Render the elements
 */
function render() {
  try {
    const userId = getSessionData("user");

    setTypePage(userId);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Render the page according specific types
 * @param {string} type - Specifies which page is to be showed
 * @param {number} userId
 */
function specificRender(type, userId) {
  let { response } = api().get(type).where({ userId: userId });
  const section = selectElement("section");

  sortByField(response, "date");
  sortByField(response, "time");

  renderObjects(response, section);
}

/**
 * Render the objects received from the backend
 * @param {Array} objects - An object of arrays according data received from the backend
 * @param {Element} container - Element to the content be showed
 */
function renderObjects(objects, container) {
  container.innerHTML = "";
  objects = groupObjectsByText(objects);

  renderElements(objects, ({ date, texts }) => {
    const aside = createElement("aside");
    const h3 = createElement("h3");

    h3.textContent = formatDate(date);

    aside.appendChild(h3);

    texts.forEach((text) => {
      const p = createElement("p");
      p.textContent = text;
      aside.appendChild(p);
    });

    container.appendChild(aside);
  });
}

/**
 * Group the objects in alfabetical order
 * @param {Array} objects - Array objects
 * @returns {Array}
 */
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

/**
 * which page is to show
 * @param {number} userId
 */
function setTypePage(userId) {
  switch (currentPage) {
    case "Gratitude":
      specificRender("gratitudes", userId);
      break;
    case "Intention":
      specificRender("intentions", userId);
      break;
    default:
      throw new Error("Página desconhecida");
  }
}
