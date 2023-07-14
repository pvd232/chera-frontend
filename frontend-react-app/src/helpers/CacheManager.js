import lazyCache from './lazyCache';
import getBaseURL from './getBaseURL';
const getMealPlanMealsURL = () => {
  return getBaseURL('api') + `/extended_meal_plan_meal`;
};
const getMealPlanSnacksURL = () => {
  return getBaseURL('api') + `/extended_meal_plan_snack`;
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
}
