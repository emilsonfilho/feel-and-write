import { navigate } from "../scripts/Navigate/index.js";
import { getSessionData } from "../scripts/Session/index.js";

/**
 * Verifies if an email is valid
 * @param {string} email 
 */
export function validateEmail(email) {
  if (!email) {
    swal('Campo inválido!', 'O e-mail é obrigatório.', 'error')
    throw new Error("O e-mail é obrigatório.");
  }
  if (!isValidEmail(email)) {
    swal('E-mail inválido!', 'O e-mail não está no formato correto.', 'error')
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
    swal('Senha incorreta!', 'Ambas as senhas são obrigatórias.', 'error')
    throw new Error("Ambas as senhas são obrigatórias.");
  }
  if (pass1 !== pass2) {
    swal("Senha incorreta!", "As senhas não coincidem", "error")
    throw new Error("As senhas não coincidem.");
  }
  if (!isValidPassword(pass1)) {
    swal('Senha incorreta!', 'A senha deve ter pelo menos 8 dígitos', 'error')
    throw new Error("A senha deve ter pelo menos 8 dígitos.");
  }
}

/**
 * Verifies is a pin is valid
 * @param {number} pin 
 */
export function validatePin(pin) {
  if (!pin) {
    swal("Pin inválido", "O campo de pin não pode ser vazio", "error")
    throw new Error("Não pode ser vazio!");
  }
  if (pin.length !== 4) {
    swal("Pin inválido", "Seu pin não pode conter menos de 4 dígitos!", "error")
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
  !getSessionData("user") && (() => navigate("../../index.html"))();

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
