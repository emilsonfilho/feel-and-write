import { addEventToElements } from '../../addEvent.js'
import { encrypt } from '../../encrypt.js'
import { validateEmail, isEmpty } from '../../validate.js'
import { findObjectByPropertyValue } from '../../research.js'
import { setSessionData, getLocalData } from '../../storage.js'
import { navigate } from '../../navigation.js'

addEventToElements('#login-button', 'click', access)

async function access() {
  try {
    const email = document.querySelector('#email').value
    const password = await encrypt(document.querySelector('#password').value)
    
    validateEmail(email)
    isEmpty(password) && (() => { throw new Error('O campo de senha não foi preenchido.'); })();
    
    const user = findObjectByPropertyValue(JSON.parse(getLocalData('database')), 'users', 'email', email)
    
    if (user.password != password) {
      throw new Error('Senha incorreta.')
    }
    
    setSessionData('user', user.id)
    navigate('home.html')
  } catch (e) {
    console.log(e)
  }
  
}