/**
 * Encrypts an string
 * @param {string} data - String to be encrypted
 * @returns {string}
 */
export async function encrypt(data) {
  const encoder = new TextEncoder();
  const data = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export function encryptPin(pin) {
  const ln = (pin) => Math.log(pin);
  const log = (pin) => Math.log10(pin);
  const sin = (pin) => Math.sin(pin);
  const cos = (pin) => Math.cos(pin);

  const ln_pin = ln(pin);
  const log_pin = log(pin);
  const sin_pin = sin(pin);
  const cos_pin = cos(pin);

  const numerator =
    (ln_pin + pin * log_pin) * sin_pin +
    2 * ln_pin +
    2 * pin +
    2 * log_pin -
    cos_pin * Math.sqrt(pin);
  const denominator = (ln_pin + pin + log_pin) * cos_pin;

  const result = numerator / denominator;
  return result;
}
