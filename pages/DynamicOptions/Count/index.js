import { navigate } from '../../../navigation.js'
import { getSessionData, setSessionData } from '../../../storage.js'
import { addEventToElements } from '../../../addEvent.js'
import { isEmpty } from '../../../validate.js'
import { getCurrentPage } from '../../../dom.js'

const currentPage = getCurrentPage()

addEventToElements('#proceed', 'click', handleClick)

function containsLetters(inputValue) {
  return /[a-zA-Z]/.test(inputValue);
}

function handleClick() {
  try {
    const paramName = document.querySelector('#proceed').getAttribute('data-param');
    let iValue = document.querySelector(`#${paramName}`).value

    if (!iValue) {
      throw new Error('Input vazio!')
     }
     
    isEmpty(iValue) && (() => { throw new Error('O input não pode estar vazio.') })()
    
    iValue = !containsLetters(iValue) ? parseInt(iValue) : iValue
     
     const data = getSessionData('data')
     data[paramName] = iValue
     setSessionData('data', data)
     
     let nextPage = '';
     
     if (currentPage === 'gratitudeCount.html') {
       nextPage = 'intentionCount.html'
     } else if (currentPage === 'intentionCount.html') {
       nextPage = 'identification.html'
     } else if (currentPage === 'identification.html') {
       nextPage = 'pin.html'
     } else {
       nextPage = 'error404.html'
     }
 
     navigate(nextPage)
  } catch (e) {
    console.log(e)
  }
}