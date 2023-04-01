import checkProperties from '../../helpers/checkProperties';
export default class USDAIngredientDTO {
  constructor(usdaIngredientObject) {
    this.id = usdaIngredientObject.id;
    this.name = usdaIngredientObject.name;
    this.fdcId = usdaIngredientObject.fdc_id;
    this.amountOfGrams = usdaIngredientObject.amount_of_grams;
    this.kCalToGramRatio = usdaIngredientObject.k_cal_to_gram_ratio;
    this.kCal = usdaIngredientObject.k_cal;
    this.usdaDataType = usdaIngredientObject.usda_data_type;
    this.fdaIdentifier = usdaIngredientObject.fda_identifier;
    this.active = usdaIngredientObject.active;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      fdc_id: this.fdcId,
      amount_of_grams: this.amountOfGrams,
      k_cal: this.kCal,
      k_cal_to_gram_ratio: this.kCalToGramRatio,
      usda_data_type: this.usdaDataType,
      fda_identifier: this.fdaIdentifier,
      active: this.active,
    };
  }
}
