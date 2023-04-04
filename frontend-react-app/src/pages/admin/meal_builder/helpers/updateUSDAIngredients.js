import APIClient from '../../../../helpers/APIClient';
import ExtendedUSDAIngredientDTO from '../../../../data_models/dto/ExtendedUSDAIngredientDTO';
import ExtendedUSDAIngredient from '../../../../data_models/model/ExtendedUSDAIngredient';
import USDAIngredientPortionDTOFactory from '../../../../data_models/factories/dto/ExtendedUSDAIngredientDTOFactory';
import USDAIngredientPortionFactory from '../../../../data_models/factories/model/USDAIngredientPortionFactory';
export default async function updateUSDAIngredients({
  mounted,
  setExtendedUsdaIngredients,
  setMealPrice,
  setDietaryRestrictions,
  setMealPlans,
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
  const mealPrice = await APIClient.getMealPrice();
  if (mounted) {
    setMealPrice(mealPrice);
  }
  const dietaryRestrictions = await APIClient.getDietaryRestrictions();
  if (mounted) {
    setDietaryRestrictions(dietaryRestrictions);
  }
  const mealPlans = await APIClient.getMealPlans();
  if (mounted) {
    setMealPlans(mealPlans);
  }
  return true;
}
