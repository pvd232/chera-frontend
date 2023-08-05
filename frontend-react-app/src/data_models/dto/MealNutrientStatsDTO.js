import FoodNutrientStatsDTO from './FoodNutrientStatsDTO.js';
export default class MealNutrientStatsDTO extends FoodNutrientStatsDTO {
  constructor(foodNutrientStatsJSON, nutrientDailyValueDTOFactory) {
    super(foodNutrientStatsJSON, nutrientDailyValueDTOFactory);
    this.mealId = foodNutrientStatsJSON.meal_id;
  }
  get associatedMeal() {
    return this._associatedMeal;
  }
  set associatedMeal(newAssociatedMeal) {
    this._associatedMeal = newAssociatedMeal;
  }
  get name() {
    return this._associatedMeal.name;
  }
  get mealTime() {
    return this._associatedMeal.mealTime;
  }

  get imageUrl() {
    return this._associatedMeal.imageUrl;
  }
  get dietaryRestrictions() {
    return this._associatedMeal.dietaryRestrictions;
  }
  get description() {
    return this._associatedMeal.description;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      associated_meal: this._associatedMeal.toJSON(),
    };
  }
}
