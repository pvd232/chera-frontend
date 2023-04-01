import USDANutrientDailyValueDTO from '../../dto/USDANutrientDailyValueDTO';
export default class USDANutrientDailyValueDTOFactory {
  injectInstance(usdaNutrientDailyValueJSON) {
    return new USDANutrientDailyValueDTO(usdaNutrientDailyValueJSON);
  }
}
