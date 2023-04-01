const getOtherMeals = (extendedScheduledOrderMealsMap, meals) => {
  const otherMeals = [];
  meals.forEach((meal) => {
    if (!extendedScheduledOrderMealsMap.has(meal.id)) otherMeals.push(meal);
  });
  return otherMeals;
};
export default getOtherMeals;
