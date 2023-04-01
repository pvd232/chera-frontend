import ExtendedRecipeIngredientDTO from '../../dto/ExtendedRecipeIngredientDTO';

export default class ExtendedRecipeIngredientDTOFactory {
  constructor(extendedRecipeIngredientNutrientDTOFactory) {
    this.extendedRecipeIngredientNutrientDTOFactory =
      extendedRecipeIngredientNutrientDTOFactory;
  }
  injectInstance(recipeingredientJSON) {
    return new ExtendedRecipeIngredientDTO(
      recipeingredientJSON,
      this.extendedRecipeIngredientNutrientDTOFactory
    );
  }
}
