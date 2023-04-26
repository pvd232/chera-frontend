import checkProperties from '../../helpers/checkProperties';
export default class ScheduledOrderMealDTO {
  constructor(scheduledOrderMealDTO) {
    this.id = scheduledOrderMealDTO.id;
    this.mealSubscriptionId = scheduledOrderMealDTO.meal_subscription_id;
    this.mealId = scheduledOrderMealDTO.meal_id;
    this.deliveryDate = new Date(scheduledOrderMealDTO.delivery_date * 1000);
    this.deliverySkipped = scheduledOrderMealDTO.delivery_skipped;
    this.deliveryPaused = scheduledOrderMealDTO.delivery_paused;
    this.datetime = scheduledOrderMealDTO.datetime * 1000;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  static initializeFromScheduledOrderMeal(scheduledOrderMeal) {
    return new ScheduledOrderMealDTO({
      id: scheduledOrderMeal.id,
      meal_subscription_id: scheduledOrderMeal.mealSubscriptionId,
      meal_id: scheduledOrderMeal.mealId,
      delivery_date: scheduledOrderMeal.deliveryDate.getTime() / 1000,
      delivery_skipped: scheduledOrderMeal.deliverySkipped,
      delivery_paused: scheduledOrderMeal.deliveryPaused,
      datetime: scheduledOrderMeal.datetime / 1000,
    });
  }
  toJSON() {
    return {
      id: this.id,
      meal_subscription_id: this.mealSubscriptionId,
      meal_id: this.mealId,
      delivery_date: this.deliveryDate.getTime() / 1000,
      delivery_skipped: this.deliverySkipped,
      delivery_paused: this.deliveryPaused,
      datetime: this.datetime / 1000,
    };
  }
}
