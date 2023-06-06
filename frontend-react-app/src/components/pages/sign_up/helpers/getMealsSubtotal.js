const getMealsSubtotal = (scheduledMeals) => {
  let cost = 0.0;
  for (const scheduledMeal of scheduledMeals) {
    cost += scheduledMeal.associatedMeal.price;
  }
  return cost.toFixed(2);
};
export default getMealsSubtotal;
