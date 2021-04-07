import BaseModel from './BaseModel';

class ItemResolver extends BaseModel {
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
      fields: {},
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
    console.log({args})
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

  find(args) {
    const item = this.db.get('items').find({ id: args.id }).value();

    if (!item) {
      throw new Error(`Item not found: ${args.id}`);
    }

    const collection = this.db.get('collections').find({ id: item.collectionId }).value();

    if (!collection) {
      throw new Error(`Collection not found: ${item.collectionId}`);
    }

    return {
      ...item,
      collection
    };
  }

  update(args) {
    const { collectionId } = args;
    const collection = this.db.get('collections').find({ id: collectionId }).value();
    
    if (!collection) {
      throw new Error(`Collection not found: ${args.collectionId}`);
    }

    const item = this.db.get('items').find({ id: args.id });
    const oldItem = item.value();

    if (!oldItem) {
      throw new Error(`Item not found: ${args.id}`);
    }

    const timestamp = this.timestamp(); 
    const itemData = {
      ...oldItem,
      collectionId: oldItem.collectionId,
      fields: args.fields,
      updatedAt: timestamp
    };

    item.assign(itemData).write();

    return this.db.get('items').find({ id: args.id }).value();
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

export default ItemResolver;
