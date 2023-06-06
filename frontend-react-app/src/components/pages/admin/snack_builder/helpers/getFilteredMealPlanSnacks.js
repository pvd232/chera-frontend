export default function getFilteredMealPlanSnacks({
  allMealPlanSnacks,
  mealPlanSnacksByMealPlan,
  mealPlanSnacksByMeal,
  filterMealPlanId,
  filterSnackIs,
}) {
  const mealFilteredMealArray =
    filterSnackIs === 'all'
      ? allMealPlanSnacks
      : mealPlanSnacksByMeal.get(filterSnackIs);
  const mealFilteredSnackMap = new Map();
  mealFilteredMealArray.forEach((item) => {
    if (!mealFilteredSnackMap.has(item.id)) {
      mealFilteredSnackMap.set(item.id, item);
    }
  });

  const mealPlanFilteredArray =
    filterMealPlanId === 'all'
      ? allMealPlanSnacks
      : mealPlanSnacksByMealPlan.get(filterMealPlanId);
  const mealPlanFilteredSnacksMap = new Map();
  mealPlanFilteredArray.forEach((item) => {
    if (!mealPlanFilteredSnacksMap.has(item.id)) {
      mealPlanFilteredSnacksMap.set(item.id, item);
    }
  });
  const filteredMealPlanSnacksArray = [];
  allMealPlanSnacks.forEach((item) => {
    if (
      mealFilteredSnackMap.has(item.id) &&
      mealPlanFilteredSnacksMap.has(item.id)
    ) {
      filteredMealPlanSnacksArray.push(item);
    }
  });
  return filteredMealPlanSnacksArray;
}
