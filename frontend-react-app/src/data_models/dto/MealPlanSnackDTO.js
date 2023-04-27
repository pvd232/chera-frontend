import checkProperties from '../../helpers/checkProperties';
export default class MealPlanSnackDTO {
  constructor(mealPlanSnackObject) {
    this.id = mealPlanSnackObject.id;
    this.snackId = mealPlanSnackObject.snack_id;
    this.mealPlanId = mealPlanSnackObject.meal_plan_id;
    this.active = mealPlanSnackObject.active;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  toJSON() {
    return {
      id: this.id,
      snack_id: this.snackId,
      meal_plan_id: this.mealPlanId,
      active: this.active,
    };
  }
}
