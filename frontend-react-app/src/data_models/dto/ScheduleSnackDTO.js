import checkProperties from '../../helpers/checkProperties';
export default class ScheduleSnackDTO {
  constructor(scheduleSnackJSON) {
    this.id = scheduleSnackJSON.id;
    this.snackId = scheduleSnackJSON.snack_id;
    this.mealSubscriptionId = scheduleSnackJSON.meal_subscription_id;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  static initializeFromScheduleSnack(scheduleSnack) {
    return new ScheduleSnackDTO({
      id: scheduleSnack.id,
      snack_id: scheduleSnack.snackId,
      meal_subscription_id: scheduleSnack.mealSubscriptionId,
    });
  }
  toJSON() {
    return {
      id: this.id,
      meal_subscription_id: this.mealSubscriptionId,
      snack_id: this.snackId,
    };
  }
}
