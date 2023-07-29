import { BaseClass } from './BaseClass.js'

export class Distraction extends BaseClass {
  constructor(userId, text) {
    super()
    this.id = this._getUniqueId('distractions')
    this.userId = userId
    this.text = text
  }
}