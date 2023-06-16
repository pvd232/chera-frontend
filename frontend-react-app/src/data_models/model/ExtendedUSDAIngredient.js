import USDAIngredient from './USDAIngredient';
export default class ExtendedUSDAIngredient extends USDAIngredient {
  constructor(ingredient, USDAIngredientPortionactory) {
    super(ingredient);
    this.portions = ingredient.portions.map((portion) =>
      USDAIngredientPortionactory.injectInstance(portion)
    );
  }
}
