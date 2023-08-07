import checkProperties from '../../helpers/checkProperties';
export default class ClientItem {
  constructor(client, isStagedClient) {
    this.id = client.id;
    this.email = client.email;
    this.name = client.formattedName;
    this.address = client.address ?? '';
    this.mealPlanName = client.mealPlan.name;
    this.mealPlanNumber = client.mealPlan.number;
    this.mealPlanCalories = client.mealPlan.dinnerCalories;
    this.notes = client.notes;
    this.isStagedClient = isStagedClient;
    // StagedClient property only, default to true
    this.accountCreated = client.accountCreated ?? true;
    this.client = client;
    this.isLoading = false;
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
