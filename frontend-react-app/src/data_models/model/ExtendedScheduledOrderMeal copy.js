import ScheduledOrderMeal from './ScheduledOrderMeal';

export default class ExtendedScheduledOrderMeal extends ScheduledOrderMeal {
  constructor(extendedScheduledOrderMeal) {
    super(extendedScheduledOrderMeal);
    this.associatedMeal = null;
  }

  static constructFromExtendedScheduledOrderMealDTO(
    extendedScheduledOrderMealDTO,
    extendedMealFactory
  ) {
    const extendedScheduledOrderMeal = new ExtendedScheduledOrderMeal(
      extendedScheduledOrderMealDTO
    );
    extendedScheduledOrderMeal.associatedMeal =
      extendedMealFactory.injectInstance(
        extendedScheduledOrderMealDTO.associatedMeal
      );
    return extendedScheduledOrderMeal;
  }

  static constructNewInstanceFromExtendedScheduledOrderMealDTO(
    scheduledOrderMealId,
    extendedScheduledOrderMealDTO,
    extendedMealFactory
  ) {
    const newExtendedScheduledOrderMeal = new ExtendedScheduledOrderMeal(
      extendedScheduledOrderMealDTO
    );
    newExtendedScheduledOrderMeal.id = scheduledOrderMealId;

    newExtendedScheduledOrderMeal.associatedMeal =
      extendedMealFactory.injectInstance(
        extendedScheduledOrderMealDTO.associatedMeal
      );
    return newExtendedScheduledOrderMeal;
  }

  static constructNewInstanceFromScheduledOrderMeal(
    scheduledOrderMealId,
    scheduledOrderMeal,
    extendedMealFactory,
    extendedMeal
  ) {
    const extendedScheduledOrderMeal = new ExtendedScheduledOrderMeal(
      scheduledOrderMeal
    );
    extendedScheduledOrderMeal.id = scheduledOrderMealId;
    extendedScheduledOrderMeal.associatedMeal =
      extendedMealFactory.injectInstance(extendedMeal);
    return extendedScheduledOrderMeal;
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
