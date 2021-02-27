import { customAlphabet } from 'nanoid/non-secure';

export function generateId(firstChar: 'w' | 'c' | 'r') {
  const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 3)
  return firstChar + nanoid() + Date.now();
}
