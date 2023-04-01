import checkProperties from '../../helpers/checkProperties';
export default class USDAIngredientPortion {
  constructor(portion) {
    this.id = portion.id;
    this.usdaIngredientId = portion.usdaIngredientId;
    this.nonMetricUnit = portion.nonMetricUnit;
    this.unit = portion.unit;
    this.gramsPerNonMetricUnit = portion.gramsPerNonMetricUnit;
    this.portionDescription = portion.portionDescription;
    this.isImperial = portion.isImperial;
    this.usdaDataType = portion.usdaDataType;
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
