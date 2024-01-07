export function isValidArray(array) {
  return array && Array.isArray(array);
}

export function reduceToSet(arrays) {
  if (!isValidArray(arrays)) return;
  const arr = [];
  for (const array of arrays) {
    arr.push(...array);
  }
  return new Set(arr);
}

export function getLastItem(array) {
  return array[array.length-1];
}
