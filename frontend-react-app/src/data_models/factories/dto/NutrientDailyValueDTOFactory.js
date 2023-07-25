import NutrientDailyValueDTO from '../../dto/NutrientDailyValueDTO.js';
export default class NutrientDailyValueDTOFactory {
  injectInstance(nutrientDailyValueJSON) {
    return new NutrientDailyValueDTO(nutrientDailyValueJSON);
  }
}
