export default function getMealPlanMealsByMeal(mealPlanMeals) {
  const mealPlanMealMap = new Map();
  mealPlanMeals.forEach((mealPlanMeal) => {
    if (mealPlanMealMap.has(mealPlanMeal.mealId)) {
      mealPlanMealMap.get(mealPlanMeal.mealId).push(mealPlanMeal);
    } else {
      mealPlanMealMap.set(mealPlanMeal.mealId, [mealPlanMeal]);
    }
  });
  return mealPlanMealMap;
}
