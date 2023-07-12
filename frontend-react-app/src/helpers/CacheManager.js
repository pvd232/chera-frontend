import lazyCache from './lazyCache';
import getBaseURL from './getBaseURL';
const getMealPlanMealsURL = (mealPlanId) => {
  return (
    getBaseURL('api') + `/extended_meal_plan_meal?meal_plan_id=${mealPlanId}`
  );
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
  }
  get mealPlanMeals() {
    return this._mealPlanMeals;
  }
  set mealPlanMeals(value) {
    this._mealPlanMeals = value;
  }
}
