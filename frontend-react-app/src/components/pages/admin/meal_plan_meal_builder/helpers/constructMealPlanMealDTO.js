import ExtendedMealDTOFactory from '../../../../../data_models/factories/dto/ExtendedMealDTOFactory';
import MealDietaryRestrictionDTOFactory from '../../../../../data_models/factories/dto/MealDietaryRestrictionDTOFactory';
import ExtendedMealPlanMealDTO from '../../../../../data_models/dto/ExtendedMealPlanMealDTO';
import ExtendedMealPlanDTOFactory from '../../../../../data_models/factories/dto/ExtendedMealPlanDTOFactory';
import ExtendedRecipeIngredientDTOFactory from '../../../../../data_models/factories/dto/ExtendedRecipeIngredientDTOFactory';
import USDANutrientDailyValueDTOFactory from '../../../../../data_models/factories/dto/USDANutrientDailyValueDTOFactory';
import ExtendedRecipeIngredientNutrientDTOFactory from '../../../../../data_models/factories/dto/ExtendedRecipeIngredientNutrientDTOFactory';

export const constructMealPlanMealDTO = (mealPlanMealObject) => {
  return new ExtendedMealPlanMealDTO(
    mealPlanMealObject,
    new ExtendedMealDTOFactory(new MealDietaryRestrictionDTOFactory()),
    new ExtendedMealPlanDTOFactory(new USDANutrientDailyValueDTOFactory()),
    new ExtendedRecipeIngredientDTOFactory(
      new ExtendedRecipeIngredientNutrientDTOFactory()
    ),
    new ExtendedRecipeIngredientNutrientDTOFactory()
  );
};
