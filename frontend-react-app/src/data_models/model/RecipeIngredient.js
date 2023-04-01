import checkProperties from '../../helpers/checkProperties';
export default class RecipeIngredient {
  constructor(recipeIngredientObject) {
    this.id = recipeIngredientObject.id;
    this.usdaIngredientId = recipeIngredientObject.usdaIngredientId;
    this.mealPlanMealId = recipeIngredientObject.mealPlanMealId;
    this.usdaIngredientPortionId =
      recipeIngredientObject.usdaIngredientPortionId;
    this.quantity = recipeIngredientObject.quantity;
    this.kCal = recipeIngredientObject.kCal;
    this.active = recipeIngredientObject.active;
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
