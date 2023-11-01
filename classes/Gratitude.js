import { Base } from "./Base.js";

export class Gratitude extends Base {
  constructor(userId, text, time, date) {
    super();
    this.id = this._getUniqueId("gratitudes");
    this.userId = userId;
    this.text = text;
    this.time = time;
    this.date = date;
  }
}
