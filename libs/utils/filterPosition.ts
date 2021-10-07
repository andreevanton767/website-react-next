/**
 *
 * @param baseClasses base classes set for element
 * @param classes aditional (dinamic classes) mostly passed as className props
 * @returns concated string of classes with relative position,
 *  if no absolute/relative/fixed is passed within classes
 */
const filterPosition = (baseClasses: string[], classes?: string) => {
  classes = Boolean(classes) ? classes : '';
  const positionClasses = ['.', 'relative', 'absolute', 'fixed'];

  const position = positionClasses.reduce((prev, curr) =>
    prev == '' ? prev : classes.includes(curr) ? '' : 'relative'
  );

  return [...baseClasses, classes, position].join(' ').trim();
};

export default filterPosition;
