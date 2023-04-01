import checkProperties from '../helpers/checkProperties';
export default class OrderMealItem {
  constructor(orderMeal) {
    this.id = orderMeal.id;
    this.mealSubscriptionInvoiceId = orderMeal.mealSubscriptionInvoiceId;
    this.scheduledOrderMealId = orderMeal.scheduledOrderMealId;
    this.deliveryDate = orderMeal.deliveryDate;
    this.quantity = 1;
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
