import StagedScheduleMealDTO from './StagedScheduleMealDTO';

export default class ExtendedStagedScheduleMealDTO extends StagedScheduleMealDTO {
  constructor(extendedStagedScheduleMealDTO, extendedMealDTOFactory) {
    super(extendedStagedScheduleMealDTO);
    this.associatedMeal = extendedMealDTOFactory.injectInstance(
      extendedStagedScheduleMealDTO.associated_meal
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
