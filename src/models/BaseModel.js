import { generateId } from "../utils";

export default class BaseModel  {
  constructor({db, idPrefix}) {
    this.db = db;
    this.idPrefix = idPrefix;
  }

  generateId() {
    return generateId(this.idPrefix);
  }

  timestamp() {
    return Date.now();
  }
}
