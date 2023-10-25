import { Base } from './Base.js'

export class Intention extends Base {
  constructor(userId, text, time, date) {
    super()
    this.id = this._getUniqueId('intentions')
    this.userId = userId
    this.text = text
    this.time = time
    this.date = date
  }
}