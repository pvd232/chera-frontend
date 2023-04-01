import checkProperties from '../helpers/checkProperties';
export default class ClientItem {
  constructor(client, isStagedClient) {
    this.email = client.id;
    this.name = client.formattedName;
    this.address = client.address ?? '';
    this.mealPlanName = client.mealPlan.name;
    this.mealPlanNumber = client.mealPlan.number;
    this.notes = client.notes;
    this.isStagedClient = isStagedClient;
    // StagedClient property only, default to true
    this.accountCreated = client.accountCreated ?? true;
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
