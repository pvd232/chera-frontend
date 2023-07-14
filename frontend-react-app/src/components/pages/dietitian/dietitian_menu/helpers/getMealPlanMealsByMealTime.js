export const getMealPlanMealsByMealTime = (
  extendedMeals,
  mealPlanMealsByMeal
) => {
  const mealPlanMealsByTimeMap = new Map();
  extendedMeals.forEach((meal) => {
    const mealPlanMealsAssociated = mealPlanMealsByMeal.get(meal.id);
    if (mealPlanMealsByTimeMap.has(meal.mealTime)) {
      mealPlanMealsByTimeMap.set(meal.mealTime, [
        ...mealPlanMealsByTimeMap.get(meal.mealTime),
        ...mealPlanMealsAssociated,
      ]);
    } else {
      mealPlanMealsByTimeMap.set(meal.mealTime, [...mealPlanMealsAssociated]);
    }
  });
  return mealPlanMealsByTimeMap;
};
