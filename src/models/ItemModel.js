import BaseModel from './BaseModel';

export default class ItemModel extends BaseModel {
  constructor(db) {
    super({
      db,
      idPrefix: 'i',
    });
  }

  create(args) {
    const { collectionId } = args;
    const collection = this.db.get('collections').find({ id: collectionId }).value();
    
    if (!collection) {
      throw new Error(`Collection not found: ${args.collection}`);
    }

    let itemId = this.generateId();
    const timestamp = this.timestamp();
    const itemData = {
      id: itemId,
      collectionId,
      properties: {},
      createdAt: timestamp,
      updatedAt: timestamp
    };

    this.db.get('items').push(itemData).write();
    const item = this.db.get('items').find({ id: itemId }).value();

    if (!item) {
      throw new Error(`Error creating item`);
    }

    return item;
  }

  get(args) {
    const { collectionId } = args;
    let items = this.db.get('items');
    let related;
    
    if (collectionId && collectionId !== '') {
      items = items.filter({ collectionId });
    }

    if (args.related) {
      related = this.db.get('items').value()
    }

    return {
      items: items.value(),
      related,
    };
  }

  find(id) {
    return item = this.db.get('items').find({ id }).value();
  }

  update(id, properties) {
    const item = this.db.get('items').find({ id });
    const oldItem = item.value();

    if (!oldItem) {
      throw new Error(`Item not found: ${id}`);
    }

    const itemData = {
      ...oldItem,
      properties: {...oldItem.properties, ...properties},
      updatedAt: Date.now()
    };

    item.assign(itemData).write();

    return this.db.get('items').find({ id }).value();
  }

  delete(args) {
    const item = this.db.get('items').find({ id: args.id });
    const itemData = item.value();

    if (!itemData) {
      throw new Error(`Item not found: ${args.id}`);
    }

    this.db.get('items').remove({ id: args.id }).write();
    return this.db.get('items').find({ id: args.id }).value();
  }
}
