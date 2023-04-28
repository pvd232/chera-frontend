import checkProperties from '../helpers/checkProperties';
import StagedScheduleSnack from '../data_models/model/StagedScheduleSnack';
export default class StagedScheduleSnackItem extends StagedScheduleSnack {
  constructor(stagedScheduleSnackData) {
    super(stagedScheduleSnackData);
    this.quantity = 1;
    this.associatedSnack = stagedScheduleSnackData.associatedSnack;
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
