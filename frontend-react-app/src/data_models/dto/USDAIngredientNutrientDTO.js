import checkProperties from '../../helpers/checkProperties';
export default class USDAIngredientNutrientDTO {
  constructor(usdaIngredientNutrientJSON) {
    this.id = usdaIngredientNutrientJSON.id;
    this.usdaIngredientId = usdaIngredientNutrientJSON.usda_ingredient_id;
    this.nutrientId = usdaIngredientNutrientJSON.nutrient_id;
    this.amount = usdaIngredientNutrientJSON.amount;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  toJSON() {
    return {
      id: this.id,
      usda_ingredient_id: this.usdaIngredientId,
      nutrient_id: this.nutrientId,
      amount: this.amount,
    };
  }
}
