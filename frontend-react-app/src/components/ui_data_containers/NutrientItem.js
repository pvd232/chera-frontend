import checkProperties from '../../helpers/checkProperties';
export default class NutrientItem {
  constructor(extendedRecipeIngredientNutrientDTO) {
    console.log(
      'extendedRecipeIngredientNutrientDTO',
      extendedRecipeIngredientNutrientDTO
    );
    this.id = extendedRecipeIngredientNutrientDTO.id;
    this.name = extendedRecipeIngredientNutrientDTO.name;
    this.unit = extendedRecipeIngredientNutrientDTO.unit;
    this.amount = extendedRecipeIngredientNutrientDTO.amount;
    this.usdaNutrientDailyValueAmount =
      extendedRecipeIngredientNutrientDTO.usdaNutrientDailyValueAmount;
    this.properlyInitialized = (() => checkProperties(this))();
  }

  get dailyValue() {
    return this.amount / this.usdaNutrientDailyValueAmount;
  }
}
