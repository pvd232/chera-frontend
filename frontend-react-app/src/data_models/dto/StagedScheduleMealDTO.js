import checkProperties from '../../helpers/checkProperties';
export default class StagedScheduleMealDTO {
  constructor(stagedScheduleMealData) {
    this.id = stagedScheduleMealData.id;
    this.mealId = stagedScheduleMealData.meal_id;
    this.stagedClientId = stagedScheduleMealData.staged_client_id;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  static initializeFromStagedScheduleMeal(stagedScheduleMeal) {
    return new StagedScheduleMealDTO({
      id: stagedScheduleMeal.id,
      meal_id: stagedScheduleMeal.mealId,
      staged_client_id: stagedScheduleMeal.stagedClientId,
    });
  }
  toJSON() {
    return {
      id: this.id,
      meal_id: this.mealId,
      staged_client_id: this.stagedClientId,
    };
  }
}
