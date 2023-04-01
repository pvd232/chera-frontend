import MealPlan from '../../model/MealPlan';
export default class MealPlanFactory {
  injectInstance(mealPlanJSON) {
    return new MealPlan(mealPlanJSON);
  }
}
