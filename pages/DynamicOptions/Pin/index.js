import { User } from "../../../classes/User.js";
import { api } from "../../../database/api.js";

import initialDatabase from "../../../database/initialValues.js";

import { addEventToElements } from "../../../scripts/Dom/Add/index.js";
import { selectElement } from "../../../scripts/Dom/Select/index.js";
import { encryptPin } from "../../../scripts/Encryption/index.js";
import { navigate } from "../../../scripts/Navigate/index.js";
import {
  getSessionData,
  setSessionData,
  removeSessionData,
} from "../../../scripts/Session/index.js";

import { validatePin } from "../../../utils/validate.js";

addEventToElements("#send", "click", sendData);

/**
 * Send data to the backend
 */
function sendData() {
  try {
    const { value: iValue } = selectElement("#pin");
    validatePin(iValue);
    const pin = encryptPin(Number(iValue));

    const data = getSessionData("data");
    const user = new User(
      data.email,
      data.password,
      data.name,
      pin,
      data.gratitudeCount,
      data.intentionCount
    );

    const database = JSON.parse(
      JSON.stringify(api().response) || JSON.stringify(initialDatabase)
    );

    database.users.push(user);

    api().set("users").data(user);

    api().save(database);

    removeSessionData("data");
    setSessionData("user", user.id);
    navigate("../../Home/index.html");
  } catch (e) {
    console.log("Erro ao enviar os dados:", e);
  }
}
