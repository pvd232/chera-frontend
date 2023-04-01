import checkProperties from '../../helpers/checkProperties';
export default class StagedScheduleMeal {
  constructor(stagedScheduleMealData) {
    if (stagedScheduleMealData) {
      this.id = stagedScheduleMealData.id;
      this.mealId = stagedScheduleMealData.mealId;
      this.stagedClientId = stagedScheduleMealData.stagedClientId;
    } else {
      this.id = '';
      this.mealId = '';
      this.stagedClientId = '';
    }
    this.properlyInitialized = (() => checkProperties(this))();
  }
  static initializeFromScheduleMeal(scheduleMeal, stagedClientId) {
    const newStagedScheduleMeal = new StagedScheduleMeal();
    newStagedScheduleMeal.id = scheduleMeal.id;
    newStagedScheduleMeal.mealId = scheduleMeal.mealId;
    newStagedScheduleMeal.stagedClientId = stagedClientId;
    return newStagedScheduleMeal;
  }
}
