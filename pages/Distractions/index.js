import { Distraction } from "../../classes/Distraction.js";

import { api } from "../../database/api.js";

import { useAuth } from "../../hooks/useAuth.js";

import { addEventToElements } from "../../scripts/Dom/Add/index.js";
import { createElement } from "../../scripts/Dom/Create/index.js";
import { renderElements } from "../../scripts/Dom/Render/index.js";
import { selectElement } from "../../scripts/Dom/Select/index.js";
import { setAttributes } from "../../scripts/Dom/Set/index.js";

import { clearInput } from "../../utils/input.js";
import { validateUser } from "../../utils/validate.js";

validateUser();

window.addEventListener("load", render);

/**
 * Render the elements
 */
function render() {
  try {
    const userId = useAuth();

    addClickEventToButton(userId);

    renderDistractions(userId);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Add click event to the button
 * @param {number} userId
 */
function addClickEventToButton(userId) {
  if (!addClickEventToButton.added) {
    addClickEventToButton.added = true;
    addEventToElements("#addDistraction", "click", function () {
      sendData(userId);
    });
  }
}

/***
 * Send data to the backend
 */
function sendData(userId) {
  const input = selectElement('input[type="text"]');
  const { value } = input;
  const distraction = new Distraction(userId, value);
  api().set("distractions").data(distraction);
  clearInput(input);
  render();
}

function renderDistractions(userId) {
  const { response: distractions } = api()
    .get("distractions")
    .where({ userId: userId });

  const ul = selectElement("ul");
  ul.innerHTML = "";

  renderElements(distractions, ({ id, text }) => {
    const div = createElement("div");
    const li = createElement("li");
    const input = createElement("input");

    li.textContent = text;
    setAttributes(input, {
      type: "button",
      name: "removeDistraction",
      id: id,
      value: "Concluído",
    });
    input.addEventListener("click", () => {
      api().destroy().table("distractions"), where("id", id);
      renderDistractions(userId);
    });

    div.append(li, input);
    ul.appendChild(div);
  });
}
