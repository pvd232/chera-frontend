import ExtendedMealDTOFactory from '../../../../../data_models/factories/dto/ExtendedMealDTOFactory';
import MealDietaryRestrictionDTOFactory from '../../../../../data_models/factories/dto/MealDietaryRestrictionDTOFactory';
import NutrientDailyValueDTOFactory from '../../../../../data_models/factories/dto/NutrientDailyValueDTOFactory';
import MealNutrientStatsDTO from '../../../../../data_models/dto/MealNutrientStatsDTO';

export const mapMealNutrientStatsData = (
  mealNutrientStatsData,
  extendedMeals = false
) => {
  if (!extendedMeals) {
    return mealNutrientStatsData.map(
      (mealNutrientStats) =>
        new MealNutrientStatsDTO(
          mealNutrientStats,
          new NutrientDailyValueDTOFactory(),
          new ExtendedMealDTOFactory(new MealDietaryRestrictionDTOFactory())
        )
    );
  } else {
    return mealNutrientStatsData.map((mealNutrientStats) => {
      mealNutrientStats.associatedMeal = extendedMeals.find(
        (extendedMeal) => extendedMeal.id === mealNutrientStats.mealId
      );
      return mealNutrientStats;
    });
  }
};
