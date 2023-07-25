import FoodNutrientStatsDTO from './FoodNutrientStatsDTO.js';
export default class MealNutrientStatsDTO extends FoodNutrientStatsDTO {
  constructor(
    foodNutrientStatsJSON,
    mealPlanDTOFactory,
    nutrientDailyValueDTOFactory,
    extendedMealDTOFactory,
    extendedMealJSON
  ) {
    super(
      foodNutrientStatsJSON,
      mealPlanDTOFactory,
      nutrientDailyValueDTOFactory
    );
    this.associatedMeal =
      extendedMealDTOFactory.injectInstance(extendedMealJSON);
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
