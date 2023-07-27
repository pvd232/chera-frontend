import FoodNutrientStatsDTO from './FoodNutrientStatsDTO.js';
export default class MealNutrientStatsDTO extends FoodNutrientStatsDTO {
  constructor(
    foodNutrientStatsJSON,
    nutrientDailyValueDTOFactory,
    extendedMealDTOFactory
  ) {
    super(foodNutrientStatsJSON, nutrientDailyValueDTOFactory);
    this.associatedMeal = extendedMealDTOFactory.injectInstance(
      foodNutrientStatsJSON.associated_meal
    );
  }
  get name() {
    return this.associatedMeal.name;
  }
  get mealTime() {
    return this.associatedMeal.mealTime;
  }
  get imageUrl() {
    return this.associatedMeal.imageUrl;
  }
  get dietaryRestrictions() {
    return this.associatedMeal.dietaryRestrictions;
  }
  get description() {
    return this.associatedMeal.description;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      associated_meal: this.associatedMeal.toJSON(),
    };
  }
}
