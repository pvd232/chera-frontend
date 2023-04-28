import { v4 as uuid } from 'uuid';
import OrderSnack from '../../../data_models/model/OrderSnack';
const createInitialOrderSnacks = (
  mealSubscriptionInvoiceId,
  scheduledOrderSnacks
) => {
  const orderSnacks = [];
  for (const scheduledOrderSnack of scheduledOrderSnacks) {
    const orderSnackId = uuid();
    const newOrderSnack = OrderSnack.initializeFromScheduledOrderSnack(
      orderSnackId,
      mealSubscriptionInvoiceId,
      scheduledOrderSnack.id
    );
    orderSnacks.push(newOrderSnack);
  }
  return orderSnacks;
};
export default createInitialOrderSnacks;
