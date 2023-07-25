import ExtendedMealDTOFactory from '../../../../../data_models/factories/dto/ExtendedMealDTOFactory';
import MealDietaryRestrictionDTOFactory from '../../../../../data_models/factories/dto/MealDietaryRestrictionDTOFactory';
import NutrientDailyValueDTOFactory from '../../../../../data_models/factories/dto/NutrientDailyValueDTOFactory';
import MealNutrientStatsDTO from '../../../../../data_models/dto/MealNutrientStatsDTO';

export const mapMealNutrientStatsData = async (mealNutrientStatsData) => {
  return mealNutrientStatsData.map(
    (mealNutrientStatsData) =>
      new MealNutrientStatsDTO(
        mealNutrientStatsData,
        new NutrientDailyValueDTOFactory(),
        new ExtendedMealDTOFactory(new MealDietaryRestrictionDTOFactory())
      )
  );
};
