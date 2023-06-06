export default function getFilteredMealPlanMeals({
  allMealPlanMeals,
  mealPlanMealsByMealPlan,
  mealPlanMealsByMeal,
  filterMealPlanId,
  filterMealId,
}) {
  const mealFilteredMealArray =
    filterMealId === 'all'
      ? allMealPlanMeals
      : mealPlanMealsByMeal.get(filterMealId);
  const mealFilteredMealMap = new Map();
  mealFilteredMealArray.forEach((item) => {
    if (!mealFilteredMealMap.has(item.id)) {
      mealFilteredMealMap.set(item.id, item);
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
      mealFilteredMealMap.has(item.id) &&
      mealPlanFilteredMealsMap.has(item.id)
    ) {
      filteredMealPlanMealsArray.push(item);
    }
  });
  return filteredMealPlanMealsArray;
}
