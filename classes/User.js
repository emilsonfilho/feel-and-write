import { api } from '../database/api.js';
import initialValues from '../database/initialValues.js';

export class User {
  _getUserId() {
    return JSON.parse(!(api().error) || JSON.stringify(initialValues)).users.length + 1
  }
  
  constructor(email, password, nickname, verifyCode, gratitudeCount, intentionCount) {
    this.id = this._getUserId()
    this.email = email;
    this.password = password;
    this.nickname = nickname;
    this.verifyCode = verifyCode;
    this.gratitudeCount = gratitudeCount;
    this.intentionCount = intentionCount;
  }
}