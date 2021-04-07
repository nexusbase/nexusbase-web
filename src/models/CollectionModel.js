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
    const relationProps = collection.props.filter(prop => prop.type === 'relation');
      
    if (relationProps.length > 0) {
      const relatedCollectionIds = relationProps.map(prop => prop.options.collectionId);
      
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
      props: ['f1'],
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
      props: [
        {
          id: 'f1',
          type: 'line',
          label: 'Title'
        }
      ],
      titleProp: 'f1',
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

  updateProp(args) {
    const { collectionId, propId, data: updatedProp } = args;
    const collectionRef = this.db.get('collections').find({ id: collectionId });
    let collection = collectionRef.value();
    
    if (!collection) {
      throw new Error(`Collection not found: ${collectionId}`);
    }

    const prop = collection.props.find(prop => prop.id === propId);

    if (!prop) {
      throw new Error(`Collection [${collectionId}] prop not found [${propId}]`);
    }

    const propIndex = collection.props.findIndex(prop => prop.id === propId);
    const timestamp = Date.now();
    collection.props[propIndex] = { ...updatedProp, id: propId };
    collection.updatedAt = timestamp;

    collectionRef.assign(collection).write();
    
    const views = this.db.get('views').filter({ collectionId: collection.id }).value();
    
    return {
      collection: { ...collectionRef.value(), views },
      related: this.relatedCollections(collection)
    };
  }
}
