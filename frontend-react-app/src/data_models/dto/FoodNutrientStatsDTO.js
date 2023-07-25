import lazy from '../../helpers/lazy';
export default class FoodNutrientStatsDTO {
  constructor(
    foodNutrientJSON,
    nutrientDailyValueDTOFactory
  ) {
    this.mealPlanId = foodNutrientJSON.meal_plan_id;
    this.carbKcal = foodNutrientJSON.carb_k_cal;
    this.proteinKcal = foodNutrientJSON.protein_k_cal;
    this.fatKcal = foodNutrientJSON.fat_k_cal;
    this.kCal = foodNutrientJSON.k_cal;
    this.recipeData = foodNutrientJSON.recipe;
    this.nutrientsData = foodNutrientJSON.nutrients;
    this.nutrientDailyValueDTOFactory = nutrientDailyValueDTOFactory;
    this._recipe = lazy(() => this.getRecipe());
    this._nutrients = lazy(() => this.getNutrients());
  }
  get recipe() {
    const recipeUnsorted = this._recipe();
    const recipeSortedByName = recipeUnsorted.sort((a, b) => {
      if (a.usdaIngredientName < b.usdaIngredientName) return -1;
      if (a.usdaIngredientName > b.usdaIngredientName) return 1;
      return 0;
    });
    return recipeSortedByName;
  }
  get nutrients() {
    return this._nutrients();
  }

  get mealPlanCalories() {
    if (this.mealTime === 'breakfast') {
      return this.associatedMealPlan.breakfastCalories;
    } else if (this.mealTime === 'lunch') {
      return this.associatedMealPlan.lunchCalories;
    } else {
      return this.associatedMealPlan.dinnerCalories;
    }
  }

  getRecipe() {
    return this.recipeData.map((recipeIngredient) => {
      return {
        usdaIngredientName: recipeIngredient,
      };
    });
  }

  getNutrient(nutrientId) {
    return this.nutrients.get(nutrientId);
  }

  getNutrients() {
    const nutrientsMap = new Map();
    this.nutrientsData.forEach((nutrient) => {
      const nutrientDTO =
        this.nutrientDailyValueDTOFactory.injectInstance(nutrient);
      nutrientsMap.set(nutrient.nutrient_id, nutrientDTO);
    });
    return nutrientsMap;
  }
  get macroData() {
    return {
      carb: this.carbKcal / this.kCal,
      protein: this.proteinKcal / this.kCal,
      fat: this.fatKcal / this.kCal,
    };
  }
  get chartMacroData() {
    return [
      { id: 'carb', proportion: this.carbKcal / this.kCal },
      { id: 'protein', proportion: this.proteinKcal / this.kCal },
      { id: 'fat', proportion: this.fatKcal / this.kCal },
    ];
  }

  toJSON() {
    return {
      carb_k_cal: this.carbKcal,
      protein_k_cal: this.proteinKcal,
      fat_k_cal: this.fatKcal,
      k_cal: this.kCal,
      active: this.active,
      associated_meal_plan: this.associatedMealPlan.toJSON(),
      recipe: this.recipe.map((recipeIngredient) => recipeIngredient),
      nutrients: Array.from(this.nutrients.values()).map((nutrient) =>
        nutrient.toJSON()
      ),
    };
  }
}
