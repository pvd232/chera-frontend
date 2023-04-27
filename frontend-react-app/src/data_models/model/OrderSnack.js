import checkProperties from '../../helpers/checkProperties';
export default class OrderSnack {
  constructor(orderSnackObject) {
    if (orderSnackObject) {
      this.id = orderSnackObject.id;
      this.mealSubscriptionInvoiceId =
        orderSnackObject.mealSubscriptionInvoiceId;
      this.scheduledOrderSnackId = orderSnackObject.scheduledOrderSnackId;
    } else {
      this.id = '';
      this.mealSubscriptionInvoiceId = '';
      this.scheduledOrderSnackId = '';
    }
    this.properlyInitialized = (() => checkProperties(this))();
  }
  static initializeFromScheduledOrderSnack(
    orderSnackId,
    mealSubscriptionInvoiceId,
    scheduledOrderSnackId
  ) {
    const newOrderSnack = new OrderSnack();
    newOrderSnack.id = orderSnackId;
    newOrderSnack.mealSubscriptionInvoiceId = mealSubscriptionInvoiceId;
    newOrderSnack.scheduledOrderSnackId = scheduledOrderSnackId;
    return newOrderSnack;
  }
}
