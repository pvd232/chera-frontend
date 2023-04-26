import checkProperties from '../../helpers/checkProperties';
export default class OrderMeal {
  constructor(orderMealObject) {
    if (orderMealObject) {
      this.id = orderMealObject.id;
      this.mealSubscriptionInvoiceId =
        orderMealObject.mealSubscriptionInvoiceId;
      this.scheduledOrderMealId = orderMealObject.scheduledOrderMealId;
    } else {
      this.id = '';
      this.mealSubscriptionInvoiceId = '';
      this.scheduledOrderMealId = '';
    }
    this.properlyInitialized = (() => checkProperties(this))();
  }
  static initializeFromScheduledOrderMeal(
    orderMealId,
    mealSubscriptionInvoiceId,
    scheduledOrderMealId
  ) {
    const newOrderMeal = new OrderMeal();
    newOrderMeal.id = orderMealId;
    newOrderMeal.mealSubscriptionInvoiceId = mealSubscriptionInvoiceId;
    newOrderMeal.scheduledOrderMealId = scheduledOrderMealId;
    return newOrderMeal;
  }
}
