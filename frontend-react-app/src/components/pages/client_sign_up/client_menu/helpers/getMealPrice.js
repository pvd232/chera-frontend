export const getMealPrice = (
  cogs,
  shippingRate,
  numItems,
  lcdTotalItems,
  numBoxes
) => {
  const matchingCogs = cogs.find((cog) => {
    return cog.numMeals === lcdTotalItems;
  });
  const mealCOGS = matchingCogs.costPerMeal;
  const totalShippingCost = shippingRate * numBoxes;
  const shippingCostPerMeal = totalShippingCost / numItems;
  const mealPrice = Math.round(mealCOGS + shippingCostPerMeal) + 1;
  return mealPrice;
};
