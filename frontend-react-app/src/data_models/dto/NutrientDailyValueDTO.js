import checkProperties from '../../helpers/checkProperties';
export default class NutrientDailyValueDTO {
  constructor(nutrientDailyValueObject) {
    this.id = nutrientDailyValueObject.id;
    this.name = nutrientDailyValueObject.name;
    this.nutrientId = nutrientDailyValueObject.nutrient_id;
    this.amount = nutrientDailyValueObject.amount;
    this.dailyValueAmount = nutrientDailyValueObject.daily_value_amount;
    this.unit = nutrientDailyValueObject.unit;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      nutrient_id: this.nutrientId,
      amount: this.amount,
      daily_value_amount: this.dailyValueAmount,
      unit: this.unit,
    };
  }
}
