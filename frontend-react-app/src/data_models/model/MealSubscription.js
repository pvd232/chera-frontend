import checkProperties from '../../helpers/checkProperties';
export default class MealSubscription {
  constructor(mealSubscriptionObject) {
    this.id = mealSubscriptionObject.id;
    this.clientId = mealSubscriptionObject.clientId;
    this.dietitianId = mealSubscriptionObject.dietitianId;
    this.stripePriceId = mealSubscriptionObject.stripePriceId;
    this.stripeSubscriptionId = mealSubscriptionObject.stripeSubscriptionId;
    this.shippingCost = mealSubscriptionObject.shippingCost;
    this.datetime = mealSubscriptionObject.datetime;
    this.paused = mealSubscriptionObject.paused;
    this.active = mealSubscriptionObject.active;
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
