import { addEventToElements } from '../../scripts/Dom/Add/index.js'
import { navigate } from '../../scripts/Navigate/index.js'

addEventToElements('#iproceed', 'click', handleClick)

/**
 * Sets the next page to the button
 */
function handleClick() {
  navigate('./Count/GratitudeCount/index.html')
}