const getMealsByMealTimeMap = (extendedMeals) => {
  const mealsByMealTimeMapToReturn = new Map();
  extendedMeals.forEach((meal) => {
    if (!mealsByMealTimeMapToReturn.has(meal.mealTime)) {
      const mealSet = new Set();
      mealSet.add(meal.id);
      mealsByMealTimeMapToReturn.set(meal.mealTime, mealSet);
    } else {
      mealsByMealTimeMapToReturn.get(meal.mealTime).add(meal.id);
    }
  });
  return mealsByMealTimeMapToReturn;
};
export default getMealsByMealTimeMap;
