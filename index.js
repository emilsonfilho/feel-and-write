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
    const password = document.querySelector("#password").value;
    const encryptedPassword = await encrypt(password);

    validateEmail(email);
    isEmpty(password) &&
      (() => {
        swal(
          "Senha incorreta!",
          "O campo de senha não foi preenchido",
          "error"
        );
        throw new Error("O campo de senha não foi preenchido.");
      })();

    const result = api();

    if (result.error) {
      swal("Não disponível", "Por favor, crie um usuário", "error");
      // testar se existir um usuário e a senha não coincidir com a que tem no banco de dados
      // Fazer uma verificação para sempre que os campos de inputs estiverem vazios para que eles não adicionem um valor
    }

    const { response: user } = api()
      .get("users")
      .where({ email: email })
      .first();

    if (user.password != encryptedPassword) {
      swal("Campo inválido!", "Senha incorreta", "error");
      throw new Error("Senha incorreta.");
    }

    setSessionData("user", user.id);
    navigate("./pages/Home/index.html");
  } catch (e) {
    console.log(e);
  }
}
