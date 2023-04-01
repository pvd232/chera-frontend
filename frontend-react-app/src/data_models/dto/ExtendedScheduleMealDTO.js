import ScheduleMealDTO from './ScheduleMealDTO';

export default class ExtendedScheduleMealDTO extends ScheduleMealDTO {
  constructor(extendedScheduleMealDTO, extendedMealDTOFactory) {
    super(extendedScheduleMealDTO);
    this.associatedMeal = extendedMealDTOFactory.injectInstance(
      extendedScheduleMealDTO.associated_meal
    );
  }
  get name() {
    return this.associatedMeal.name;
  }
  get mealTime() {
    return this.associatedMeal.mealTime;
  }
  get dietaryRestrictions() {
    return this.associatedMeal.dietaryRestrictions;
  }
}
