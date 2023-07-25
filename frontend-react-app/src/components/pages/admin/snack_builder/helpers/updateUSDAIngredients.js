import { v4 as uuid } from 'uuid';
import APIClient from '../../../../../helpers/APIClient';
import ExtendedUSDAIngredientDTO from '../../../../../data_models/dto/ExtendedUSDAIngredientDTO';
import ExtendedUSDAIngredient from '../../../../../data_models/model/ExtendedUSDAIngredient';
import USDAIngredientPortionDTOFactory from '../../../../../data_models/factories/dto/USDAIngredientPortionDTOFactory';
import USDAIngredientPortionFactory from '../../../../../data_models/factories/model/USDAIngredientPortionFactory';
import RecipeIngredientItem from '../../../../ui_data_containers/RecipeIngredientItem';
export default async function updateUSDAIngredients({
  mounted,
  setExtendedUsdaIngredients,
  setMealPlans,
  setMealPlanSnacks,
}) {
  const extendedUSDAIngredientData =
    await APIClient.getExtendedUSDAIngredients();
  const extendedUSDAIngredientDTOs = extendedUSDAIngredientData.map(
    (ingredient) => {
      return new ExtendedUSDAIngredientDTO(
        ingredient,
        new USDAIngredientPortionDTOFactory()
      );
    }
  );
  const extendedUSDAIngredients = extendedUSDAIngredientDTOs.map(
    (ingredient) => {
      return new ExtendedUSDAIngredient(
        ingredient,
        new USDAIngredientPortionFactory()
      );
    }
  );
  extendedUSDAIngredients.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  const extendedIngredientsMap = new Map();
  extendedUSDAIngredients.forEach((ingredient) => {
    extendedIngredientsMap.set(ingredient.id, ingredient);
  });
  if (mounted) {
    setExtendedUsdaIngredients(extendedIngredientsMap);
  }

  const mealPlans = await APIClient.getMealPlans();
  if (mounted) {
    setMealPlans(mealPlans);
  }
  //   4th snack plan is the default snack plan
  const mealPlanSnacks = await APIClient.getSpecificExtendedMealPlanSnacks(
    mealPlans[4].id
  );
  const snacksToReturn = [];
  for (const extendedMealPlanSnack of mealPlanSnacks) {
    const snackIngredients = [];
    for (const recipeIngredient of extendedMealPlanSnack.recipe) {
      const extendedUSDAIngredient = {
        ...extendedIngredientsMap.get(recipeIngredient.usda_ingredient_id),
      };
      const servingSize = extendedUSDAIngredient.portions.find(
        (portion) => portion.id === recipeIngredient.usda_ingredient_portion_id
      );
      const recipeIngredientId = uuid();
      const recipeIngredientItem =
        RecipeIngredientItem.constructFromExtendedUSDAIngredient(
          extendedUSDAIngredient,
          recipeIngredientId
        );
      recipeIngredientItem.quantity = recipeIngredient.quantity;
      recipeIngredientItem.usdaIngredientPortionId =
        recipeIngredient.usda_ingredient_portion_id;
      recipeIngredientItem.nonMetricUnit = servingSize.non_metric_unit;
      snackIngredients.push(recipeIngredientItem);
    }
    const snack = {
      snackId: extendedMealPlanSnack.associated_snack.id,
      snackName: extendedMealPlanSnack.associated_snack.name,
      snackDescription: extendedMealPlanSnack.associated_snack.description,
      imageUrl: extendedMealPlanSnack.associated_snack.image_url,
      snackIngredients: snackIngredients,
    };
    snacksToReturn.push(snack);
  }
  if (mounted) {
    setMealPlanSnacks(snacksToReturn);
  }
  return snacksToReturn;
}
