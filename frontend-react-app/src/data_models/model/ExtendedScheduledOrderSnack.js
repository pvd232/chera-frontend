import ScheduledOrderSnack from './ScheduledOrderSnack';

export default class ExtendedScheduledOrderSnack extends ScheduledOrderSnack {
  constructor(extendedScheduledOrderSnack) {
    super(extendedScheduledOrderSnack);
    this.associatedSnack = null;
  }

  static constructFromExtendedScheduledOrderSnackDTO(
    extendedScheduledOrderSnackDTO,
    snackFactory
  ) {
    const extendedScheduledOrderSnack = new ExtendedScheduledOrderSnack(
      extendedScheduledOrderSnackDTO
    );
    extendedScheduledOrderSnack.associatedSnack =
      snackFactory.injectInstance(
        extendedScheduledOrderSnackDTO.associatedSnack
      );
    return extendedScheduledOrderSnack;
  }

  static constructNewInstanceFromExtendedScheduledOrderSnackDTO(
    scheduledOrderSnackId,
    extendedScheduledOrderSnackDTO,
    snackFactory
  ) {
    const newExtendedScheduledOrderSnack = new ExtendedScheduledOrderSnack(
      extendedScheduledOrderSnackDTO
    );
    newExtendedScheduledOrderSnack.id = scheduledOrderSnackId;

    newExtendedScheduledOrderSnack.associatedSnack =
      snackFactory.injectInstance(
        extendedScheduledOrderSnackDTO.associatedSnack
      );
    return newExtendedScheduledOrderSnack;
  }

  static constructNewInstanceFromScheduledOrderSnack(
    scheduledOrderSnackId,
    scheduledOrderSnack,
    snackFactory,
    snack
  ) {
    const extendedScheduledOrderSnack = new ExtendedScheduledOrderSnack(
      scheduledOrderSnack
    );
    extendedScheduledOrderSnack.id = scheduledOrderSnackId;
    extendedScheduledOrderSnack.associatedSnack =
      snackFactory.injectInstance(snack);
    return extendedScheduledOrderSnack;
  }

  get name() {
    return this.associatedSnack.name;
  }
  get mealTime() {
    return this.associatedSnack.mealTime;
  }
  get dietaryRestrictions() {
    return this.associatedSnack.dietaryRestrictions;
  }
}
