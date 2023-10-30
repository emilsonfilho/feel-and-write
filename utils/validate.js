import { navigate } from '../scripts/Navigate/index'
import { getSessionData } from '../scripts/Session/index.js'

export function validateEmail(email) {
  if (!email) {
    throw new Error('O e-mail é obrigatório.')
  }
  if (!isValidEmail(email)) {
    throw new Error('O e-mail não está no formato correto.')
  }
}

export function validatePassword(pass1, pass2) {
  if (!pass1 || !pass2) {
    throw new Error('Ambas as senhas são obrigatórias.')
  }
  if (pass1 !== pass2) {
    throw new Error('As senhas não coincidem.')
  }
  if (!isValidPassword(pass1)) {
    throw new Error('A senha deve ter pelo menos 8 dígitos.')
  }
}

export function validatePin(pin) {
  if (!pin) {
    throw new Error('Não pode ser vazio!')
  }
  if (pin.length !== 4) {
    throw new Error('O código de verificação deve conter 4 dígitos!')
  }
}

export const isEmpty = (value) => !value;

export const validateUser = () => !getSessionData('user') && (() => navigate('../index.html'))()

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  const passwordRegex = /^.{8,}$/;
  return passwordRegex.test(password)
}

