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
  setMealPrice,
  setDietaryRestrictions,
  setMealPlans,
  setMealPlanMeals,
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
  //   4th meal plan is the default meal plan
  const mealPlanMeals = await APIClient.getSpecificExtendedMealPlanMeals(
    mealPlans[4].id
  );
  const mealsToReturn = [];
  for (const extendedMealPlanMeal of mealPlanMeals) {
    const mealIngredients = [];
    for (const recipeIngredient of extendedMealPlanMeal.recipe) {
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
      mealIngredients.push(recipeIngredientItem);
    }
    const meal = {
      mealId: extendedMealPlanMeal.associated_meal.id,
      mealName: extendedMealPlanMeal.associated_meal.name,
      mealTime: extendedMealPlanMeal.associated_meal.meal_time,
      mealDescription: extendedMealPlanMeal.associated_meal.description,
      isVegetarian:
        extendedMealPlanMeal.associated_meal.dietary_restrictions.length > 0,
      imageUrl: extendedMealPlanMeal.associated_meal.image_url,
      mealIngredients: mealIngredients,
    };
    mealsToReturn.push(meal);
  }
  if (mounted) {
    setMealPlanMeals(mealsToReturn);
  }
  return mealsToReturn;
}
