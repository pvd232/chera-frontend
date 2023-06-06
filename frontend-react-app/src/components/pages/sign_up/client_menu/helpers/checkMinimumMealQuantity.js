export default function checkMinimumMealQuantity(editing, meals) {
  if (editing) {
    return true;
  } else if (meals.length >= 6) {
    return true;
  } else {
    return false;
  }
}
