import checkProperties from '../../helpers/checkProperties';
import BaseRecipeIngredientItem from './BaseRecipeIngredientItem';
class RecipeIngredientItem extends BaseRecipeIngredientItem {
  constructor(recipeIngredientObject) {
    super(recipeIngredientObject);
    this.usdaIngredientPortions = recipeIngredientObject.usdaIngredientPortions;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  static constructFromExtendedUSDAIngredient(
    extendedUSDAIngredient,
    recipeIngredientId
  ) {
    return new RecipeIngredientItem({
      id: recipeIngredientId,
      usdaIngredientId: extendedUSDAIngredient.id,
      name: extendedUSDAIngredient.name,
      usdaIngredientPortionId: '',
      quantity: 1,
      usdaIngredientPortions: extendedUSDAIngredient.portions,
      kCal: extendedUSDAIngredient.kCal,
      active: true,
    });
  }
}
export default RecipeIngredientItem;
