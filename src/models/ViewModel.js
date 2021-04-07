import BaseModel from "./BaseModel";

export default class ViewModel extends BaseModel {
  constructor(db) {
    super({
      db,
      idPrefix: 'v',
    });
  }

  create({
    collectionId,
    name = '',
    type = 'list',
    fields,
    options = {}
  }) {

    const id = this.generateId();
    const timestamp = Date.now();
    const viewData = {
      id,
      collectionId,
      name,
      type,
      fields,
      options,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    this.db.get('views').push(viewData).write();
    
    return this.db.get('views').find({ id }).value();
  }

  get(collectionId) {
    return this.db.get('views').filter({ collectionId }).value();
  }

  find(id) {
    return this.db.get('views').find({ id }).value();
  }

  updateView(args) {
    const { id } = args;
    // todo: not found error
    this.find(id).assign({ ...args, updatedAt: Date.now() }).write();
    return db.find({ id: args.id }).value();
  }
}
