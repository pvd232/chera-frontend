const getNextDeliveryDate = (extendedScheduledOrderMeals) => {
  const deliveryDateMap = new Map();
  // Map the delivery dates and whether they were skipped
  extendedScheduledOrderMeals.forEach((extendedScheduledOrderMeal) => {
    if (
      !deliveryDateMap.has(extendedScheduledOrderMeal.deliveryDate.getTime())
    ) {
      deliveryDateMap.set(
        extendedScheduledOrderMeal.deliveryDate.getTime(),
        extendedScheduledOrderMeal.deliverySkipped
      );
    }
  });
  // Sort the delivery dates and return the first one that wasn't skipped
  const deliveryDates = Array.from(deliveryDateMap.keys());
  const sortedDeliveryDates = deliveryDates.sort((a, b) => a - b);
  for (const deliveryDate of sortedDeliveryDates) {
    if (!deliveryDateMap.get(deliveryDate)) {
      return new Date(deliveryDate);
    }
  }
  // If all delivery dates were skipped, return the week after the last delivery date
  const weekAfterLastDeliveryDate = new Date(
    sortedDeliveryDates[sortedDeliveryDates.length - 1]
  );
  weekAfterLastDeliveryDate.setDate(weekAfterLastDeliveryDate.getDate() + 7);
  return weekAfterLastDeliveryDate;
};
export default getNextDeliveryDate;
