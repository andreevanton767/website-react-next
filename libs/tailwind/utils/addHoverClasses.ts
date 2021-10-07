const addHoverClassName = (className: string, e: (str: string) => string) =>
  className
    .replace(
      /card-[a-z\-]+\s?/,
      (inner) => `${e(`hover:${inner.trim()}`)}:hover `
    )
    .trim();

export default (obj: Record<string, unknown>, e: (str: string) => string) => {
  let safeObject = {};
  Object.keys(obj).forEach((className) => {
    safeObject[className] = obj[className];
    safeObject[addHoverClassName(className, e)] = safeObject[className];
  });
  return safeObject;
};
