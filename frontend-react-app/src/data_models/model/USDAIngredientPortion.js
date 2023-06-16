import checkProperties from '../../helpers/checkProperties';
export default class USDAIngredientPortion {
  constructor(portion) {
    console.log('portion', portion);
    this.id = portion.id;
    this.usdaIngredientId = portion.usdaIngredientId;
    this.fdaPortionId = portion.fdaPortionId;
    this.nonMetricUnit = portion.nonMetricUnit;
    this.gramsPerNonMetricUnit = portion.gramsPerNonMetricUnit;
    this.portionDescription = portion.portionDescription;
    this.isImperial = portion.isImperial;
    this.usdaDataType = portion.usdaDataType;
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
