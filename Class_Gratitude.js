import { BaseClass } from './BaseClass.js'

export class Gratitude extends BaseClass {
  constructor(userId, text, time, date) {
    super()
    this.id = this._getUniqueId('gratitudes')
    this.userId = userId
    this.text = text
    this.time = time
    this.date = date
  }
}