import { DayToDay } from "../../classes/DayToDay.js";

import { api } from "../../database/api.js";

import { useAuth } from "../../hooks/useAuth.js";

import {
  getFullDate,
  sortByField,
  formatDate,
} from "../../scripts/Date/index.js";
import { addEventToElements } from "../../scripts/Dom/Add/index.js";
import { createElement } from "../../scripts/Dom/Create/index.js";
import { renderElements } from "../../scripts/Dom/Render/index.js";
import { selectElement } from "../../scripts/Dom/Select/index.js";
import { setAttributes } from "../../scripts/Dom/Set/index.js";
import { getFormattedTime, formatTime } from "../../scripts/Time/index.js";

import { validateUser } from "../../utils/validate.js";
import { clearInput } from "../../utils/input.js";

validateUser();

window.addEventListener("load", render);

/**
 * Render the elements
 */
function render() {
  try {
    const userId = useAuth();
    const main = selectElement("main");
    const date = getFullDate();
    const time = getFormattedTime();
    const { response: registers } = api()
      .get("dayToDays")
      .where({ userId: userId });
    sortByField(registers, "date");
    sortByField(registers, "time");

    renderRegisters(registers, main);

    addClickEventsToButtons(date, time, userId);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Add click events to buttons
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
    swal("Campo vazio!", "Por favor, insira um valor", "error")
    throw new Error("Não é possível inserir um valor vazio!")
  }

  const register = new DayToDay(userId, value, time, date);

  api().set("dayToDays").data(register);
  clearInput(textarea);
  render();
}

/**
 * Render the registers
 * @param {Array} registers - an array of registers to show
 * @param {Element | null} main
 */
function renderRegisters(registers, main) {
  main.innerHTML = "";
  renderElements(registers, ({ text, time, date }) => {
    const section = createElement("section");
    const title = `${formatDate(date)} - ${formatTime(time)}`;
    const h2 = createElement("h2");
    const p = createElement("p");

    h2.textContent = title;
    p.textContent = text;
    setPosition(section);
    setBackgroundColor(section);

    section.append(h2, p);
    main.appendChild(section);
  });
}

/**
 * Set the position of the created card
 * @param {Element} element
 */
function setPosition(element) {
  const num = Math.floor(Math.random() * 2);

  num === 0
    ? setAttributes(element, {
        class: "left",
      })
    : setAttributes(element, {
        class: "right",
      });
}

/**
 * Set background-color of the card of the registers
 * @param {Element} element
 */
function setBackgroundColor(element) {
  const num = Math.floor(Math.random() * 5);

  switch (num) {
    case 0:
      element.style.backgroundColor = "#f75c035b";
      break;
    case 1:
      element.style.backgroundColor = "#d903685b";
      break;
    case 2:
      element.style.backgroundColor = "#8202635b";
      break;
    case 3:
      element.style.backgroundColor = "#04a7775b";
      break;
    case 4:
      element.style.backgroundColor = "#2917205b";
      break;
    default:
      throw new Error("Cor não existente");
  }
}
