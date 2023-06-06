const checkUpcomingDelivery = (extendedScheduledOrderMeals) => {
  const deliveryDateMap = new Map();
  // Map the delivery dates and whether they were skipped
  extendedScheduledOrderMeals.forEach((extendedScheduledOrderMeal) => {
    if (
      !deliveryDateMap.has(extendedScheduledOrderMeal.deliveryDate.getTime())
    ) {
      if (
        extendedScheduledOrderMeal.deliveryPaused ||
        extendedScheduledOrderMeal.deliverySkipped
      ) {
        deliveryDateMap.set(
          extendedScheduledOrderMeal.deliveryDate.getTime(),
          false
        );
      } else {
        deliveryDateMap.set(
          extendedScheduledOrderMeal.deliveryDate.getTime(),
          true
        );
      }
    }
  });
  // Sort the delivery dates and return the first one that wasn't skipped
  const deliveryDates = Array.from(deliveryDateMap.keys());
  const sortedDeliveryDates = deliveryDates.sort((a, b) => a - b);
  for (const deliveryDate of sortedDeliveryDates) {
    // Check if the weekSkipped flag is false to find the first unskipped delivery date
    if (deliveryDateMap.get(deliveryDate)) {
      return new Date(deliveryDate);
    }
  }
  // If all delivery dates were skipped, return null, making the function return an optional date type
  return null;
};
export default checkUpcomingDelivery;
