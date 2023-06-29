const getOrderSubtotal = (mealPrice, scheduledMeals, scheduleSnacks) => {
  const snackPrice = mealPrice / 2;
  const scheduledMealsCost = mealPrice * scheduledMeals.length;
  const scheduledSnacksCost = snackPrice * scheduleSnacks.length;
  const cost = scheduledMealsCost + scheduledSnacksCost;
  return cost;
};
export default getOrderSubtotal;
