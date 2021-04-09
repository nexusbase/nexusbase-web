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
    const relationProperties = collection.properties.filter(property => property.type === 'relation');
      
    if (relationProperties.length > 0) {
      const relatedCollectionIds = relationProperties.map(property => property.options.collectionId);
      
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
      properties: ['f1'],
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
      properties: [
        {
          id: 'f1',
          type: 'line',
          label: 'Title'
        }
      ],
      titleProperty: 'f1',
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

  updateProperty(args) {
    const { collectionId, propertyId, data: updatedProperty } = args;
    const collectionRef = this.db.get('collections').find({ id: collectionId });
    let collection = collectionRef.value();
    
    if (!collection) {
      throw new Error(`Collection not found: ${collectionId}`);
    }

    const property = collection.properties.find(property => property.id === propertyId);

    if (!property) {
      throw new Error(`Collection [${collectionId}] prop not found [${propertyId}]`);
    }

    const propertyIndex = collection.properties.findIndex(property => property.id === propertyId);
    const timestamp = Date.now();
    collection.properties[propertyIndex] = { ...updatedProperty, id: propertyId };
    collection.updatedAt = timestamp;

    collectionRef.assign(collection).write();
    
    const views = this.db.get('views').filter({ collectionId: collection.id }).value();
    
    return {
      collection: { ...collectionRef.value(), views },
      related: this.relatedCollections(collection)
    };
  }
}
