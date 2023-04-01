import ScheduleMealCardItem from '../ScheduleMealCardItem';
const createScheduleMealCardItems = (extendedScheduleMeals) => {
  const scheduleMealMap = new Map();
  extendedScheduleMeals.forEach((extendedScheduleMeal) => {
    if (!scheduleMealMap.has(extendedScheduleMeal.mealId)) {
      scheduleMealMap.set(
        extendedScheduleMeal.mealId,
        new ScheduleMealCardItem(extendedScheduleMeal)
      );
    } else {
      scheduleMealMap.get(extendedScheduleMeal.mealId).quantity += 1;
    }
  });
  return scheduleMealMap;
};
export default createScheduleMealCardItems;
