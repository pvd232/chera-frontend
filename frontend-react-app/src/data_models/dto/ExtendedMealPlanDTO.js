import MealPlanDTO from './MealPlanDTO';
class ExtendedMealPlanDTO extends MealPlanDTO {
  constructor(extendedMealPlanDTO, usdaNutrientDailyValueDTOFactory) {
    super(extendedMealPlanDTO);
    const map = new Map();
    extendedMealPlanDTO.usda_nutrient_daily_values.forEach(
      (usdaNutrientDailyValue) =>
        map.set(
          usdaNutrientDailyValue.id,
          usdaNutrientDailyValueDTOFactory.injectInstance(
            usdaNutrientDailyValue
          )
        )
    );
    this.usdaNutrientDailyValues = map;
  }
}
export default ExtendedMealPlanDTO;
