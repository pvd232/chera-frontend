import checkProperties from '../../helpers/checkProperties';
export default class StagedClientDTO {
  constructor(stagedClient) {
    this.id = stagedClient.id;
    this.firstName = stagedClient.first_name;

    this.currentWeight = stagedClient.current_weight;
    this.targetWeight = stagedClient.target_weight;
    this.age = stagedClient.age;
    this.gender = stagedClient.gender;
    this.eatingDisorderId = stagedClient.eating_disorder_id;

    this.dietitianId = stagedClient.dietitian_id;
    this.mealPlanId = stagedClient.meal_plan_id;
    this.datetime = stagedClient.datetime;
    this.notes = stagedClient.notes;
    this.accountCreated = stagedClient.account_created;
    this.active = stagedClient.active;
    this.waitlisted = stagedClient.waitlisted;
    this.mealsPreSelected = stagedClient.meals_pre_selected;
    this.mealsPrepaid = stagedClient.meals_prepaid;
    this.isStagedClient = true;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  static initializeFromStagedClient(stagedClient) {
    return new StagedClientDTO({
      id: stagedClient.id,
      first_name: stagedClient.firstName,
      current_weight: stagedClient.currentWeight,
      target_weight: stagedClient.targetWeight,
      age: stagedClient.age,
      gender: stagedClient.gender,
      eating_disorder_id: stagedClient.eatingDisorderId,
      dietitian_id: stagedClient.dietitianId,
      meal_plan_id: stagedClient.mealPlanId,
      datetime: stagedClient.datetime,
      notes: stagedClient.notes,
      account_created: stagedClient.accountCreated,
      active: stagedClient.active,
      waitlisted: stagedClient.waitlisted,
      meals_pre_selected: stagedClient.mealsPreSelected,
      meals_prepaid: stagedClient.mealsPrepaid,
    });
  }

  toJSON() {
    const data = {
      id: this.id,
      first_name: this.firstName,
      current_weight: this.currentWeight,
      target_weight: this.targetWeight,
      age: this.age,
      gender: this.gender,
      eating_disorder_id: this.eatingDisorderId,
      dietitian_id: this.dietitianId,
      meal_plan_id: this.mealPlanId,
      notes: this.notes,
      account_created: this.accountCreated,
      datetime: this.datetime / 1000,
      active: this.active,
      waitlisted: this.waitlisted,
      meals_pre_selected: this.mealsPreSelected,
      meals_prepaid: this.mealsPrepaid,
    };
    return data;
  }
}
