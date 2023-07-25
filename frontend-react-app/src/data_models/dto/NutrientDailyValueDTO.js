import checkProperties from '../../helpers/checkProperties';
export default class NutrientDailyValueDTO {
  constructor(nutrientDailyValueObject) {
    this.nutrientId = nutrientDailyValueObject.nutrient_id;
    this.dailyValue = nutrientDailyValueObject.daily_value;
    this.nutrientUnit = nutrientDailyValueObject.nutrient_unit;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  toJSON() {
    return {
      nutrient_id: this.id,
      daily_value: this.mealTime,
      nutrient_unit: this.name,
    };
  }
}
