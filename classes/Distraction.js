import { Base } from './Base.js'

export class Distraction extends Base {
  constructor(userId, text) {
    super()
    this.id = this._getUniqueId('distractions')
    this.userId = userId
    this.text = text
  }
}