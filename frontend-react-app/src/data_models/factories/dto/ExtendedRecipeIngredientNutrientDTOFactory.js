import ExtendedRecipeIngredientNutrientDTO from '../../dto/ExtendedRecipeIngredientNutrientDTO';
export default class ExtendedRecipeIngredientNutrientDTOFactory {
  injectInstance(recipeIngredientNutrientJSON) {
    return new ExtendedRecipeIngredientNutrientDTO(
      recipeIngredientNutrientJSON
    );
  }
}
