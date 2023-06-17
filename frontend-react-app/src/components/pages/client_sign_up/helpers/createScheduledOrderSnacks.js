import DeliveryDateUtility from '../../../../helpers/DeliveryDateUtility';
import ScheduledOrderSnack from '../../../../data_models/model/ScheduledOrderSnack';
const createScheduledOrderSnacks = (scheduleSnacks, createFirstWeekSnacks) => {
  const scheduledOrderSnacks = [];

  // If editing a current meal subscription and past the deadline to edit current week snacks (i.e. today is after the cutoff date for the current week), then start at week 1
  const startingSnackIndex = createFirstWeekSnacks ? 0 : 1;
  // Add scheduled ordered snacks for weeks 0-3
  for (let i = startingSnackIndex; i < 4; i++) {
    const deliveryDate = DeliveryDateUtility.getDeliveryDateFromIndex(i);
    // Use chosen Schedule Snacks to created future scheduledOrderSnacks
    for (const scheduleSnack of scheduleSnacks) {
      const newScheduledOrderSnack =
        ScheduledOrderSnack.initializeFromScheduleSnack(
          scheduleSnack,
          deliveryDate
        );
      scheduledOrderSnacks.push(newScheduledOrderSnack);
    }
  }
  return scheduledOrderSnacks;
};
export default createScheduledOrderSnacks;
