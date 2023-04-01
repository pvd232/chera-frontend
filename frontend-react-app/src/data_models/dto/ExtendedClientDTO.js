import ClientDTO from './ClientDTO';

export default class ExtendedClientDTO extends ClientDTO {
  constructor(extendedClientDTO, mealPlanDTOFactory) {
    super(extendedClientDTO);
    this.mealPlan = mealPlanDTOFactory.injectInstance(
      extendedClientDTO.meal_plan
    );
  }
}
