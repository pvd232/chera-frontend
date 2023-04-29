import StagedScheduleSnack from './StagedScheduleSnack';

export default class ExtendedStagedScheduleSnack extends StagedScheduleSnack {
  constructor(extendedStagedScheduleSnackDTO) {
    super(extendedStagedScheduleSnackDTO);
    this.associatedSnack = null;
  }
  static constructFromStagedScheduleSnack(
    stagedScheduleSnack,
    snack,
    snackFactory
  ) {
    const newExtendedStagedScheduleSnack = new ExtendedStagedScheduleSnack(
      stagedScheduleSnack
    );
    newExtendedStagedScheduleSnack.associatedSnack =
      snackFactory.injectInstance(snack);
    return newExtendedStagedScheduleSnack;
  }
}
