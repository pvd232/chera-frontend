import ScheduledOrderMealCardItem from '../ScheduledOrderMealCardItem';
// This function is called in src/client/ClientHome/ClientHome.js
// This function groups the client's ScheduledOrderMeals by mealId and deliveryDate and creates a ClientMealCardData object for each meal
const createScheduledOrderMealCardItems = (
  extendedScheduledOrderMeals,
  deliveryDateIndex = false
) => {
  console.log('deliveryDateIndex', deliveryDateIndex);
  console.log('extendedScheduledOrderMeals', extendedScheduledOrderMeals);
  const sortedArray = extendedScheduledOrderMeals.sort(
    (a, b) => a.deliveryDate.getTime() - b.deliveryDate.getTime()
  );
  const uniqueDatesSet = new Set();
  sortedArray.forEach((extendedScheduledOrderMeal) => {
    if (
      !uniqueDatesSet.has(extendedScheduledOrderMeal.deliveryDate.getTime())
    ) {
      uniqueDatesSet.add(extendedScheduledOrderMeal.deliveryDate.getTime());
    }
  });
  const clientScheduledOrderMealMap = new Map();
  extendedScheduledOrderMeals.forEach((extendedScheduledOrderMeal) => {
    // If the deliveryDate is not in the map, create a new map for that deliveryDate and add the meal to it
    if (
      !clientScheduledOrderMealMap.has(
        extendedScheduledOrderMeal.deliveryDate.getTime()
      )
    ) {
      const scheduledOrderMealMapByMeal = new Map();
      scheduledOrderMealMapByMeal.set(
        extendedScheduledOrderMeal.mealId,
        new ScheduledOrderMealCardItem(extendedScheduledOrderMeal)
      );
      clientScheduledOrderMealMap.set(
        extendedScheduledOrderMeal.deliveryDate.getTime(),
        scheduledOrderMealMapByMeal
      );
    } else {
      // If the deliveryDate is in the map, check for the mealId in the map for that deliveryDate
      const scheduledOrderMealMapByDate = clientScheduledOrderMealMap.get(
        extendedScheduledOrderMeal.deliveryDate.getTime()
      );
      // If the mealId is in the map for that deliveryDate, increment the quantity
      if (scheduledOrderMealMapByDate.has(extendedScheduledOrderMeal.mealId)) {
        scheduledOrderMealMapByDate.get(
          extendedScheduledOrderMeal.mealId
        ).quantity += 1;
      } else {
        // If the mealId is not in the map for that deliveryDate, create a new ClientMealCardData object for that mealId and add it to the map
        scheduledOrderMealMapByDate.set(
          extendedScheduledOrderMeal.mealId,
          new ScheduledOrderMealCardItem(extendedScheduledOrderMeal)
        );
      }
    }
  });
  // If deliveryDateIndex is passed in, return the map for that deliveryDate (ClientHome.js uses this to display the meals for a specific deliveryDate)
  if (deliveryDateIndex !== false) {
    const deliverDatesArray = Array.from(uniqueDatesSet);
    console.log('deliverDatesArray', deliverDatesArray);
    const deliveryDateTimeStamp = deliverDatesArray[deliveryDateIndex];
    console.log('deliveryDateTimeStamp', deliveryDateTimeStamp);
    console.log('clientScheduledOrderMealMap', clientScheduledOrderMealMap);
    const scheduledOrderMealsMapForDeliveryDate =
      clientScheduledOrderMealMap.get(deliveryDateTimeStamp);
    console.log(
      'scheduledOrderMealsMapForDeliveryDate',
      scheduledOrderMealsMapForDeliveryDate
    );
    return scheduledOrderMealsMapForDeliveryDate;
  }
  // Otherwise if no deliveryDateIndex is passed in, return the map for all deliveryDates (PreviousDeliveries.js uses this to display the meals for all deliveryDates)
  else {
    return clientScheduledOrderMealMap;
  }
};
export default createScheduledOrderMealCardItems;
