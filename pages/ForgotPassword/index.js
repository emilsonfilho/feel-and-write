import { api } from "../../database/api.js";
import { addEventToElements } from "../../scripts/Dom/Add/index.js";
import { encryptPin } from "../../scripts/Encryption/index.js";
import { navigate } from "../../scripts/Navigate/index.js";
import { setSessionData } from "../../scripts/Session/index.js";

import { isEmpty } from "../../utils/validate.js";

addEventToElements("#check", "click", check);

/**
 * Checks that the pin exists in the database and that it is the same as the one defined by the user
 */
function check() {
  try {
    const inputArray = document.querySelectorAll('input[name="digit"]');
    const pin = encryptPin(
      Number(
        Array.from(inputArray)
          .map((input) => input.value)
          .join("")
      )
    );
    const result = api().get("users").where({ verifyCode: pin }).first();
    let user;

    if (result.error) {
      throw new Error("PIN não encontrado no banco de dados.");
    } else {
      user = result.response;
    }

    setSessionData("obj", {
      id: user.id,
      email: user.email,
    });

    navigate("./RecoveryPassword/index.html");
  } catch (e) {
    console.log(e);
  }
}
