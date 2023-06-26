import lazy from '../../helpers/lazy';
import MealPlanMealDTO from './MealPlanMealDTO';
export default class ExtendedMealPlanMealDTO extends MealPlanMealDTO {
  constructor(
    extendedMealPlanMealJSON,
    extendedMealDTOFactory,
    extendedMealPlanDTOFactory,
    extendedRecipeIngredientDTOFactory,
    extendedRecipeIngredientNutrientDTOFactory
  ) {
    super(extendedMealPlanMealJSON);
    this.carbKcal = extendedMealPlanMealJSON.carb_k_cal;
    this.proteinKcal = extendedMealPlanMealJSON.protein_k_cal;
    this.fatKcal = extendedMealPlanMealJSON.fat_k_cal;
    this.kCal = extendedMealPlanMealJSON.k_cal;

    // Factories
    this.extendedRecipeIngredientDTOFactory =
      extendedRecipeIngredientDTOFactory;
    this.extendedRecipeIngredientNutrientDTOFactory =
      extendedRecipeIngredientNutrientDTOFactory;

    // Relationships
    this.associatedMeal = extendedMealDTOFactory.injectInstance(
      extendedMealPlanMealJSON.associated_meal
    );
    this.associatedMealPlan = extendedMealPlanDTOFactory.injectInstance(
      extendedMealPlanMealJSON.associated_meal_plan
    );
    this.recipeData = extendedMealPlanMealJSON.recipe;
    this.nutrientsData = extendedMealPlanMealJSON.nutrients;

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
  get name() {
    return this.associatedMeal.name;
  }
  get mealTime() {
    return this.associatedMeal.mealTime;
  }
  get imageUrl() {
    return this.associatedMeal.imageUrl;
  }
  get dietaryRestrictions() {
    return this.associatedMeal.dietaryRestrictions;
  }
  get description() {
    return this.associatedMeal.description;
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

  getNutrient(nutrientId) {
    return this.nutrients.get(nutrientId);
  }
  getRecipe() {
    return this.recipeData.map((recipeIngredient) =>
      this.extendedRecipeIngredientDTOFactory.injectInstance(recipeIngredient)
    );
  }
  getNutrients() {
    const nutrientsMap = new Map();
    this.nutrientsData.forEach((nutrient) => {
      const nutrientDTO =
        this.extendedRecipeIngredientNutrientDTOFactory.injectInstance(
          nutrient
        );
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
  get weight() {
    let weightInGrams = 0;
    this.recipe.forEach(
      (recipeIngredient) => (weightInGrams += recipeIngredient.amountOfGrams)
    );
    return weightInGrams;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      carb_k_cal: this.carbKcal,
      protein_k_cal: this.proteinKcal,
      fat_k_cal: this.fatKcal,
      k_cal: this.kCal,
      active: this.active,
      associated_meal: this.associatedMeal.toJSON(),
      associated_meal_plan: this.associatedMealPlan.toJSON(),
      recipe: this.recipe.map((recipeIngredient) => recipeIngredient.toJSON()),
      nutrients: Array.from(this.nutrients.values()).map((nutrient) =>
        nutrient.toJSON()
      ),
    };
  }
}
