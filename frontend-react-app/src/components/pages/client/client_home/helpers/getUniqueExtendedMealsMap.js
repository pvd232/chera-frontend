const getUniqueExtendedMealsMap = (extendedScheduledOrderMeals) => {
  const extendedMealsMapToReturn = new Map();
  extendedScheduledOrderMeals.forEach((extendedScheduledOrderMeal) => {
    if (
      !extendedMealsMapToReturn.has(
        extendedScheduledOrderMeal.associatedMeal.id
      )
    ) {
      extendedMealsMapToReturn.set(
        extendedScheduledOrderMeal.associatedMeal.id,
        extendedScheduledOrderMeal.associatedMeal
      );
    }
  });
  return extendedMealsMapToReturn;
};
export default getUniqueExtendedMealsMap;
