import lazyCache from './lazyCache';
import getBaseURL from './getBaseURL';
const getMealPlanMealsURL = () => {
  return getBaseURL('api') + `/extended_meal_plan_meal`;
};
const getMealPlanSnacksURL = () => {
  return getBaseURL('api') + `/extended_meal_plan_snack`;
};
const getMealNutrientStatsURL = () => {
  return getBaseURL('api') + `/meal_nutrient_stats`;
};
const getSnackNutrientStatsURL = () => {
  return getBaseURL('api') + `/snack_nutrient_stats`;
};
export default class CacheManager {
  static shared = (() => {
    if (CacheManager._instance) {
      return CacheManager.instance;
    } else {
      return new CacheManager();
    }
  })();
  constructor() {
    lazyCache(CacheManager.prototype, '_mealPlanMeals', getMealPlanMealsURL());
    lazyCache(
      CacheManager.prototype,
      '_mealPlanSnacks',
      getMealPlanSnacksURL()
    );
    lazyCache(
      CacheManager.prototype,
      '_mealNutrientStats',
      getMealNutrientStatsURL()
    );
    lazyCache(
      CacheManager.prototype,
      '_snackNutrientStats',
      getSnackNutrientStatsURL()
    );
  }
  get mealPlanMeals() {
    return this._mealPlanMeals;
  }
  set mealPlanMeals(value) {
    this._mealPlanMeals = value;
  }
  get mealPlanSnacks() {
    return this._mealPlanSnacks;
  }
  set mealPlanSnacks(value) {
    this._mealPlanSnacks = value;
  }
  get mealNutrientStats() {
    return this._mealNutrientStats;
  }
  set mealNutrientStats(value) {
    this._mealNutrientStats = value;
  }
  get snackNutrientStats() {
    return this._snackNutrientStats;
  }
  set snackNutrientStats(value) {
    this._snackNutrientStats = value;
  }
}
