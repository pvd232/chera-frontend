import RecipeIngredientNutrientDTO from '../../dto/RecipeIngredientNutrientDTO';
export default class RecipeIngredientNutrientDTOFactory {
  injectInstance(recipeIngredientNutrientJSON) {
    return new RecipeIngredientNutrientDTO(recipeIngredientNutrientJSON);
  }
}
