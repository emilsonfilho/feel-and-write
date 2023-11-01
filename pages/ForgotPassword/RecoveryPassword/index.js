import {
  getSessionData,
  setSessionData,
  getLocalData,
  setLocalData,
} from "../../../storage.js";
import { validatePassword } from "../../../validate.js";
import { encrypt } from "../../../encrypt.js";
import { navigate } from "../../../navigation.js";
import { addEventToElements } from "../../../addEvent.js";
import { findObjectByPropertyValue } from "../../../research.js";

const sessionUser = getSessionData("obj");

window.addEventListener("load", render);

addEventToElements("#alt", "click", alt);

function render() {
  try {
    const inputEmail = document.querySelector("#email");

    inputEmail.value = sessionUser.email;
  } catch (e) {
    console.log(e.message);
  }
}

async function alt() {
  try {
    const database = JSON.parse(getLocalData("database"));
    const userToUpdate = findObjectByPropertyValue(
      database,
      "users",
      "id",
      sessionUser.id,
    );
    const newPassword = await encrypt(
      document.querySelector("#newPassword").value,
    );
    const confirmPassword = await encrypt(
      document.querySelector("#confirmPassword").value,
    );

    validatePassword(newPassword, confirmPassword);
    userToUpdate.password = newPassword;
    setLocalData("database", database);
    setSessionData("user", userToUpdate.id);
    navigate("home.html");
  } catch (e) {
    console.log(e);
  }
}
