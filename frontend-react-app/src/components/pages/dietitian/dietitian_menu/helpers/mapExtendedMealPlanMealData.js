import ExtendedMealDTOFactory from '../../../../../data_models/factories/dto/ExtendedMealDTOFactory';
import MealDietaryRestrictionDTOFactory from '../../../../../data_models/factories/dto/MealDietaryRestrictionDTOFactory';
import ExtendedRecipeIngredientDTOFactory from '../../../../../data_models/factories/dto/ExtendedRecipeIngredientDTOFactory';
import ExtendedMealPlanDTOFactory from '../../../../../data_models/factories/dto/ExtendedMealPlanDTOFactory';
import ExtendedRecipeIngredientNutrientDTOFactory from '../../../../../data_models/factories/dto/ExtendedRecipeIngredientNutrientDTOFactory';
import USDANutrientDailyValueDTOFactory from '../../../../../data_models/factories/dto/USDANutrientDailyValueDTOFactory';
import ExtendedMealPlanMealDTO from '../../../../../data_models/dto/ExtendedMealPlanMealDTO';

export const mapExtendedMealPlanMealData = (mealPlanMealsData) => {
  return mealPlanMealsData.map(
    (extendedMealPlanMealData) =>
      new ExtendedMealPlanMealDTO(
        extendedMealPlanMealData,
        new ExtendedMealDTOFactory(new MealDietaryRestrictionDTOFactory()),
        new ExtendedMealPlanDTOFactory(new USDANutrientDailyValueDTOFactory()),
        new ExtendedRecipeIngredientDTOFactory(
          new ExtendedRecipeIngredientNutrientDTOFactory()
        ),
        new ExtendedRecipeIngredientNutrientDTOFactory()
      )
  );
};
