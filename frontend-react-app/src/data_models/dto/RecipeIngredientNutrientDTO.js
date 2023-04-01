import checkProperties from '../../helpers/checkProperties';
export default class RecipeIngredientNutrientDTO {
  constructor(recipeIngredientNutrientJSON) {
    this.id = recipeIngredientNutrientJSON.id;
    this.recipeIngredientId = recipeIngredientNutrientJSON.recipe_ingredient_id;
    this.nutrientId = recipeIngredientNutrientJSON.nutrient_id;
    // Optional property in database
    this.usdaNutrientDailyValueAmount =
      recipeIngredientNutrientJSON.usda_nutrient_daily_value_amount;
    this.amount = recipeIngredientNutrientJSON.amount;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  toJSON() {
    return {
      id: this.id,
      recipe_ingredient_id: this.recipeIngredientId,
      nutrient_id: this.nutrientId,
      usda_nutrient_daily_value_amount: this.usdaNutrientDailyValueAmount,
      amount: this.amount,
    };
  }
}
