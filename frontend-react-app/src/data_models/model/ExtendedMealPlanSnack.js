export default class ExtendedMealPlanSnack {
  constructor(
    extendedMealPlanSnackDTO,
    snackFactory,
    extendedMealPlanFactory,
    extendedRecipeIngredientFactory,
    recipeIngredientNutrientFactory
  ) {
    this.id = extendedMealPlanSnackDTO.id;
    this.snackId = extendedMealPlanSnackDTO.snackId;
    this.mealPlanId = extendedMealPlanSnackDTO.mealPlanId;
    this.carbKcal = extendedMealPlanSnackDTO.carbKcal;
    this.proteinKcal = extendedMealPlanSnackDTO.proteinKcal;
    this.fatKcal = extendedMealPlanSnackDTO.fatKcal;
    this.kCal = extendedMealPlanSnackDTO.kCal;
    this.active = extendedMealPlanSnackDTO.active;

    // Relationships
    this.associatedSnack = snackFactory.injectInstance(
      extendedMealPlanSnackDTO.associatedSnack
    );
    this.mealPlan = extendedMealPlanFactory.injectInstance(
      extendedMealPlanSnackDTO.mealPlan
    );
    this.recipe = extendedMealPlanSnackDTO.recipe.map((recipeIngredient) =>
      extendedRecipeIngredientFactory.injectInstance(recipeIngredient)
    );
    this.nutrients = extendedMealPlanSnackDTO.nutrients.map((nutrient) =>
      recipeIngredientNutrientFactory.injectInstance(nutrient)
    );
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
      return this.mealPlan.breakfastCalories;
    } else if (this.mealTime === 'lunch') {
      return this.mealPlan.lunchCalories;
    } else {
      return this.mealPlan.dinnerCalories;
    }
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
  getNutrient(nutrientId) {
    return this.nutrients.get(nutrientId);
  }
}
