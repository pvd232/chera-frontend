export default function getFilteredMealPlanMeals({
  allMealPlanMeals,
  mealPlanMealsByMealPlan,
  mealPlanMealsByDietaryRestriction,
  filterMealPlanId,
  vegetarian,
}) {
  const dietFilteredMealsArray =
    vegetarian === 'all'
      ? allMealPlanMeals
      : mealPlanMealsByDietaryRestriction.get(vegetarian);
  const dietFilteredMealsMap = new Map();
  dietFilteredMealsArray.forEach((item) => {
    if (!dietFilteredMealsMap.has(item.id)) {
      dietFilteredMealsMap.set(item.id, item);
    }
  });

  const mealPlanFilteredArray = mealPlanMealsByMealPlan.get(filterMealPlanId);
  if (mealPlanFilteredArray) {
    const mealPlanFilteredMealsMap = new Map();
    mealPlanFilteredArray.forEach((item) => {
      if (!mealPlanFilteredMealsMap.has(item.id)) {
        mealPlanFilteredMealsMap.set(item.id, item);
      }
    });
    const filteredMealPlanMealsArray = [];
    allMealPlanMeals.forEach((item) => {
      if (
        dietFilteredMealsMap.has(item.id) &&
        mealPlanFilteredMealsMap.has(item.id)
      ) {
        filteredMealPlanMealsArray.push(item);
      }
    });
    return filteredMealPlanMealsArray;
  } else {
    return false;
  }
}
