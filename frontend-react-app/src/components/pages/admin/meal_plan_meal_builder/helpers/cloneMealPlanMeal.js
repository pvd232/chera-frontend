import APIClient from '../../../../../helpers/APIClient';
export const cloneMealPlanMeal = async (
  oddMealPlanMealRecipe,
  evenMealPlanMeal,
  multiplier
) => {
  const updatedEvenRecipe = [];
  oddMealPlanMealRecipe.forEach((ingredient) => {
    const matchingEvenIngredient = evenMealPlanMeal.recipe.find(
      (evenIngredient) =>
        evenIngredient.usdaIngredientId === ingredient.usdaIngredientId
    );
    matchingEvenIngredient.quantity = ingredient.quantity;
    updatedEvenRecipe.push(matchingEvenIngredient);
  });

  await APIClient.updateRecipeIngredientNutrients(updatedEvenRecipe);
  await APIClient.updateRecipeIngredients(updatedEvenRecipe);
  evenMealPlanMeal.multiplier = multiplier;
  APIClient.updateMealPlanMeal(evenMealPlanMeal);
};
