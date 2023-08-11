export const getMealPrice = (cogs, shippingRate, numItems, numBoxes) => {
  const matchingCogs = (() => {
    const exactMatch = cogs.find((cog) => {
      return numItems === cog.numMeals;
    });
    if (exactMatch) return exactMatch;
    else {
      const multiple = cogs.find((cog) => {
        return numItems % cog.numMeals === 0;
      });
      if (multiple) return multiple;
      else {
        const evenNumItems = numItems - 1;
        return cogs.find((cog) => {
          return evenNumItems % cog.numMeals === 0;
        });
      }
    }
  })();
  const mealCOGS = matchingCogs.costPerMeal;
  const totalShippingCost = shippingRate * numBoxes;
  const shippingCostPerMeal = totalShippingCost / numItems;
  const mealPrice = Math.round(mealCOGS + shippingCostPerMeal) + 1;
  return mealPrice;
};
