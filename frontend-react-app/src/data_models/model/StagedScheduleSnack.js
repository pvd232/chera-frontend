import checkProperties from '../../helpers/checkProperties';
export default class StagedScheduleSnack {
  constructor(stagedScheduleSnackData) {
    if (stagedScheduleSnackData) {
      this.id = stagedScheduleSnackData.id;
      this.snackId = stagedScheduleSnackData.snackId;
      this.stagedClientId = stagedScheduleSnackData.stagedClientId;
    } else {
      this.id = '';
      this.snackId = '';
      this.stagedClientId = '';
    }
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
