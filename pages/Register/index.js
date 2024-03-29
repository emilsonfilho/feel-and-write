import { api } from "../../database/api.js";

import { encrypt } from "../../scripts/Encryption/index.js";
import { addEventToElements } from "../../scripts/Dom/Add/index.js";
import { navigate } from "../../scripts/Navigate/index.js";
import { setSessionData } from "../../scripts/Session/index.js";

import { validateEmail, validatePassword } from "../../utils/validate.js";
import { selectElement } from "../../scripts/Dom/Select/index.js";

addEventToElements("#access", "click", handleClick);

/**
 * Introduce the register of the user clicking at the button
 */
async function handleClick() {
  const storeEncryptedData = async (email, password) => {
    try {
      const encryptedPassword = await encrypt(password);
      const sessionData = {
        email: email,
        password: encryptedPassword,
      };
      setSessionData("data", sessionData);
    } catch (error) {
      throw new Error("Erro ao criptografar a senha.");
    }
  };

  const { value: email } = selectElement("#email");
  const { value: password_1 } = selectElement("#password");
  const { value: password_2 } = selectElement("#confirmPassword");

  try {
    validateEmail(email);
    validatePassword(password_1, password_2);

    const encryptedPassword = encrypt(password_1);
    const data = {
      email: email,
      senha: encryptedPassword,
    };

    const result = api();

    if (
      result.error ||
      result.get("users").where({ email: email }).response.length === 0
    ) {
      await storeEncryptedData(email, password_1);
      navigate("../DynamicOptions/index.html");
    } else {
      swal(
        "Falha na ligação",
        "Já existe um usuário cadastrado com esse e-mail!",
        "error",
      );
      throw new Error("Já possui usuário no banco de dados!");
    }
  } catch (e) {
    console.log(e);
  }
}
