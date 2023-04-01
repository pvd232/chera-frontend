import StagedClientDTO from './StagedClientDTO';

export default class ExtendedStagedClientDTO extends StagedClientDTO {
  constructor(extendedStagedClientDTO, mealPlanDTOFactory) {
    super(extendedStagedClientDTO);
    this.mealPlan = mealPlanDTOFactory.injectInstance(
      extendedStagedClientDTO.meal_plan
    );
  }
}
