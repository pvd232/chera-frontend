import checkProperties from '../../helpers/checkProperties';
export default class StagedScheduleSnackDTO {
  constructor(stagedScheduleSnackData) {
    this.id = stagedScheduleSnackData.id;
    this.snackId = stagedScheduleSnackData.snack_id;
    this.stagedClientId = stagedScheduleSnackData.staged_client_id;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  static initializeFromStagedScheduleSnack(stagedScheduleSnack) {
    return new StagedScheduleSnackDTO({
      id: stagedScheduleSnack.id,
      snack_id: stagedScheduleSnack.snackId,
      staged_client_id: stagedScheduleSnack.stagedClientId,
    });
  }
  toJSON() {
    return {
      id: this.id,
      snack_id: this.snackId,
      staged_client_id: this.stagedClientId,
    };
  }
}
