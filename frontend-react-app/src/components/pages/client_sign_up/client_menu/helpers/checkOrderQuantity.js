export default function checkOrderQuantity(editing, meals, snacks) {
  const snackContainers = snacks.length / 2;
  const totalItems = meals.length + snackContainers;
  if (totalItems % 2 === 0 && meals.length >= 8) {
    return true;
  } else if (editing) {
    return true;
  } else {
    return false;
  }
}
