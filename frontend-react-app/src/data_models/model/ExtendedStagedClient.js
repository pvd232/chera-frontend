import StagedClient from './StagedClient';

export default class ExtendedStagedClient extends StagedClient {
  constructor(stagedClient, mealPlan, mealPlanFactory) {
    super(stagedClient);
    this.mealPlan = mealPlanFactory.injectInstance(mealPlan);
  }
}
