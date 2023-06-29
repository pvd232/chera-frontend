export default function getSubtotal(
  mealPrice,
  snackPrice,
  scheduleMeals = false,
  scheduleSnacks = false
) {
  let subtotal = 0;
  if (scheduleMeals) {
    subtotal += scheduleMeals.length * mealPrice;
  }
  if (scheduleSnacks) {
    subtotal += scheduleSnacks.length * snackPrice;
  }
  return subtotal;
}
