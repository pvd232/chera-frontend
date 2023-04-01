import checkProperties from '../../helpers/checkProperties';
export default class MealPlan {
  constructor(mealPlanObject) {
    this.id = mealPlanObject.id;
    this.number = mealPlanObject.number;
    this.breakfastCalories = mealPlanObject.breakfastCalories;
    this.lunchCalories = mealPlanObject.lunchCalories;
    this.dinnerCalories = mealPlanObject.dinnerCalories;
    this.statedCaloricLowerBound = mealPlanObject.statedCaloricLowerBound;
    this.statedCaloricUpperBound = mealPlanObject.statedCaloricUpperBound;
    this.numberOfSnacks = mealPlanObject.numberOfSnacks;
    this.perSnackCaloricLowerBound = mealPlanObject.perSnackCaloricLowerBound;
    this.perSnackCaloricUpperBound = mealPlanObject.perSnackCaloricUpperBound;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  get hasSnackNumberRange() {
    const divisibility = this.numberOfSnacks % 1;
    if (divisibility === 0) {
      return false;
    } else {
      return true;
    }
  }

  get formattedNumberOfSnacks() {
    if (!this.hasSnackNumberRange) {
      return `${this.numberOfSnacks}`;
    } else {
      const lowerBound = this.numberOfSnacks - 0.5;
      const upperBound = this.numberOfSnacks + 0.5;
      return `${lowerBound}-${upperBound}`;
    }
  }
  get name() {
    return `Meal Plan ${this.number}`;
  }
}
