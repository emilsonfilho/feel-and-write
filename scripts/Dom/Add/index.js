import { selectElement } from "../Select/index.js";
import {
  createCheckbox,
  createDivWithClass,
  createElement,
  createLabel,
} from "../Create/index.js";

/**
 * Adds checkboxes according data from the backend
 * @param {string} query - The querySelector query to get the element in DOM
 * @param {string} name - Name of the checkbox
 * @param {object} param2 - An database result object
 * @param {string} today - An string which contains today date
 */
export function addCheckbox(
  query,
  name,
  { id, dailyTask, lastOccurrence },
  today,
) {
  const container = selectElement(query);
  const div = createDivWithClass("wrapper");
  const checkbox = createCheckbox(name, id, today);
  const label = createLabel(id, dailyTask);

  lastOccurrence === today && (() => (checkbox.checked = true))();

  div.append(checkbox, label);
  container.appendChild(div);
}

/**
 * Adds a List Element in the screen
 * @param {string} query
 * @param {object} param1 - An object with the text of the Li
 */
export function addLi(query, { text }) {
  const container = selectElement(query);
  const li = createElement("li");
  li.textContent = text;
  container.appendChild(li);
}

/**
 * Add Events to elements
 * @param {string} query
 * @param {string} eventType - Event to be added
 * @param {Function} func - An function to the AddEventListener
 */
export function addEventToElements(query, eventType, func) {
  const elements = Array.from(document.querySelectorAll(query));
  elements.forEach((element) => {
    element.addEventListener(eventType, func);
  });
}
