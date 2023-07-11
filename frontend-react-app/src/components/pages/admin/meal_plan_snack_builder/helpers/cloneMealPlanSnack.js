import APIClient from '../../../../../helpers/APIClient';
export const cloneMealPlanSnack = async (
  oddMealPlanSnackRecipe,
  evenMealPlanSnack,
  multiplier
) => {
  const updatedEvenRecipe = [];
  oddMealPlanSnackRecipe.forEach((ingredient) => {
    const matchingEvenIngredient = evenMealPlanSnack.recipe.find(
      (evenIngredient) =>
        evenIngredient.usdaIngredientId === ingredient.usdaIngredientId
    );
    matchingEvenIngredient.quantity = ingredient.quantity;
    updatedEvenRecipe.push(matchingEvenIngredient);
  });

  await APIClient.updateRecipeIngredientNutrients(updatedEvenRecipe);
  await APIClient.updateRecipeIngredients(updatedEvenRecipe);
  evenMealPlanSnack.multiplier = multiplier;
  APIClient.updateMealPlanSnack(evenMealPlanSnack);
};
