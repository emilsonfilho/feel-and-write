import { navigate } from '../../navigation.js'
import { addEventToElements } from '../../addEvent.js'

addEventToElements('#iproceed', 'click', handleClick)

function handleClick() {
  navigate('gratitudeCount.html')
}