import capitalize from '../../helpers/capitalize';
import RecipeIngredientDTO from './RecipeIngredientDTO';
class ExtendedRecipeIngredientDTO extends RecipeIngredientDTO {
  constructor(extendedRecipeIngredientDTO) {
    super(extendedRecipeIngredientDTO);
    this.usdaIngredientName = extendedRecipeIngredientDTO.usda_ingredient_name;
    this.usdaIngredientFdcId =
      extendedRecipeIngredientDTO.usda_ingredient_fdc_id;
    this.fdaPortionId = extendedRecipeIngredientDTO.fda_portion_id;
    this.amountOfGrams = extendedRecipeIngredientDTO.amount_of_grams;
    this.kCal = extendedRecipeIngredientDTO.k_cal;
    this.nonMetricUnit = extendedRecipeIngredientDTO.non_metric_unit;
    this.isImperial = extendedRecipeIngredientDTO.is_imperial;
  }
  get name() {
    return capitalize(this.usdaIngredientName);
  }
  get url() {
    return `https://fdc.nal.usda.gov/fdc-app.html#/food-details/${this.usdaIngredientFdcId}/nutrients`;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      id: this.id,
      usda_ingredient_id: this.usdaIngredientId,
      meal_plan_meal_id: this.mealPlanMealId,
      usda_ingredient_portion_id: this.usdaIngredientPortionId,
      quantity: this.quantity,
      active: this.active,
      usda_ingredient_name: this.usdaIngredientName,
      usda_ingredient_fdc_id: this.usdaIngredientFdcId,
      amount_of_grams: this.amountOfGrams,
      k_cal: this.kCal,
      non_metric_unit: this.nonMetricUnit,
      is_imperial: this.isImperial,
    };
  }
}
export default ExtendedRecipeIngredientDTO;
