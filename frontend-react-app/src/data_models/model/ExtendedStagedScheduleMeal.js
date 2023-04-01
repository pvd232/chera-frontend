import StagedScheduleMeal from './StagedScheduleMeal';

export default class ExtendedStagedScheduleMeal extends StagedScheduleMeal {
  constructor(extendedStagedScheduleMealDTO, extendedMealFactory) {
    super(extendedStagedScheduleMealDTO);
    this.associatedMeal = extendedMealFactory.injectInstance(
      extendedStagedScheduleMealDTO.associatedMeal
    );
  }
}
