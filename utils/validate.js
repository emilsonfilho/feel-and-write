import { navigate } from "../scripts/Navigate/index";
import { getSessionData } from "../scripts/Session/index.js";

/**
 * Verifies if an email is valid
 * @param {string} email 
 */
export function validateEmail(email) {
  if (!email) {
    throw new Error("O e-mail é obrigatório.");
  }
  if (!isValidEmail(email)) {
    throw new Error("O e-mail não está no formato correto.");
  }
}

/**
 * Verifies if two passwords are equal
 * @param {string} pass1 
 * @param {string} pass2 
 */
export function validatePassword(pass1, pass2) {
  if (!pass1 || !pass2) {
    throw new Error("Ambas as senhas são obrigatórias.");
  }
  if (pass1 !== pass2) {
    throw new Error("As senhas não coincidem.");
  }
  if (!isValidPassword(pass1)) {
    throw new Error("A senha deve ter pelo menos 8 dígitos.");
  }
}

/**
 * Verifies is a pin is valid
 * @param {number} pin 
 */
export function validatePin(pin) {
  if (!pin) {
    throw new Error("Não pode ser vazio!");
  }
  if (pin.length !== 4) {
    throw new Error("O código de verificação deve conter 4 dígitos!");
  }
}

/**
 * Verifies if a string a value exists
 * @param {any} value 
 * @returns {boolean}
 */
export const isEmpty = (value) => !value;

/**
 * Validates if the user is valid
 * @returns {boolean}
 */
export const validateUser = () =>
  !getSessionData("user") && (() => navigate("../index.html"))();

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Verifies if a password is valid
 * @param {string} password 
 * @returns {boolean}
 */
function isValidPassword(password) {
  const passwordRegex = /^.{8,}$/;
  return passwordRegex.test(password);
}
