import { addEventToElements } from '../../../scripts/Dom/Add/index.js'
import { getCurrentPage } from '../../../scripts/Dom/CurrentPage/index.js'
import { selectElement } from '../../../scripts/Dom/Select/index.js'
import { navigate } from '../../../scripts/Navigate/index.js'
import { getSessionData, setSessionData } from '../../../scripts/Session/index.js'

import { isEmpty } from '../../../utils/validate.js'

const currentPage = getCurrentPage()

addEventToElements('#proceed', 'click', handleClick)

/**
 * Verifies if the string correspondes to the regex offered
 * @param {string} inputValue 
 * @returns {boolean}
 */
function containsLetters(inputValue) {
  return /[a-zA-Z]/.test(inputValue);
}

/**
 * Changes the destination page by the current user page
 */
function handleClick() {
  try {
    const paramName = selectElement('#proceed').getAttribute('data-param')
    let { value: iValue } = selectElement(paramName)

    if (!iValue) {
      throw new Error('Input vazio!')
     }
     
    isEmpty(iValue) && (() => { throw new Error('O input não pode estar vazio.') })()
    
    iValue = !containsLetters(iValue) ? parseInt(iValue) : iValue
     
     const data = getSessionData('data')
     data[paramName] = iValue
     setSessionData('data', data)
     
     let nextPage = '';
     
     if (currentPage === 'GratitudeCount') {
       nextPage = './IntentionCount/index.html'
     } else if (currentPage === 'IntentionCount') {
       nextPage = '../Identification/index.html'
     } else if (currentPage === 'Identification') {
       nextPage = '../Pin/index.html'
     } else {
       nextPage = '../../Error404/index.html'
     }
 
     navigate(nextPage)
  } catch (e) {
    console.log(e)
  }
}