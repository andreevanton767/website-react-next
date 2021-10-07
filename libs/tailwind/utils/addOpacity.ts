export default (hex: string, opacity: number) => {
  return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
    .exec(hex)
    .map((strNum, index) =>
      index == 0 ? 'rgba(' : parseInt(strNum, 16).toString()
    )
    .reduce((prev, curr, index) => {
      return index == 0
        ? 'rgba('
        : index < 3
        ? prev + `${curr}, `
        : prev + `${curr}, ${opacity})`;
    });
};
