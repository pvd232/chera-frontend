const getUniqueSnacksMap = (scheduledOrderSnacks) => {
  const snacksMapToReturn = new Map();
  scheduledOrderSnacks.forEach((scheduledOrderSnack) => {
    if (!snacksMapToReturn.has(scheduledOrderSnack.associatedSnack.id)) {
      snacksMapToReturn.set(
        scheduledOrderSnack.associatedSnack.id,
        scheduledOrderSnack.associatedSnack
      );
    }
  });
  return snacksMapToReturn;
};
export default getUniqueSnacksMap;
