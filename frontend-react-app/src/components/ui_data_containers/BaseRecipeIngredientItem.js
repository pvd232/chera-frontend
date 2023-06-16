import checkProperties from '../../helpers/checkProperties';
export default class BaseIngredientItem {
  constructor(recipeIngredientObject) {
    this.id = recipeIngredientObject.id;
    this.usdaIngredientId = recipeIngredientObject.usdaIngredientId;
    this.name = recipeIngredientObject.name;
    this.usdaIngredientPortionId =
      recipeIngredientObject.usdaIngredientPortionId;
    this.quantity = recipeIngredientObject.quantity;
    this.active = recipeIngredientObject.active;
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
