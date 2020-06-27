import { IRecordModel, ICollectionField } from "../types/database";

const recordTemplate = (template: ICollectionField[], data: any) => {
  let record: IRecordModel = {
    id: data.id,
    collectionId: data.collectionId,
    fields: {}
  };
  
  for (const field of template) {
    record.fields[field.id] = data.fields[field.id];
  }

  return record;
}

export default recordTemplate;
