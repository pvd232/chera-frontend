import checkProperties from '../../helpers/checkProperties';
export default class MealPlanSnack {
  constructor(mealPlanSnackObject) {
    this.id = mealPlanSnackObject.id;
    this.snackId = mealPlanSnackObject.snackId;
    this.mealPlanId = mealPlanSnackObject.mealPlanId;
    this.active = mealPlanSnackObject.active;
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
