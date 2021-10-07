/**
 * Used to "smart" trim post excerpt with respect to maxLength, rounding down to maximum number of words to fit given character length
 * @param original original sting
 * @param maxLength max length (in chars) of trimmed version
 * @returns trimmed version with "..." mark at the end
 */
const yTrimExcerpt = (original: string, maxLength: number) => {
  if (original.length <= maxLength) return original;

  const words = original.split(' ');

  return [...words].reduce((acc, curr, i, original) => {
    // if adding next word exceeds max length, create ending with current word
    if (`${acc} ${curr} ${original[i + 1]}`.length > maxLength) {
      // exit early by mutating original array (simulating "break" in for loop and similar)
      original.splice(0);

      // create ending with "..." at the end
      return `${acc} ${curr}...`;
    }

    return `${acc} ${curr}`;
  });
};

export default yTrimExcerpt;
