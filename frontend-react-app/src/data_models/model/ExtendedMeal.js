import Meal from './Meal';

export default class ExtendedMeal extends Meal {
  constructor(extendedMeal, mealDietaryRestrictionFactory) {
    super(extendedMeal);
    this.dietaryRestrictions = extendedMeal.dietaryRestrictions.map(
      (dietaryRestriction) =>
        mealDietaryRestrictionFactory.injectInstance(dietaryRestriction)
    );
  }
}
