import SnackDTOFactory from '../../../../../data_models/factories/dto/SnackDTOFactory';
import ExtendedRecipeIngredientDTOFactory from '../../../../../data_models/factories/dto/ExtendedRecipeIngredientDTOFactory';
import ExtendedMealPlanDTOFactory from '../../../../../data_models/factories/dto/ExtendedMealPlanDTOFactory';
import ExtendedRecipeIngredientNutrientDTOFactory from '../../../../../data_models/factories/dto/ExtendedRecipeIngredientNutrientDTOFactory';
import USDANutrientDailyValueDTOFactory from '../../../../../data_models/factories/dto/USDANutrientDailyValueDTOFactory';
import ExtendedMealPlanSnackDTO from '../../../../../data_models/dto/ExtendedMealPlanSnackDTO';

export const mapExtendedMealPlanSnackData = (mealPlanSnacksData) => {
  return mealPlanSnacksData.map(
    (extendedMealPlanSnackData) =>
      new ExtendedMealPlanSnackDTO(
        extendedMealPlanSnackData,
        new SnackDTOFactory(),
        new ExtendedMealPlanDTOFactory(new USDANutrientDailyValueDTOFactory()),
        new ExtendedRecipeIngredientDTOFactory(
          new ExtendedRecipeIngredientNutrientDTOFactory()
        ),
        new ExtendedRecipeIngredientNutrientDTOFactory()
      )
  );
};
