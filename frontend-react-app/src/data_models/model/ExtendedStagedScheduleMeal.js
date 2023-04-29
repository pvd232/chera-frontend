import StagedScheduleMeal from './StagedScheduleMeal';

export default class ExtendedStagedScheduleMeal extends StagedScheduleMeal {
  constructor(extendedStagedScheduleMealDTO) {
    super(extendedStagedScheduleMealDTO);
    this.associatedMeal = null;
  }
  static constructFromStagedScheduleMeal(
    stagedScheduleMeal,
    extendedMeal,
    extendedMealFactory
  ) {
    const newExtendedStagedScheduleMeal = new ExtendedStagedScheduleMeal(
      stagedScheduleMeal
    );
    newExtendedStagedScheduleMeal.associatedMeal =
      extendedMealFactory.injectInstance(extendedMeal);
    return newExtendedStagedScheduleMeal;
  }
}
