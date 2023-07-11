import lazy from '../../helpers/lazy';
import MealPlanSnackDTO from './MealPlanSnackDTO';
export default class ExtendedMealPlanSnackDTO extends MealPlanSnackDTO {
  constructor(
    extendedMealPlanSnackJSON,
    snackDTOFactory,
    extendedMealPlanDTOFactory,
    extendedRecipeIngredientDTOFactory,
    extendedRecipeIngredientNutrientDTOFactory
  ) {
    super(extendedMealPlanSnackJSON);
    this.carbKcal = extendedMealPlanSnackJSON.carb_k_cal;
    this.proteinKcal = extendedMealPlanSnackJSON.protein_k_cal;
    this.fatKcal = extendedMealPlanSnackJSON.fat_k_cal;
    this.kCal = extendedMealPlanSnackJSON.k_cal;

    // Factories
    this.extendedRecipeIngredientDTOFactory =
      extendedRecipeIngredientDTOFactory;
    this.extendedRecipeIngredientNutrientDTOFactory =
      extendedRecipeIngredientNutrientDTOFactory;

    // Relationships
    this.associatedSnack = snackDTOFactory.injectInstance(
      extendedMealPlanSnackJSON.associated_snack
    );
    this.associatedMealPlan = extendedMealPlanDTOFactory.injectInstance(
      extendedMealPlanSnackJSON.associated_meal_plan
    );
    this.recipeData = extendedMealPlanSnackJSON.recipe;
    this.nutrientsData = extendedMealPlanSnackJSON.nutrients;

    this._recipe = lazy(() => this.getRecipe());
    this._nutrients = lazy(() => this.getNutrients());
  }
  get recipe() {
    return this._recipe();
  }
  get nutrients() {
    return this._nutrients();
  }
  get name() {
    return this.associatedSnack.name;
  }
  get imageUrl() {
    return this.associatedSnack.imageUrl;
  }
  get description() {
    return this.associatedSnack.description;
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
  get mealPlanSnackCalories() {
    const lowerBound = this.associatedMealPlan.perSnackCaloricLowerBound;
    const upperBound = this.associatedMealPlan.perSnackCaloricUpperBound;
    const average = (lowerBound + upperBound) / 2;
    return average;
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
      id: this.id,
      snack_id: this.snackId,
      meal_plan_id: this.mealPlanId,
      carb_k_cal: this.carbKcal,
      protein_k_cal: this.proteinKcal,
      fat_k_cal: this.fatKcal,
      k_cal: this.kCal,
      active: this.active,
      associated_snack: this.associatedSnack.toJSON(),
      associated_meal_plan: this.associatedMealPlan.toJSON(),
      recipe: this.recipe.map((recipeIngredient) => recipeIngredient.toJSON()),
      nutrients: Array.from(this.nutrients.values()).map((nutrient) =>
        nutrient.toJSON()
      ),
    };
  }
}
