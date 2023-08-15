export const getMealPrice = (cogs, shippingRate, numItems, mealPriceTable) => {
  const matchingCogs = (() => {
    const exactMatch = cogs.find((cog) => {
      return numItems === cog.numMeals;
    });
    if (exactMatch) return exactMatch;
    const evenNumItems = (() => {
      if (numItems % 2 === 0) {
        return numItems;
      } else {
        return numItems - 1;
      }
    })();
    return cogs.find((cog) => {
      return evenNumItems % cog.numMeals === 0;
    });
  })();
  const mealCOGS = matchingCogs.costPerMeal;

  const totalShippingCost = shippingRate * matchingCogs.numBoxes;
  const shippingCostPerMeal = totalShippingCost / numItems;
  const mealPrice = Math.round(mealCOGS + shippingCostPerMeal) + 1;
  return mealPrice;
};
