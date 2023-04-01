import checkProperties from '../../helpers/checkProperties';
export default class USDAIngredient {
  constructor(usdaIngredientObject) {
    this.id = usdaIngredientObject.id;
    this.name = usdaIngredientObject.name;
    this.fdcId = usdaIngredientObject.fdcId;
    this.amountOfGrams = usdaIngredientObject.amountOfGrams;
    this.kCalToGramRatio = usdaIngredientObject.kCalToGramRatio;
    this.kCal = usdaIngredientObject.kCal;
    this.usdaDataType = usdaIngredientObject.usdaDataType;
    this.fdaIdentifier = usdaIngredientObject.fdaIdentifier;
    this.active = usdaIngredientObject.active;
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
