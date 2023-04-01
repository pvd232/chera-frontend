import Client from './Client';

export default class ExtendedClient extends Client {
  constructor(extendedClient, mealPlanFactory) {
    super(extendedClient);
    this.mealPlan = mealPlanFactory.injectInstance(extendedClient.mealPlan);
  }
}
