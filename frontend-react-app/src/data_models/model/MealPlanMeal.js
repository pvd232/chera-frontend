import checkProperties from '../../helpers/checkProperties';
export default class MealPlanMeal {
  constructor(mealPlanMealObject) {
    this.id = mealPlanMealObject.id;
    this.mealId = mealPlanMealObject.mealId;
    this.mealPlanId = mealPlanMealObject.mealPlanId;
    this.multiplier = mealPlanMealObject.multiplier;
    this.active = mealPlanMealObject.active;
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
