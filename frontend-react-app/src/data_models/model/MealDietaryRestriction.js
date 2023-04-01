import checkProperties from '../../helpers/checkProperties';
export default class MealDietaryRestriction {
  constructor(dietaryRestrictionObject) {
    this.id = dietaryRestrictionObject.id;
    this.mealId = dietaryRestrictionObject.mealId;
    this.dietaryRestrictionId = dietaryRestrictionObject.dietaryRestrictionId;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  static injectInstance(mealDietaryRestrictionObject) {
    return new MealDietaryRestriction(mealDietaryRestrictionObject);
  }
}
