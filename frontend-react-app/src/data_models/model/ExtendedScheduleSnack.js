import ScheduleSnack from './ScheduleSnack';

export default class ExtendedScheduleSnack extends ScheduleSnack {
  constructor(extendedScheduleSnack) {
    super(extendedScheduleSnack);
    this.associatedSnack = null;
  }
  static constructFromScheduleSnack(scheduleSnack, snack, snackFactory) {
    const newExtendedScheduleSnack = new ExtendedScheduleSnack(scheduleSnack);
    newExtendedScheduleSnack.associatedSnack =
      snackFactory.injectInstance(snack);
    return newExtendedScheduleSnack;
  }
  static constructFromExtendedScheduleSnackDTO(
    extendedScheduleSnackDTO,
    snackFactory
  ) {
    const newExtendedScheduleSnack = new ExtendedScheduleSnack(
      extendedScheduleSnackDTO
    );
    newExtendedScheduleSnack.associatedSnack = snackFactory.injectInstance(
      extendedScheduleSnackDTO.associatedSnack
    );
    return newExtendedScheduleSnack;
  }
}
