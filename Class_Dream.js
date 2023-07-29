import { getLocalData } from './storage.js'

export class Dream {
  _getDreamId() {
    return JSON.parse(getLocalData('database')).dreams.length + 1
  }
  
  constructor(userId, text, time, date) {
    this.id = this._getDreamId()
    this.userId = userId
    this.text = text
    this.time = time
    this.date = date
  }
}