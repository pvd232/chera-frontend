import DeliveryDateUtility from '../../../../../helpers/DeliveryDateUtility';
const checkIfWeekSkipped = (deliveryIndex, extendedScheduledOrderMeals) => {
  const theDate = DeliveryDateUtility.getDeliveryDateFromIndex(deliveryIndex);
  const mealsByDate = extendedScheduledOrderMeals.filter(
    (meal) => new Date(meal.deliveryDate).getTime() === theDate.getTime()
  );
  for (const meal of mealsByDate) {
    if (meal.deliverySkipped) {
      return true;
    }
  }
  return false;
};
export default checkIfWeekSkipped;
