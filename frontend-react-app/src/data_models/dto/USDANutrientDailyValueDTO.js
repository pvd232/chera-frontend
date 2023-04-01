import checkProperties from '../../helpers/checkProperties';
export default class USDANutrientDailyValueDTO {
  constructor(nutrientObject) {
    this.nutrientId = nutrientObject.nutrient_id;
    this.mealPlanId = nutrientObject.meal_plan_id;
    this.amount = nutrientObject.amount;
    this.unit = nutrientObject.unit;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  toJSON() {
    return {
      nutrient_id: this.nutrientId,
      meal_plan_id: this.mealPlanId,
      amount: this.amount,
      unit: this.unit,
    };
  }
}
