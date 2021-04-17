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

  updateDetails(collectionId, details) {
    const collectionRef = this.db.get('collections').find({ id: collectionId });
    let collection = collectionRef.value();
    
    if (!collection) {
      throw new Error(`Collection not found: ${collectionId}`);
    }

    const updatedDetails = {
      name: details.name || collection.name,
      description: details.description || collection.description,
      titleProperty: details.titleProperty || collection.titleProperty,
    };
    collection.updatedAt = Date.now();

    collectionRef.assign({ ...collection, ...updatedDetails }).write();
    
    return collectionRef.value();
  }

  /*
  addProperty(args) {
    const { collectionId } = args;
    const collectionRef = this.db.get('collections').find({ id: collectionId });
    let collection = collectionRef.value();
    
    if (!collection) {
      throw new Error(`Collection not found: ${collectionId}`);
    }

    //const id

    collection.properties.push({
      id: 'f1',
      type: 'line',
      label: 'Title'
    });
    collection.updatedAt = Date.now();

    collectionRef.assign(collection).write();
    
    return collectionRef.value();
  }
  */

  updateProperty(collectionId, propertyId, data) {
    const collectionRef = this.db.get('collections').find({ id: collectionId });
    let collection = collectionRef.value();
    
    if (!collection) {
      throw new Error(`Collection not found: ${collectionId}`);
    }

    const property = collection.properties.find(property => property.id === propertyId);

    if (!property) {
      throw new Error(`Collection [${collectionId}] prop not found [${propertyId}]`);
    }

    const propertyIndex = collection.properties.findIndex(prop => prop.id === property.id);
    const updatedProperty = { ...property, ...data, id: property.id };
    // todo: validate property
    collection.properties[propertyIndex] = updatedProperty;
    collection.updatedAt = Date.now();

    collectionRef.assign(collection).write();
    
    return collectionRef.value();
  }
}
