import { BaseClass } from './BaseClass.js'

export class DayToDay extends BaseClass {
  constructor(userId, text, time, date) {
    super()
    this.id = this._getUniqueId('dayToDays')
    this.userId = userId
    this.text = text
    this.time = time
    this.date = date
  }
}