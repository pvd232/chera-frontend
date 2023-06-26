export default class ExtendedMealPlanMeal {
  constructor(
    extendedMealPlanMealDTO,
    extendedMealFactory,
    extendedMealPlanFactory,
    extendedRecipeIngredientFactory,
    recipeIngredientNutrientFactory
  ) {
    this.id = extendedMealPlanMealDTO.id;
    this.mealId = extendedMealPlanMealDTO.mealId;
    this.mealPlanId = extendedMealPlanMealDTO.mealPlanId;
    this.carbKcal = extendedMealPlanMealDTO.carbKcal;
    this.proteinKcal = extendedMealPlanMealDTO.proteinKcal;
    this.fatKcal = extendedMealPlanMealDTO.fatKcal;
    this.kCal = extendedMealPlanMealDTO.kCal;
    this.active = extendedMealPlanMealDTO.active;

    // Relationships
    this.associatedMeal = extendedMealFactory.injectInstance(
      extendedMealPlanMealDTO.associatedMeal
    );
    this.mealPlan = extendedMealPlanFactory.injectInstance(
      extendedMealPlanMealDTO.mealPlan
    );
    this.recipe = extendedMealPlanMealDTO.recipe.map((recipeIngredient) =>
      extendedRecipeIngredientFactory.injectInstance(recipeIngredient)
    );
    this.nutrients = extendedMealPlanMealDTO.nutrients.map((nutrient) =>
      recipeIngredientNutrientFactory.injectInstance(nutrient)
    );
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
  toJSON() {
    return {
      ...super.toJSON(),
      id: this.id,
      mealId: this.mealId,
      mealPlanId: this.mealPlanId,
      carbKcal: this.carbKcal,
      proteinKcal: this.proteinKcal,
      fatKcal: this.fatKcal,
      kCal: this.kCal,
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
