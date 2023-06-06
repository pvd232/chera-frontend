export default class ScheduledOrderMealCardItem {
  constructor(extendedScheduledOrderMeal) {
    this.extendedScheduledOrderMeal = extendedScheduledOrderMeal;
    this.meal = extendedScheduledOrderMeal.associatedMeal;
    this.deliveryDate = extendedScheduledOrderMeal.deliveryDate;
    this.quantity = 1;
  }
}
