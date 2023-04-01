import LocalStorageManager from '../helpers/LocalStorageManager';
import RecipeIngredientNutrient from '../data_models/model/RecipeIngredientNutrient';
import RecipeIngredientItem from './RecipeIngredientItem';
import NutrientItem from './NutrientItem';
import checkProperties from '../helpers/checkProperties';
export default class MealPlanMealItem {
  constructor(mealPlanMealObject) {
    this.id = mealPlanMealObject.id;
    this.mealPlanId = mealPlanMealObject.mealPlanId;
    this.mealId = mealPlanMealObject.mealId;
    this.macroData = mealPlanMealObject.macroData;
    this.nutrients = mealPlanMealObject.nutrients.map(
      (nutrient) => new RecipeIngredientNutrient(nutrient)
    );
    this.recipe = mealPlanMealObject.recipe.map(
      (recipeIngredientObject) =>
        new RecipeIngredientItem(recipeIngredientObject)
    );
    this.meal = mealPlanMealObject.meal;
    this.name = mealPlanMealObject.name;
    this.mealTime = mealPlanMealObject.mealTime;
    this.imageUrl = mealPlanMealObject.imageUrl;
    this.dietaryRestrictions = mealPlanMealObject.dietaryRestrictions;
    this.description = mealPlanMealObject.description;
    this.mealPlan = mealPlanMealObject.mealPlan;
    this.kCal = mealPlanMealObject.kCal;
    this.proteinKcal = mealPlanMealObject.proteinKcal;
    this.carbKcal = mealPlanMealObject.carbKcal;
    this.fatKcal = mealPlanMealObject.fatKcal;
    this.active = mealPlanMealObject.active;
    this.mealPlanCalories = mealPlanMealObject.mealPlanCalories;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  toJSON() {
    const data = {
      meal: this.meal,
      name: this.name,
      meal_time: this.mealTime,
      image_url: this.imageUrl,
      dietary_restrictions: this.dietaryRestrictions,
      description: this.description,
      meal_plan: this.mealPlan,
      k_cal: this.kCal,
      protein_k_cal: this.proteinKcal,
      carb_k_cal: this.carbKcal,
      fat_k_cal: this.fatKcal,
      active: this.active,
      meal_plan_calories: this.mealPlanCalories,
    };

    return data;
  }
  updateKcal() {
    this.kCal = 0;
    for (const recipeIngredient of this.recipe) {
      this.kCal += recipeIngredient.kCal;
    }
  }
  updateNutrients() {
    const nutrientsArray = [];
    this.recipe.map((recipeIngredient) =>
      nutrientsArray.push(...recipeIngredient.nutrients)
    );
    const uniqueNutrientsArray = [];
    for (let i = 0; i < nutrientsArray.length; i++) {
      const recipeNutrient = nutrientsArray[i];
      const nutrientIndex = uniqueNutrientsArray.findIndex(
        (prevNutrient) => prevNutrient.id === recipeNutrient.nutrientId
      );
      if (nutrientIndex !== -1) {
        uniqueNutrientsArray[nutrientIndex].amount += recipeNutrient.amount;
      } else {
        const nutrient = LocalStorageManager.shared.nutrients.find(
          (nutrient) => nutrient.id === recipeNutrient.nutrientId
        );
        const uniqueNutrient = new NutrientItem(
          nutrient,
          recipeNutrient.amount,
          this.usdaNutrientDailyValues.find(
            (usdaNutrientDailyValue) =>
              usdaNutrientDailyValue.nutrientId === nutrient.id
          )
        );
        uniqueNutrientsArray.push(uniqueNutrient);
      }
    }
    this.nutrients = uniqueNutrientsArray;
  }

  updateMacroData() {
    this.carbKcal =
      this.nutrients.find((nutrient) => nutrient.id === 'carb').amount * 4;
    this.proteinKcal =
      this.nutrients.find((nutrient) => nutrient.id === 'protein').amount * 4;
    this.fatKcal =
      this.nutrients.find((nutrient) => nutrient.id === 'fat').amount * 9;
    this.macroData = {
      carb: this.carbKcal / this.kCal,
      protein: this.proteinKcal / this.kCal,
      fat: this.fatKcal / this.kCal,
    };
  }
  updateRecipeProportion = (ingredientRatios) => {
    this.recipe = ingredientRatios.map((ingredientRatio) => {
      const determinantIngredient = this.recipe.find(
        (recipeIngredient) =>
          recipeIngredient.usdaIngredientId === ingredientRatio.determinantId
      );
      const matchingIngredient = this.recipe.find(
        (recipeIngredient) =>
          recipeIngredient.usdaIngredientId === ingredientRatio.usdaIngredientId
      );
      const desiredRatio =
        determinantIngredient.amountOfGrams / matchingIngredient.amountOfGrams;
      const necessaryMultiplier = desiredRatio / ingredientRatio.ratio;
      matchingIngredient.update(necessaryMultiplier);
      return matchingIngredient;
    });
  };
}
