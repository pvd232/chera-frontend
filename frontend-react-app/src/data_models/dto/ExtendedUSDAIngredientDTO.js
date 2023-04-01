import USDAIngredientDTO from './USDAIngredientDTO';
export default class ExtendedUSDAIngredientDTO extends USDAIngredientDTO {
  constructor(ingredient, USDAIngredientDTOFactory) {
    super(ingredient);
    this.portions = ingredient.portions.map((portion) =>
      USDAIngredientDTOFactory.injectInstance(portion)
    );
  }
}
