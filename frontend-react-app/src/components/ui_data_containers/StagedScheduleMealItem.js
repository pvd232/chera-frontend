import checkProperties from '../../helpers/checkProperties';
import StagedScheduleMeal from '../../data_models/model/StagedScheduleMeal';
export default class StagedScheduleMealItem extends StagedScheduleMeal {
  constructor(stagedScheduleMealData) {
    super(stagedScheduleMealData);
    this.quantity = 1;
    this.associatedMeal = stagedScheduleMealData.associatedMeal;
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
