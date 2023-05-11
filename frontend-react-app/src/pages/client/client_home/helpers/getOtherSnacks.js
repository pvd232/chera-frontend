const getOtherSnacks = (scheduledOrderSnacksMap, snacks) => {
  const otherSnacks = [];
  snacks.forEach((snack) => {
    if (!scheduledOrderSnacksMap.has(snack.id)) otherSnacks.push(snack);
  });
  return otherSnacks;
};
export default getOtherSnacks;
