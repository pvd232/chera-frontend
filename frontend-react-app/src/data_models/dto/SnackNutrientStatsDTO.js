import FoodNutrientStatsDTO from './FoodNutrientStatsDTO.js';
export default class SnackNutrientStatsDTO extends FoodNutrientStatsDTO {
  constructor(
    foodNutrientStatsJSON,
    mealPlanDTOFactory,
    nutrientDailyValueDTOFactory,
    extendedSnackDTOFactory,
    extendedSnackJSON
  ) {
    super(
      foodNutrientStatsJSON,
      mealPlanDTOFactory,
      nutrientDailyValueDTOFactory
    );
    this.associatedSnack =
      extendedSnackDTOFactory.injectInstance(extendedSnackJSON);
  }
  get name() {
    return this.associatedSnack.name;
  }
  get snackTime() {
    return this.associatedSnack.snackTime;
  }
  get imageUrl() {
    return this.associatedSnack.imageUrl;
  }
  get dietaryRestrictions() {
    return this.associatedSnack.dietaryRestrictions;
  }
  get description() {
    return this.associatedSnack.description;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      associated_snack: this.associatedSnack.toJSON(),
    };
  }
}
