import { api } from "./database/api.js";

import { addEventToElements } from "./scripts/Dom/Add/index.js";
import { encrypt } from "./scripts/Encryption/index.js";
import { setSessionData } from "./scripts/Session/index.js";
import { navigate } from "./scripts/Navigate/index.js";

import { validateEmail, isEmpty } from "./utils/validate.js";

addEventToElements("#login-button", "click", login);

/*
 * Log user into the system
 */
async function login() {
  try {
    const email = document.querySelector("#email").value;
    const password = await encrypt(document.querySelector("#password").value);

    validateEmail(email);
    isEmpty(password) &&
      (() => {
        throw new Error("O campo de senha não foi preenchido.");
      })();

    const { response: user } = api()
      .get("users")
      .where({ email: email })
      .first();

    if (user.password != password) {
      swal('Campo inválido!', 'Senha incorreta', 'error')
      throw new Error("Senha incorreta.");
    }

    setSessionData("user", user.id);
    navigate("./pages/Home/index.html");
  } catch (e) {
    console.log(e);
  }
}
