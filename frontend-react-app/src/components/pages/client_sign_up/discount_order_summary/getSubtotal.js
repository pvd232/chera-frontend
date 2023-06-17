export default function getSubtotal(
  scheduleMeals = false,
  scheduleSnacks = false
) {
  let subtotal = 0;
  if (scheduleSnacks) {
    scheduleSnacks.forEach(
      (scheduleSnack) => (subtotal += scheduleSnack.associatedSnack.price)
    );
  }
  if (scheduleMeals) {
    scheduleMeals.forEach(
      (scheduleMeal) => (subtotal += scheduleMeal.associatedMeal.price)
    );
  }
  return subtotal;
}
