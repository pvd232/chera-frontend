import checkProperties from '../../helpers/checkProperties';
export default class NutrientItem {
  constructor(extendedRecipeIngredientNutrientDTO) {
    this.id = extendedRecipeIngredientNutrientDTO.id;
    this.name = extendedRecipeIngredientNutrientDTO.name;
    this.nutrientId = extendedRecipeIngredientNutrientDTO.nutrientId;
    this.unit = extendedRecipeIngredientNutrientDTO.unit;
    this.amount = extendedRecipeIngredientNutrientDTO.amount;
    this.usdaNutrientDailyValueAmount =
      extendedRecipeIngredientNutrientDTO.usdaNutrientDailyValueAmount;
    this.properlyInitialized = (() => checkProperties(this))();
  }

  get dailyValue() {
    const valueToReturn = this.amount / this.usdaNutrientDailyValueAmount;
    if (Math.round(valueToReturn * 100) === 0) {
      // return 0.001 so that the bar chart will show a bar for this nutrient
      return 0.001;
    }
    return valueToReturn;
  }
}
