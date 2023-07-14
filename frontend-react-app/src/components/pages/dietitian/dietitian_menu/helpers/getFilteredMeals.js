export default function getFilteredMealPlanMeals({
  allMealPlanMeals,
  mealPlanMealsByMealPlan,
  mealPlanMealsByMealTime,
  mealPlanMealsByDietaryRestriction,
  filterMealPlanId,
  filterMealTime,
  filterDietaryRestrictions,
}) {
  const dietFilteredMealsArray =
    filterDietaryRestrictions === 'all'
      ? allMealPlanMeals
      : mealPlanMealsByDietaryRestriction.get(filterDietaryRestrictions);
  const dietFilteredMealsMap = new Map();
  dietFilteredMealsArray.forEach((item) => {
    if (!dietFilteredMealsMap.has(item.id)) {
      dietFilteredMealsMap.set(item.id, item);
    }
  });
  const timeFilterdMealArray =
    filterMealTime === 'all'
      ? allMealPlanMeals
      : mealPlanMealsByMealTime.get(filterMealTime);
  const timeFilteredMealsMap = new Map();
  timeFilterdMealArray.forEach((item) => {
    if (!timeFilteredMealsMap.has(item.id)) {
      timeFilteredMealsMap.set(item.id, item);
    }
  });

  const mealPlanFilteredArray =
    filterMealPlanId === 'all'
      ? allMealPlanMeals
      : mealPlanMealsByMealPlan.get(filterMealPlanId);
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
        timeFilteredMealsMap.has(item.id) &&
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
