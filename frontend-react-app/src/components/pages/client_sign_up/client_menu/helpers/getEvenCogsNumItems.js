export const getEvenCogsNumItems = (numMeals, numSnacks, minItems) => {
  const valueToTest = numMeals + numSnacks / 2;
  if (valueToTest < minItems) {
    return minItems;
  } else if (valueToTest % 2 !== 0) {
    return valueToTest - 1;
  } else {
    return valueToTest;
  }
};
