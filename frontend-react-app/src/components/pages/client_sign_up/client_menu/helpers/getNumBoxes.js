export const getNumBoxes = (numItems, itemsPerBox) => {
  const baseBoxes = (() => {
    if (Math.floor(numItems / itemsPerBox) > 0) {
      return Math.floor(numItems / itemsPerBox);
    } else {
      return 1;
    }
  })();
  const remainder = numItems % itemsPerBox;
  if (remainder === 0) {
    return baseBoxes;
  } else {
    return baseBoxes + 1;
  }
};
