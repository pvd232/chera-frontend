import checkProperties from '../../helpers/checkProperties';
export default class MealPlanDTO {
  constructor(mealPlanObject) {
    this.id = mealPlanObject.id;
    this.number = mealPlanObject.number;
    this.breakfastCalories = mealPlanObject.breakfast_calories;
    this.lunchCalories = mealPlanObject.lunch_calories;
    this.dinnerCalories = mealPlanObject.dinner_calories;
    this.statedCaloricLowerBound = mealPlanObject.stated_caloric_lower_bound;
    this.statedCaloricUpperBound = mealPlanObject.stated_caloric_upper_bound;
    this.numberOfSnacks = mealPlanObject.number_of_snacks;
    this.perSnackCaloricLowerBound =
      mealPlanObject.per_snack_caloric_lower_bound;
    this.perSnackCaloricUpperBound =
      mealPlanObject.per_snack_caloric_upper_bound;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  toJSON() {
    return {
      id: this.id,
      number: this.number,
      breakfast_calories: this.breakfastCalories,
      lunch_calories: this.lunchCalories,
      dinner_calories: this.dinnerCalories,
      stated_caloric_lower_bound: this.statedCaloricLowerBound,
      stated_caloric_upper_bound: this.statedCaloricUpperBound,
      number_of_snacks: this.numberOfSnacks,
      per_snack_caloric_lower_bound: this.perSnackCaloricLowerBound,
      per_snack_caloric_upper_bound: this.perSnackCaloricUpperBound,
    };
  }
}
