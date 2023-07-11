export const sortFilteredMealPlanMeals = (filteredMealPlanMeals) => {
  return filteredMealPlanMeals.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
};
