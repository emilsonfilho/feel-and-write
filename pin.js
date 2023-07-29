import { validatePin } from './validate.js'
import { User } from './Class_User.js'
import initialDatabase from './initialDatabaseStructure.js'
import { navigate } from './navigation.js'
import { getSessionData, setSessionData, removeSessionData, getLocalData, setLocalData } from './storage.js'
import { encryptPin } from './encrypt.js'
import { addEventToElements } from './addEvent.js'

addEventToElements('#send', 'click', sendData)

function sendData() {
  try {
    const iValue = document.querySelector('#pin').value
    validatePin(iValue)
    const pin = encryptPin(Number(iValue)) 
    
    
    const data = getSessionData('data')
    const user = new User(data.email, data.password, data.name, pin, data.gratitudeCount, data.intentionCount)
    const database = JSON.parse(getLocalData('database') || JSON.stringify(initialDatabase))
    
    database.users.push(user)
    setLocalData('database', database)
    removeSessionData('data')
    setSessionData('user', user.id)
    navigate('home.html')
  } catch (e) {
    console.log('Erro ao enviar os dados:', e)
  }
}