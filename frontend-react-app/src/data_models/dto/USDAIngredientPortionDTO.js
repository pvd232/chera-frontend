import checkProperties from '../../helpers/checkProperties';
export default class USDAIngredientPortionDTO {
  constructor(usdaIngredientPortionObject) {
    this.id = usdaIngredientPortionObject.id;
    this.usdaIngredientId = usdaIngredientPortionObject.usda_ingredient_id;
    this.fdaPortionId = usdaIngredientPortionObject.fda_portion_id;
    this.nonMetricUnit = usdaIngredientPortionObject.non_metric_unit;
    this.gramsPerNonMetricUnit =
      usdaIngredientPortionObject.grams_per_non_metric_unit;
    this.portionDescription = usdaIngredientPortionObject.portion_description;
    this.isImperial = usdaIngredientPortionObject.is_imperial;
    this.usdaDataType = usdaIngredientPortionObject.usda_data_type;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  toJSON() {
    return {
      id: this.id,
      usda_ingredient_id: this.usdaIngredientId,
      fda_portion_id: this.fdaPortionId,
      non_metric_unit: this.nonMetricUnit,
      grams_per_non_metric_unit: this.gramsPerNonMetricUnit,
      portion_description: this.portionDescription,
      is_imperial: this.isImperial,
      usda_data_type: this.usdaDataType,
    };
  }
}
