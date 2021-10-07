/**
 * Tests two variables for deep equality regardless of depth and data structure (obj, arr, primitive)
 * @param val1
 * @param val2
 * @returns boolean, isEqual
 */
const deepEqual = (val1: unknown, val2: unknown): boolean => {
  // compare types, if they don't match cannot be equal
  if (typeof val1 != typeof val2) return false;

  // check if primitive values
  if (typeof val1 != 'object') return val1 == val2;

  // check if null
  if ([val1, val2].includes(null)) return val2 == null;

  // check object recursively
  const keys1 = Object.keys(val1 as object);
  const keys2 = Object.keys(val2 as object);

  if (keys1.length != keys2.length) return false;

  return keys1.every((key) =>
    deepEqual((val1 as object)[key], (val2 as object)[key])
  );
};

export default deepEqual;
