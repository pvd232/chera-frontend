export default function getSubtotal(scheduleMeals) {
  let subtotal = 0;
  scheduleMeals.forEach(
    (scheduleMeal) => (subtotal += scheduleMeal.associatedMeal.price)
  );
  return subtotal;
}
