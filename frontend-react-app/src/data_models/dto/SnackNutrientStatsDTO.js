import FoodNutrientStatsDTO from './FoodNutrientStatsDTO.js';
export default class SnackNutrientStatsDTO extends FoodNutrientStatsDTO {
  constructor(
    foodNutrientStatsJSON,
    nutrientDailyValueDTOFactory,
    extendedSnackDTOFactory
  ) {
    super(foodNutrientStatsJSON, nutrientDailyValueDTOFactory);
    this.associatedSnack = extendedSnackDTOFactory.injectInstance(
      foodNutrientStatsJSON.associated_snack
    );
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
