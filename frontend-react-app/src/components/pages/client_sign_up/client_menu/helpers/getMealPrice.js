export const getMealPrice = (cogs, shippingRate, numMeals, numSnacks) => {
  const upperBound = cogs[0].numMeals * 2 - 2;
  const minItems = cogs[0].numMeals;
  const correctedEvenItems = (() => {
    const valueToTest = numMeals + numSnacks / 2;
    if (valueToTest < minItems) {
      return minItems;
    }
    if (valueToTest % 2 !== 0) {
      return valueToTest + 1;
    } else {
      return valueToTest;
    }
  })();
  const lcdTotalItems = (() => {
    if (correctedEvenItems < minItems) {
      return minItems;
    } else if (correctedEvenItems > upperBound) {
      const remainder = correctedEvenItems % minItems;
      return minItems + remainder;
    } else {
      return correctedEvenItems;
    }
  })();
  const numBoxes = (() => {
    const baseBoxes = Math.floor(correctedEvenItems / minItems);
    const remainder = correctedEvenItems % minItems;
    if (remainder === 0) {
      return baseBoxes;
    } else {
      return baseBoxes + 1;
    }
  })();

  const matchingCogs = cogs.find((cog) => {
    return cog.numMeals === lcdTotalItems;
  });
  const mealCOGS = matchingCogs.costPerMeal;
  const totalShippingCost = shippingRate * numBoxes;
  const shippingCostPerMeal = totalShippingCost / correctedEvenItems;
  const mealPrice = Math.round(mealCOGS + shippingCostPerMeal) + 1;
  return mealPrice;
};
