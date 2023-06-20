import checkProperties from '../../helpers/checkProperties';
export default class RecipeIngredientDTO {
  constructor(recipeIngredientObject) {
    this.id = recipeIngredientObject.id;
    this.usdaIngredientId = recipeIngredientObject.usda_ingredient_id;
    this.mealPlanMealId = recipeIngredientObject.meal_plan_meal_id;
    this.mealPlanSnackId = recipeIngredientObject.meal_plan_snack_id ?? '';
    this.usdaIngredientPortionId =
      recipeIngredientObject.usda_ingredient_portion_id;
    this.quantity = recipeIngredientObject.quantity;
    this.active = recipeIngredientObject.active;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  toJSON() {
    console.log('this.mealPlanSnackId', this.mealPlanSnackId);
    return {
      id: this.id,
      usda_ingredient_id: this.usdaIngredientId,
      meal_plan_meal_id: this.mealPlanMealId,
      meal_plan_snack_id: this.mealPlanSnackId,
      usda_ingredient_portion_id: this.usdaIngredientPortionId,
      quantity: this.quantity,
      active: this.active,
    };
  }
  static injectInstance(recipeIngredientObject) {
    return new RecipeIngredientDTO(recipeIngredientObject);
  }
}
