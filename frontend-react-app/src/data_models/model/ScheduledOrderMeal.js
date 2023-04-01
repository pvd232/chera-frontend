import checkProperties from '../../helpers/checkProperties';
import { v4 as uuid } from 'uuid';
export default class ScheduledOrderMeal {
  constructor(scheduledOrderMeal) {
    if (scheduledOrderMeal) {
      this.id = scheduledOrderMeal.id;
      this.mealId = scheduledOrderMeal.mealId;
      this.mealSubscriptionId = scheduledOrderMeal.mealSubscriptionId;
      this.deliveryDate = scheduledOrderMeal.deliveryDate;
      this.deliverySkipped = scheduledOrderMeal.deliverySkipped;
      this.deliveryPaused = scheduledOrderMeal.deliveryPaused;
      this.datetime = scheduledOrderMeal.datetime;
    } else {
      this.id = '';
      this.mealId = '';
      this.mealSubscriptionId = '';
      this.deliveryDate = '';
      this.deliverySkipped = false;
      this.deliveryPaused = false;
      this.datetime = '';
    }
    this.properlyInitialized = (() => checkProperties(this))();
  }
  static initializeFromScheduleMeal(scheduleMeal, deliveryDate) {
    const newScheduledOrderMeal = new ScheduledOrderMeal();
    newScheduledOrderMeal.id = uuid();
    newScheduledOrderMeal.mealId = scheduleMeal.mealId;
    newScheduledOrderMeal.mealSubscriptionId = scheduleMeal.mealSubscriptionId;
    newScheduledOrderMeal.deliveryDate = deliveryDate;
    newScheduledOrderMeal.deliveryPaused = false;
    newScheduledOrderMeal.deliverySkipped = false;
    newScheduledOrderMeal.datetime = Date.now();
    return newScheduledOrderMeal;
  }
  static initializeFromMeal(mealId, mealSubscriptionId, deliveryDate) {
    const newScheduledOrderMeal = new ScheduledOrderMeal();
    newScheduledOrderMeal.id = uuid();
    newScheduledOrderMeal.mealId = mealId;
    newScheduledOrderMeal.deliveryDate = deliveryDate;
    newScheduledOrderMeal.mealSubscriptionId = mealSubscriptionId;
    newScheduledOrderMeal.datetime = Date.now();
    return newScheduledOrderMeal;
  }
}
