import ScheduledOrderSnackCardItem from '../current_snacks/ScheduledOrderSnackCardItem';
// This function is called in src/client/ClientHome/ClientHome.js
// This function groups the client's ScheduledOrderSnacks by snackId and deliveryDate and creates a ClientSnackCardData object for each snack
const createScheduledOrderSnackCardItems = (
  extendedScheduledOrderSnacks,
  deliveryDateIndex = false
) => {
  const sortedArray = extendedScheduledOrderSnacks.sort(
    (a, b) => a.deliveryDate.getTime() - b.deliveryDate.getTime()
  );
  const uniqueDatesSet = new Set();
  sortedArray.forEach((extendedScheduledOrderSnack) => {
    if (
      !uniqueDatesSet.has(extendedScheduledOrderSnack.deliveryDate.getTime())
    ) {
      uniqueDatesSet.add(extendedScheduledOrderSnack.deliveryDate.getTime());
    }
  });
  const clientScheduledOrderSnackMap = new Map();
  extendedScheduledOrderSnacks.forEach((extendedScheduledOrderSnack) => {
    // If the deliveryDate is not in the map, create a new map for that deliveryDate and add the snack to it
    if (
      !clientScheduledOrderSnackMap.has(
        extendedScheduledOrderSnack.deliveryDate.getTime()
      )
    ) {
      const scheduledOrderSnackMapBySnack = new Map();
      scheduledOrderSnackMapBySnack.set(
        extendedScheduledOrderSnack.snackId,
        new ScheduledOrderSnackCardItem(extendedScheduledOrderSnack)
      );
      clientScheduledOrderSnackMap.set(
        extendedScheduledOrderSnack.deliveryDate.getTime(),
        scheduledOrderSnackMapBySnack
      );
    } else {
      // If the deliveryDate is in the map, check for the snackId in the map for that deliveryDate
      const scheduledOrderSnackMapByDate = clientScheduledOrderSnackMap.get(
        extendedScheduledOrderSnack.deliveryDate.getTime()
      );
      // If the snackId is in the map for that deliveryDate, increment the quantity
      if (
        scheduledOrderSnackMapByDate.has(extendedScheduledOrderSnack.snackId)
      ) {
        scheduledOrderSnackMapByDate.get(
          extendedScheduledOrderSnack.snackId
        ).quantity += 1;
      } else {
        // If the snackId is not in the map for that deliveryDate, create a new ClientSnackCardData object for that snackId and add it to the map
        scheduledOrderSnackMapByDate.set(
          extendedScheduledOrderSnack.snackId,
          new ScheduledOrderSnackCardItem(extendedScheduledOrderSnack)
        );
      }
    }
  });
  // If deliveryDateIndex is passed in, return the map for that deliveryDate (ClientHome.js uses this to display the snacks for a specific deliveryDate)
  if (deliveryDateIndex !== false) {
    const deliverDatesArray = Array.from(uniqueDatesSet);
    const deliveryDateTimeStamp = deliverDatesArray[deliveryDateIndex];

    const scheduledOrderSnacksMapForDeliveryDate =
      clientScheduledOrderSnackMap.get(deliveryDateTimeStamp);
    return scheduledOrderSnacksMapForDeliveryDate;
  }
  // Otherwise if no deliveryDateIndex is passed in, return the map for all deliveryDates (PreviousDeliveries.js uses this to display the snacks for all deliveryDates)
  else {
    return clientScheduledOrderSnackMap;
  }
};
export default createScheduledOrderSnackCardItems;
