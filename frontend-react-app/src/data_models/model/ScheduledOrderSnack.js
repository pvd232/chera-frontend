import checkProperties from '../../helpers/checkProperties';
import { v4 as uuid } from 'uuid';
export default class ScheduledOrderSnack {
  constructor(scheduledOrderSnack) {
    if (scheduledOrderSnack) {
      this.id = scheduledOrderSnack.id;
      this.snackId = scheduledOrderSnack.snackId;
      this.mealSubscriptionId = scheduledOrderSnack.mealSubscriptionId;
      this.deliveryDate = scheduledOrderSnack.deliveryDate;
      this.deliverySkipped = scheduledOrderSnack.deliverySkipped;
      this.deliveryPaused = scheduledOrderSnack.deliveryPaused;
      this.datetime = scheduledOrderSnack.datetime;
    } else {
      this.id = '';
      this.snackId = '';
      this.mealSubscriptionId = '';
      this.deliveryDate = '';
      this.deliverySkipped = false;
      this.deliveryPaused = false;
      this.datetime = '';
    }
    this.properlyInitialized = (() => checkProperties(this))();
  }
  static initializeFromScheduleMeal(scheduleMeal, deliveryDate) {
    const newScheduledOrderSnack = new ScheduledOrderSnack();
    newScheduledOrderSnack.id = uuid();
    newScheduledOrderSnack.snackId = scheduleMeal.snackId;
    newScheduledOrderSnack.mealSubscriptionId = scheduleMeal.mealSubscriptionId;
    newScheduledOrderSnack.deliveryDate = deliveryDate;
    newScheduledOrderSnack.deliveryPaused = false;
    newScheduledOrderSnack.deliverySkipped = false;
    newScheduledOrderSnack.datetime = Date.now();
    return newScheduledOrderSnack;
  }
  static initializeFromMeal(snackId, mealSubscriptionId, deliveryDate) {
    const newScheduledOrderSnack = new ScheduledOrderSnack();
    newScheduledOrderSnack.id = uuid();
    newScheduledOrderSnack.snackId = snackId;
    newScheduledOrderSnack.deliveryDate = deliveryDate;
    newScheduledOrderSnack.mealSubscriptionId = mealSubscriptionId;
    newScheduledOrderSnack.datetime = Date.now();
    return newScheduledOrderSnack;
  }
}
