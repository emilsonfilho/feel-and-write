import { Base } from "./Base.js";

export class Dream extends Base {
  constructor(userId, text, time, date) {
    super();
    this.id = this._getUniqueId("dreams");
    this.userId = userId;
    this.text = text;
    this.time = time;
    this.date = date;
  }
}
