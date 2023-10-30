import { api } from '../database/api.js';

export class User {
  _getUserId() {
    const apiResponse = api();

    if (apiResponse.error) {
      return 1
    } else {
      return apiResponse.get('users').response.length + 1
    }
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