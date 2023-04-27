import checkProperties from '../../helpers/checkProperties';
export default class OrderSnackDTO {
  constructor(orderSnackJSON) {
    if (orderSnackJSON) {
      this.id = orderSnackJSON.id;
      this.mealSubscriptionInvoiceId =
        orderSnackJSON.meal_subscription_invoice_id;
      this.scheduledOrderSnackId = orderSnackJSON.scheduled_order_snack_id;
    } else {
      this.id = '';
      this.mealSubscriptionId = '';
      this.mealSubscriptionInvoiceId = '';
      this.scheduledOrderSnackId = '';
    }
    this.properlyInitialized = (() => checkProperties(this))();
  }
  static initializeFromOrderSnack(orderSnack) {
    const newOrderSnack = new OrderSnackDTO();
    newOrderSnack.id = orderSnack.id;
    newOrderSnack.mealSubscriptionInvoiceId =
      orderSnack.mealSubscriptionInvoiceId;
    newOrderSnack.scheduledOrderSnackId = orderSnack.scheduledOrderSnackId;
    return newOrderSnack;
  }

  toJSON() {
    return {
      id: this.id,
      meal_subscription_invoice_id: this.mealSubscriptionInvoiceId,
      scheduled_order_snack_id: this.scheduledOrderSnackId,
    };
  }
}
