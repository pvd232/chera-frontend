export default function getFilteredMealPlanMeals({
  allMealPlanMeals,
  mealPlanMealsByMeal,
  mealPlanMealsByMealPlan,
  filterMealId,
  filterMealPlanId,
}) {
  if (allMealPlanMeals.length === 0) {
    return [];
  }
  const mealFilteredMealArray =
    filterMealId === 'all'
      ? allMealPlanMeals
      : mealPlanMealsByMeal.get(filterMealId);
  const mealFilteredMealsMap = new Map();
  mealFilteredMealArray.forEach((item) => {
    if (!mealFilteredMealsMap.has(item.id)) {
      mealFilteredMealsMap.set(item.id, item);
    }
  });

  const mealPlanFilteredArray =
    filterMealPlanId === 'all'
      ? allMealPlanMeals
      : mealPlanMealsByMealPlan.get(filterMealPlanId);
  const mealPlanFilteredMealsMap = new Map();
  mealPlanFilteredArray.forEach((item) => {
    if (!mealPlanFilteredMealsMap.has(item.id)) {
      mealPlanFilteredMealsMap.set(item.id, item);
    }
  });
  const filteredMealPlanMealsArray = [];
  allMealPlanMeals.forEach((item) => {
    if (
      mealFilteredMealsMap.has(item.id) &&
      mealPlanFilteredMealsMap.has(item.id)
    ) {
      filteredMealPlanMealsArray.push(item);
    }
  });
  return filteredMealPlanMealsArray;
}
