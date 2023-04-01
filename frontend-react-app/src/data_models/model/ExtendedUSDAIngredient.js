import USDAIngredient from './USDAIngredient';
export default class ExtendedUSDAIngredient extends USDAIngredient {
  constructor(ingredient, USDAIngredientFactory) {
    super(ingredient);
    this.portions = ingredient.portions.map((portion) =>
      USDAIngredientFactory.injectInstance(portion)
    );
  }
}
