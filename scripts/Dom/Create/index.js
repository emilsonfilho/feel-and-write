import { api } from "../../../database/api.js";

import { renderStatus } from "../Render/index.js";
import { setAttributes } from "../Set/index.js";

/**
 * Creates an element
 * @param {string} element - the query
 * @returns {Element} - created DOM Element
 */
export const createElement = (element) => document.createElement(element);

/**
 * Creates a checkbox with the corresponding events to be updated in the database
 * @param {string} name - Name of the checkbox
 * @param {number} id - Id of the element
 * @param {string} date - Date to be updated
 * @returns {Element}
 */
export function createCheckbox(name, id, date) {
  let checkbox = createElement("input");
  checkbox = setAttributes(checkbox, {
    type: "checkbox",
    name: name,
    id: id,
  });
  checkbox.addEventListener("change", () => {
    checkbox.checked = true;
    api().put("actions").where("id", id).to("lastOccurrence", date);
    renderStatus("checkbox");
  });
  return checkbox;
}

/**
 * Creates a label
 * @param {string} labelFor - Id to which the label corresponds
 * @param {string} text - Text of the label
 * @returns {Element}
 */
export function createLabel(forLabel, text) {
  let label = createElement("label");

  label = setAttributes(label, {
    for: forLabel,
  });

  label.textContent = text;
  return label;
}

/**
 * Creates a div
 * @param {string} cssClass - Class to stylize the div
 * @returns {Element}
 */
export function createDivWithClass(cssClass) {
  let div = createElement("div");
  div = setAttributes(div, {
    class: cssClass,
  });
  return div;
}
