import checkProperties from '../../helpers/checkProperties';
export default class ScheduleMealDTO {
  constructor(scheduleMealJSON) {
    this.id = scheduleMealJSON.id;
    this.mealId = scheduleMealJSON.meal_id;
    this.mealSubscriptionId = scheduleMealJSON.meal_subscription_id;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  static initializeFromScheduleMeal(scheduleMeal) {
    return new ScheduleMealDTO({
      id: scheduleMeal.id,
      meal_id: scheduleMeal.mealId,
      meal_subscription_id: scheduleMeal.mealSubscriptionId,
    });
  }
  toJSON() {
    return {
      id: this.id,
      meal_subscription_id: this.mealSubscriptionId,
      meal_id: this.mealId,
    };
  }
}
