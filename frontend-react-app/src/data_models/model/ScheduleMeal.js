import checkProperties from '../../helpers/checkProperties';
export default class ScheduleMeal {
  constructor(scheduleMeal) {
    this.id = scheduleMeal.id;
    this.mealId = scheduleMeal.mealId;
    this.mealSubscriptionId = scheduleMeal.mealSubscriptionId;
    this.properlyInitialized = (() => checkProperties(this))();
  }

  static initializeFromMeal(id, mealId, mealSubscriptionId) {
    const newScheduleMeal = new ScheduleMeal({
      id: id,
      mealId: mealId,
      mealSubscriptionId: mealSubscriptionId,
    });
    return newScheduleMeal;
  }
  static initializeFromStagedScheduleMeal(id, stagedScheduleMeal) {
    const newScheduleMeal = new ScheduleMeal({
      id: id,
      mealId: stagedScheduleMeal.mealId,
      mealSubscriptionId: stagedScheduleMeal.mealSubscriptionId,
    });
    return newScheduleMeal;
  }
}
