import { BaseClass } from './BaseClass.js'

export class Action extends BaseClass {
  _getScheduleId(type) {
    let scheduleId = 0
  
    switch (true) {
      case type === 'morning': 
        scheduleId = 1
        break;
      case type === 'afternoon':
        scheduleId = 2
        break;
      case type === 'night':
        scheduleId = 3;
        break;
      default:
        throw new Error('Tipo inválido')
    }
    
    return scheduleId
  }
  
  constructor(userId, type, value) {
    super()
    this.id = this._getUniqueId('actions')
    this.userId = userId
    this.scheduleId = this._getScheduleId(type)
    this.dailyTask = value
    this.lastOccurrence = ''
  }
}