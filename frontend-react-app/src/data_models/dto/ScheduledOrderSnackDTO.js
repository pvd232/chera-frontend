import checkProperties from '../../helpers/checkProperties';
export default class ScheduledOrderSnackDTO {
  constructor(scheduledOrderSnackDTO) {
    this.id = scheduledOrderSnackDTO.id;
    this.mealSubscriptionId = scheduledOrderSnackDTO.meal_subscription_id;
    this.snackId = scheduledOrderSnackDTO.snack_id;
    this.deliveryDate = new Date(scheduledOrderSnackDTO.delivery_date * 1000);
    this.deliverySkipped = scheduledOrderSnackDTO.delivery_skipped;
    this.deliveryPaused = scheduledOrderSnackDTO.delivery_paused;
    this.datetime = scheduledOrderSnackDTO.datetime * 1000;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  static initializeFromScheduledOrderSnack(scheduledOrderSnack) {
    return new ScheduledOrderSnackDTO({
      id: scheduledOrderSnack.id,
      meal_subscription_id: scheduledOrderSnack.mealSubscriptionId,
      snack_id: scheduledOrderSnack.snackId,
      delivery_date: scheduledOrderSnack.deliveryDate.getTime() / 1000,
      delivery_skipped: scheduledOrderSnack.deliverySkipped,
      delivery_paused: scheduledOrderSnack.deliveryPaused,
      datetime: scheduledOrderSnack.datetime / 1000,
    });
  }
  toJSON() {
    return {
      id: this.id,
      meal_subscription_id: this.mealSubscriptionId,
      snack_id: this.snackId,
      delivery_date: this.deliveryDate.getTime() / 1000,
      delivery_skipped: this.deliverySkipped,
      delivery_paused: this.deliveryPaused,
      datetime: this.datetime / 1000,
    };
  }
}
