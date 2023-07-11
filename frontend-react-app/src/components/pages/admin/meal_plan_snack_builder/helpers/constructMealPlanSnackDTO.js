import SnackDTOFactory from '../../../../../data_models/factories/dto/SnackDTOFactory';
import MealDietaryRestrictionDTOFactory from '../../../../../data_models/factories/dto/MealDietaryRestrictionDTOFactory';
import ExtendedMealPlanSnackDTO from '../../../../../data_models/dto/ExtendedMealPlanSnackDTO';
import ExtendedMealPlanDTOFactory from '../../../../../data_models/factories/dto/ExtendedMealPlanDTOFactory';
import ExtendedRecipeIngredientDTOFactory from '../../../../../data_models/factories/dto/ExtendedRecipeIngredientDTOFactory';
import USDANutrientDailyValueDTOFactory from '../../../../../data_models/factories/dto/USDANutrientDailyValueDTOFactory';
import ExtendedRecipeIngredientNutrientDTOFactory from '../../../../../data_models/factories/dto/ExtendedRecipeIngredientNutrientDTOFactory';

export const constructMealPlanSnackDTO = (mealPlanSnackObject) => {
  return new ExtendedMealPlanSnackDTO(
    mealPlanSnackObject,
    new SnackDTOFactory(new MealDietaryRestrictionDTOFactory()),
    new ExtendedMealPlanDTOFactory(new USDANutrientDailyValueDTOFactory()),
    new ExtendedRecipeIngredientDTOFactory(
      new ExtendedRecipeIngredientNutrientDTOFactory()
    ),
    new ExtendedRecipeIngredientNutrientDTOFactory()
  );
};
