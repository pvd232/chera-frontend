export const filterForImages = (filteredMealPlanMeals) => {
  return filteredMealPlanMeals.filter((meal) => {
    console.log('meal', meal);
    return meal.active;
  });
};
