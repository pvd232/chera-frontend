import ScheduledOrderMealDTO from './ScheduledOrderMealDTO';

export default class ExtendedScheduledOrderMealDTO extends ScheduledOrderMealDTO {
  constructor(extendedScheduledOrderMealDTO, extendedMealDTOFactory) {
    super(extendedScheduledOrderMealDTO);
    this.associatedMeal = extendedMealDTOFactory.injectInstance(
      extendedScheduledOrderMealDTO.associated_meal
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
