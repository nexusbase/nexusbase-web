import { customAlphabet } from 'nanoid/non-secure';
import { throwCaught } from './config';

export function throwIfDev(e) {
  if(throwCaught) throw e;
}

// todo: allow only ('w', 'c', 'i')
export function generateId(firstChar) {
  const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 4)
  return firstChar + nanoid() + Date.now();
}

export function getPropertyFromCollection(propertyId, collection) {
  return collection.properties.find(property => property.id === propertyId);
}
