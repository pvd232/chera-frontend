import checkProperties from '../../helpers/checkProperties';
export default class MealDietaryRestrictionDTO {
  constructor(dietaryRestrictionObject) {
    this.id = dietaryRestrictionObject.id;
    this.dietaryRestrictionId = dietaryRestrictionObject.dietary_restriction_id;
    this.mealId = dietaryRestrictionObject.meal_id;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  static injectInstance(mealDietaryRestrictionDTO) {
    return new MealDietaryRestrictionDTO(mealDietaryRestrictionDTO);
  }
  toJSON() {
    return {
      id: this.id,
      dietary_restriction_id: this.dietaryRestrictionId,
      meal_id: this.mealId,
    };
  }
}
