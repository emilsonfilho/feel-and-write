import { encryptPin } from './encrypt.js'
import { setSessionData, getLocalData } from './storage.js'
import { navigate } from './navigation.js'
import { addEventToElements } from './addEvent.js' 
import { isEmpty } from './validate.js'

addEventToElements('#check', 'click', check)

function check() {
  try {
    const inputArray = document.querySelectorAll('input[name="digit"]')
    const pin = encryptPin(Number(Array.from(inputArray).map(input => input.value).join('')))
    
    const { users } = JSON.parse(getLocalData('database'))
    const objFound = users.find(user => user.verifyCode === pin)
    
    isEmpty(objFound) && (() => { throw new Error('PIN não encontrado no banco de dados.') })()
   
    setSessionData('obj',{
      id: objFound.id,
      email: objFound.email
    })
    navigate('recoveryPassword.html')
  } catch (e) {
    console.log(e)
  }
}