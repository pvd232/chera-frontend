import checkProperties from '../../helpers/checkProperties';
export default class RecipeIngredientNutrient {
  constructor(recipeIngredientNutrientObject) {
    this.id = recipeIngredientNutrientObject.id;
    this.nutrientId = recipeIngredientNutrientObject.nutrientId;
    this.amount = recipeIngredientNutrientObject.amount;
    this.recipeIngredientId = recipeIngredientNutrientObject.recipeIngredientId;
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
