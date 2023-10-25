import initialDatabase from '../../initialDatabaseStructure.js';
import Log from '../../log.js';
import { encrypt } from '../../encrypt.js';
import { validateEmail, validatePassword } from '../../validate.js';
import { findObjectByPropertyValue } from '../../research.js';
import { navigate } from '../../navigation.js';
import { setSessionData, getLocalData } from '../../storage.js';
import { addEventToElements } from '../../addEvent.js';

addEventToElements('#access', 'click', handleClick)

async function handleClick() {
  const storeEncryptedData = async (email, password) => {
    try {
      const encryptedPassword = await encrypt(password);
      const data = {
        email: email,
        password: encryptedPassword
      };
      setSessionData('data', data)
    } catch (error) {
      throw new Error('Erro ao criptografar a senha.')
    }
  }
  
  const email = document.getElementById('email').value;
  const password_1 = document.getElementById('password').value;
  const password_2 = document.getElementById('confirmPassword').value;

  try {
    validateEmail(email);
    validatePassword(password_1, password_2);

    const encryptedPassword = await encrypt(password_1);
    const data = {
      email: email,
      senha: encryptedPassword
    };

    const database = JSON.parse(getLocalData('database') || JSON.stringify(initialDatabase));

    if (!findObjectByPropertyValue(database, 'users', 'email', email)) {
      await storeEncryptedData(email, password_1);
      navigate('showDynamicOptions.html');
    } else {
      throw new Error('Já possui usuário no banco de dados!')
    }
  } catch (e) {
    console.log(e);
  }
}

