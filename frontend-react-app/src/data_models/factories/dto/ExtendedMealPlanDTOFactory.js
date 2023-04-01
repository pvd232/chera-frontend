import ExtendedMealPlanDTO from '../../dto/ExtendedMealPlanDTO';

export default class ExtendedMealPlanDTOFactory {
  constructor(usdaNutrientDailyValueDTOFactory) {
    this.usdaNutrientDailyValueDTOFactory = usdaNutrientDailyValueDTOFactory;
  }
  injectInstance(mealplanJSON) {
    return new ExtendedMealPlanDTO(mealplanJSON, this.usdaNutrientDailyValueDTOFactory);
  }
}
