/**
 *
 * @param array accepts array of n length
 * @param reverse reverses the rotation to right -> left
 * @returns rotated array
 * Rotates left -> right
 */
const rotate = (array: any[], reverse?: boolean) => {
  const lastItem = array.length - 1;

  if (reverse) {
    return [...array.slice(-lastItem), array[0]];
  }
  return [array[lastItem], ...array.slice(0, lastItem)];
};

export default rotate;
