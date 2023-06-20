import lazyCache from './lazyCache';
import getBaseURL from './getBaseURL';
const getMealPlanMealsURL = () => {
  return getBaseURL('api') + '/extended_meal_plan_meal';
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
    console.log('this._mealPlanMeals', this._mealPlanMeals);
    return this._mealPlanMeals;
  }
  set mealPlanMeals(value) {
    this._mealPlanMeals = value;
  }
}
