export function isValidArray(array) {
  return array && Array.isArray(array);
}

export function reduceToSet(arrays) {
  if (!isValidArray(arrays)) return;
  const res = [];
  for (const array of arrays) {
    if (isValidArray(array)) {
      res.push(...array);
    }
  }
  return new Set(res);
}

export function getLastItem(array) {
  if (!isValidArray(array)) return;
  return array[array.length-1];
}
