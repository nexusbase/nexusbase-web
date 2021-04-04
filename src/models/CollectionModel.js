import BaseModel from './BaseModel';
import ViewModel from './ViewModel';

export default class CollectionModel extends BaseModel {
  constructor(db) {
    super({
      db,
      idPrefix: 'c',
    });
  }

  relatedCollections(collection) {
    let related = [];
    const relationFields = collection.fields.filter(field => field.type === 'relation');
      
    if (relationFields.length > 0) {
      const relatedCollectionIds = relationFields.map(field => field.options.collectionId);
      
      const relatedCollections = this.db.get('collections').filter(relatedCollection => {
        return relatedCollectionIds.includes(relatedCollection.id);
      });
  
      related = relatedCollections.value();
    }
  
    return related;
  }

  create({ workspaceId, name, description = '' }) {
    // todo: workspace exists
    const collectionId = this.generateId();
    const viewModel = new ViewModel(this.db);
    const view = viewModel.create({
      collectionId,
      fields: ['f1'],
      options: {
        groupBy: null
      }
    });
    
    const timestamp = Date.now();
    const collectionData = {
      id: collectionId,
      workspaceId,
      name,
      description,
      fields: [
        {
          id: 'f1',
          type: 'line',
          label: 'Title'
        }
      ],
      titleField: 'f1',
      defaultView: view.id,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    this.db.get('collections').push(collectionData).write();

    const collection = this.db.get('collections').find({ id: collectionId }).value();
    
    return {
      ...collection,
      views: [view]
    };
  }

  get(workspaceId) {
    return this.db.get('collections').filter({ workspaceId }).value();
  }
  
  find(id) {
    const collection = this.db.get('collections').find({ id }).value();
    return {
      ...collection,
      related: this.relatedCollections(collection),
    };
  }

  updateField(args) {
    const { collectionId, fieldId, data: updatedField } = args;
    const collectionRef = this.db.get('collections').find({ id: collectionId });
    let collection = collectionRef.value();
    
    if (!collection) {
      throw new Error(`Collection not found: ${collectionId}`);
    }

    const field = collection.fields.find(field => field.id === fieldId);

    if (!field) {
      throw new Error(`Collection [${collectionId}] field not found [${fieldId}]`);
    }

    const fieldIndex = collection.fields.findIndex(field => field.id === fieldId);
    const timestamp = Date.now();
    collection.fields[fieldIndex] = { ...updatedField, id: fieldId };
    collection.updatedAt = timestamp;

    collectionRef.assign(collection).write();
    
    const views = this.db.get('views').filter({ collectionId: collection.id }).value();
    
    return {
      collection: { ...collectionRef.value(), views },
      related: this.relatedCollections(collection)
    };
  }
}
