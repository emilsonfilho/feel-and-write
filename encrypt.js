export async function encrypt(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export function encryptPin(x) {
  const ln = x => Math.log(x);
  const log = x => Math.log10(x);
  const sin = x => Math.sin(x);
  const cos = x => Math.cos(x);
  
  const ln_x = ln(x);
  const log_x = log(x);
  const sin_x = sin(x);
  const cos_x = cos(x);
  
  const numerator = ((ln_x + x * log_x) * sin_x + 2 * ln_x + 2 * x + 2 * log_x - cos_x * Math.sqrt(x));
  const denominator = (ln_x + x + log_x) * cos_x;

  const result = numerator / denominator;
  return result;
}