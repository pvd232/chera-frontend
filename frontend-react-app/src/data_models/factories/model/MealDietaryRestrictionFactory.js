import MealDietaryRestriction from '../../model/MealDietaryRestriction';
export default class MealDietaryRestrictionFactory {
  injectInstance(mealDietaryRestrictionJSON) {
    return new MealDietaryRestriction(mealDietaryRestrictionJSON);
  }
}
