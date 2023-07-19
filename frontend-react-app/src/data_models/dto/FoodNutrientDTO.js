import lazy from '../../helpers/lazy';
import ExtendedMealPlanMealDTO from './ExtendedMealPlanMealDTO';
export default class FoodNutrientData extends ExtendedMealPlanMealDTO {
  constructor(
    extendedMealPlanMealJSON,
    extendedMealDTOFactory,
    extendedMealPlanDTOFactory
  ) {
    super(
      extendedMealPlanMealJSON,
      extendedMealDTOFactory,
      extendedMealPlanDTOFactory,
      {},
      {}
    );
    this._recipe = lazy(() => this.getRecipe());
    this._nutrients = lazy(() => this.getNutrients());
  }
  getRecipe() {
    return this.recipeData.map((recipeIngredient) => {
      return {
        usdaIngredientName: recipeIngredient.usda_ingredient_name,
      };
    });
  }
  getNutrients() {
    return this.nutrientsData.map((nutrient) => {
      return {
        nutrientId: nutrient.nutrient_id,
        dailyValue: nutrient.daily_value,
        nutrientUnit: nutrient.nutrient_unit,
      };
    });
  }
}
