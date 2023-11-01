import { Dream } from "../../classes/Dream.js";

import { useAuth } from "../../hooks/useAuth.js";

import {
  formatDate,
  getFullDate,
  sortByField,
} from "../../scripts/Date/index.js";
import { addEventToElements } from "../../scripts/Dom/Add/index.js";
import { createElement } from "../../scripts/Dom/Create/index.js";
import { renderElements } from "../../scripts/Dom/Render/index.js";
import { selectElement } from "../../scripts/Dom/Select/index.js";
import { formatTime, getFormattedTime } from "../../scripts/Time/index.js";

import { validateUser } from "../../utils/validate.js";
import { api } from "../../database/api.js";
import { clearInput } from "../../utils/input.js";

validateUser();

window.addEventListener("load", render);

/**
 * Rendeer the registers of the dreams in cards
 */
function render() {
  const userId = useAuth();
  const date = getFullDate();
  const time = getFormattedTime();
  const { response: dreams } = api().get("dreams").where({ userId: userId });
  const section = selectElement("section.records");

  sortByField(dreams, "date");
  sortByField(dreams, "time");

  renderDreams(dreams, section);

  addClickEventsToButtons(date, time, userId);
}

/**
 * Adds events clicks to the button
 * @param {string} date
 * @param {string} time
 * @param {number} userId
 */
const addClickEventsToButtons = (date, time, userId) => {
  if (!addClickEventsToButtons.added) {
    addClickEventsToButtons.added = true;
    addEventToElements("#send", "click", () => {
      sendData(date, time, userId);
    });
  }
};

/**
 * Send data to the backend
 * @param {string} date
 * @param {string} time
 * @param {number} userId
 */
function sendData(date, time, userId) {
  const textarea = selectElement("textarea");
  const { value } = textarea;

  if (!value) {
    swal("Campo vazio!", "Por favor, insira um valor", "error");
    throw new Error("Não é possível inserir um valor vazio");
  }

  const dream = new Dream(userId, value, time, date);

  api().set("dreams").data(dream);
  clearInput(textarea);
  render();
}

/**
 * Render the cards of the dreams in the screen
 * @param {Dream} dreams
 * @param {Element} section
 */
function renderDreams(dreams, section) {
  section.innerHTML = "";
  renderElements(dreams, ({ text, time, date }) => {
    const title = `${formatDate(date)} - ${formatTime(time)}`;
    const aside = createElement("aside");
    const h3 = createElement("h3");
    const p = createElement("p");

    h3.textContent = title;
    p.textContent = text;

    aside.append(h3, p);
    section.appendChild(aside);
  });
}
