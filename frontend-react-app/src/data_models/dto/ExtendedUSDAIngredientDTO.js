import USDAIngredientDTO from './USDAIngredientDTO';
export default class ExtendedUSDAIngredientDTO extends USDAIngredientDTO {
  constructor(ingredient, USDAIngredientPortionDTOFactory) {
    super(ingredient);
    this.portions = ingredient.portions.map((portion) =>
      USDAIngredientPortionDTOFactory.injectInstance(portion)
    );
  }
}
