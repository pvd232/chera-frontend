import ExtendedMeal from '../../model/ExtendedMeal';

export default class ExtendedMealFactory {
  constructor(mealDietaryRestrictionFactory) {
    this.mealDietaryRestrictionFactory = mealDietaryRestrictionFactory;
  }
  injectInstance(mealJSON) {
    return new ExtendedMeal(mealJSON, this.mealDietaryRestrictionFactory);
  }
}
