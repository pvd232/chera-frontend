import ScheduleMeal from './ScheduleMeal';

export default class ExtendedScheduleMeal extends ScheduleMeal {
  constructor(extendedScheduleMeal) {
    super(extendedScheduleMeal);
    this.associatedMeal = null;
  }
  static constructFromScheduleMeal(
    scheduleMeal,
    extendedMeal,
    extendedMealFactory
  ) {
    const newExtendedScheduleMeal = new ExtendedScheduleMeal(scheduleMeal);
    newExtendedScheduleMeal.associatedMeal =
      extendedMealFactory.injectInstance(extendedMeal);
    return newExtendedScheduleMeal;
  }
  static constructFromExtendedScheduleMealDTO(
    extendedScheduleMealDTO,
    extendedMealFactory
  ) {
    const newExtendedScheduleMeal = new ExtendedScheduleMeal(
      extendedScheduleMealDTO
    );
    newExtendedScheduleMeal.associatedMeal = extendedMealFactory.injectInstance(
      extendedScheduleMealDTO.associatedMeal
    );
    return newExtendedScheduleMeal;
  }
}
