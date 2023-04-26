import checkProperties from '../../helpers/checkProperties';
export default class MealPlanMealDTO {
  constructor(mealPlanMealObject) {
    this.id = mealPlanMealObject.id;
    this.mealId = mealPlanMealObject.meal_id;
    this.mealPlanId = mealPlanMealObject.meal_plan_id;
    this.active = mealPlanMealObject.active;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  toJSON() {
    return {
      id: this.id,
      meal_id: this.mealId,
      meal_plan_id: this.mealPlanId,
      active: this.active,
    };
  }
}
