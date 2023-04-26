import checkProperties from '../../helpers/checkProperties';
export default class OrderMealDTO {
  constructor(orderMealJSON) {
    if (orderMealJSON) {
      this.id = orderMealJSON.id;
      this.mealSubscriptionInvoiceId =
        orderMealJSON.meal_subscription_invoice_id;
      this.scheduledOrderMealId = orderMealJSON.scheduled_order_meal_id;
    } else {
      this.id = '';
      this.mealSubscriptionId = '';
      this.mealSubscriptionInvoiceId = '';
      this.scheduledOrderMealId = '';
    }
    this.properlyInitialized = (() => checkProperties(this))();
  }
  static initializeFromOrderMeal(orderMeal) {
    const newOrderMeal = new OrderMealDTO();
    newOrderMeal.id = orderMeal.id;
    newOrderMeal.mealSubscriptionInvoiceId =
      orderMeal.mealSubscriptionInvoiceId;
    newOrderMeal.scheduledOrderMealId = orderMeal.scheduledOrderMealId;
    return newOrderMeal;
  }

  toJSON() {
    return {
      id: this.id,
      meal_subscription_invoice_id: this.mealSubscriptionInvoiceId,
      scheduled_order_meal_id: this.scheduledOrderMealId,
    };
  }
}
