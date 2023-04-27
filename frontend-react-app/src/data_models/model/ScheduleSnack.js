import checkProperties from '../../helpers/checkProperties';
export default class ScheduleSnack {
  constructor(scheduleSnack) {
    this.id = scheduleSnack.id;
    this.snackId = scheduleSnack.snackId;
    this.mealSubscriptionId = scheduleSnack.mealSubscriptionId;
    this.properlyInitialized = (() => checkProperties(this))();
  }

  static initializeFromMeal(id, snackId, mealSubscriptionId) {
    const newScheduleSnack = new ScheduleSnack({
      id: id,
      snackId: snackId,
      mealSubscriptionId: mealSubscriptionId,
    });
    return newScheduleSnack;
  }
  static initializeFromStagedScheduleSnack(id, stagedScheduleSnack) {
    const newScheduleSnack = new ScheduleSnack({
      id: id,
      snackId: stagedScheduleSnack.snackId,
      mealSubscriptionId: stagedScheduleSnack.mealSubscriptionId,
    });
    return newScheduleSnack;
  }
}
