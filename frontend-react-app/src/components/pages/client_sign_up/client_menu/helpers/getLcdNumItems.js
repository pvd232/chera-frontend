export const getLcdNumItems = (numItems, minItems, maxItems, itemsPerBox) => {
  if (numItems < minItems) {
    return minItems;
  } else if (numItems > maxItems) {
    const remainder = numItems % itemsPerBox;
    return itemsPerBox + remainder;
  } else {
    return numItems;
  }
};
