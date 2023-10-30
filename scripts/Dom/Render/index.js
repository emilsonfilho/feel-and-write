import { api } from "../../../database/api.js";

import { changeState } from "../Change/index.js";

/**
 * Render the status of the section
 * @param {string} type - Type of the page [(Gratitude | Intention) | Checbox]
 * @param {number | null} userId 
 * @returns {void}
 */
export function renderStatus(type, userId = null) {
  let elementSelector, totalCount, checkedCount, missingCount, okMessage;

  if (type === "gratitude" || type === "intention") {
    elementSelector = `.${type}-article > p`;
    const listSelector = `#${type}-list li`;
    const countProp = `${type}Count`;
    checkedCount = document.querySelectorAll(listSelector).length;
    totalCount = api().get("users").where({ id: userId }).first().response[countProp];
    okMessage = "Você registrou todos os itens";
  } else if (type === "checkbox") {
    elementSelector = ".programmed-actions > p";
    checkedCount = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    ).length;
    const checkboxes = document.querySelectorAll(
      'input[type="checkbox"]'
    ).length;
    totalCount = checkboxes;
    okMessage = "Você concluiu todas as atividades programadas";
  } else {
    console.error("Tipo de contagem inválido");
    return;
  }

  missingCount = totalCount - checkedCount;
  const message =
    missingCount === 0
      ? `${okMessage}. Parabéns!`
      : `Faltando ${missingCount} item(ns) de ${totalCount}`;
  changeState(elementSelector, "textContent", message);
  missingCount === 0 &&
    (type === "gratitude" || type === "intention") &&
    (() => changeState(`.${type}-article > form`, "display", "none"))();
}

/**
 * Render elements
 * @param {Array} arr - An array with the elements to be renderized
 * @param {Function} forEachFunc - Function to be executed
 * @param {Function} aditionalFunc - Some function to be executed if it's necessary
 */
export const renderElements = (arr, forEachFunc, aditionalFunc = () => {}) => {
  arr.length !== 0 && arr.forEach(forEachFunc);
  aditionalFunc();
};
