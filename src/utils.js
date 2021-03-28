import { customAlphabet } from 'nanoid/non-secure';

// todo: allow only ('w', 'c', 'i')
export function generateId(firstChar) {
  const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 3)
  return firstChar + nanoid() + Date.now();
}
