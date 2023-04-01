import RecipeIngredientItem from '../../../../ui_data_containers/RecipeIngredientItem';
import { v4 as uuid } from 'uuid';
export default function getRecipeIngredientItems(extendedUSDAIngredients) {
  return extendedUSDAIngredients.map((extendedUSDAIngredient) => {
    const recipeIngredientId = uuid();
    return RecipeIngredientItem.constructFromExtendedUSDAIngredient(
      extendedUSDAIngredient,
      recipeIngredientId
    );
  });
}
