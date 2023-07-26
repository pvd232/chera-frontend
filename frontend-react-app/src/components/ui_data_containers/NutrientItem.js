import checkProperties from '../../helpers/checkProperties';
export default class NutrientItem {
  constructor(extendedRecipeIngredientNutrientDTO) {
    this.id = extendedRecipeIngredientNutrientDTO.id;
    this.name = extendedRecipeIngredientNutrientDTO.name;
    this.nutrientId = extendedRecipeIngredientNutrientDTO.nutrientId;
    this.unit = extendedRecipeIngredientNutrientDTO.unit;
    this.amount = extendedRecipeIngredientNutrientDTO.amount;
    this.dailyValueAmount =
      extendedRecipeIngredientNutrientDTO.dailyValueAmount;
    this.properlyInitialized = (() => checkProperties(this))();
  }

  get dailyValue() {
    const valueToReturn = this.dailyValueAmount;
    if (Math.round(valueToReturn * 100) === 0) {
      // return 0.001 so that the bar chart will show a bar for this nutrient
      return 0.001;
    }
    return valueToReturn;
  }
  get capitalizedNutrientName() {
    // Format nutrient name to be capitalized, including vitamins with 2 words like vitamin A
    if (this.name.toLowerCase().includes('vitamin')) {
      return this.name
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    } else {
      return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }
  }
}
