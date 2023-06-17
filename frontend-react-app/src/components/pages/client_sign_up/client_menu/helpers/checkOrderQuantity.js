export default function checkOrderQuantity(editing, meals, snacks) {
  const mealsAreEven = meals.length % 2 === 0;
  const snacksAreEven = (snacks.length / 2) % 2 === 0;
  if (mealsAreEven && snacksAreEven) {
    return true;
  } else if (editing) {
    return true;
  } else {
    return false;
  }
}
