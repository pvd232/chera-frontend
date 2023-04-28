const getMealsSubtotal = (scheduledMeals, scheduleSnacks) => {
  let cost = 0.0;
  for (const scheduledMeal of scheduledMeals) {
    cost += scheduledMeal.associatedMeal.price;
  }
  for (const scheduleSnack of scheduleSnacks) {
    console.log('scheduleSnack', scheduleSnack);
    cost += scheduleSnack.associatedSnack.price;
  }
  return cost.toFixed(2);
};
export default getMealsSubtotal;
