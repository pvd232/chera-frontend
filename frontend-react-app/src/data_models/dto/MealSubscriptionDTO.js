import checkProperties from '../../helpers/checkProperties';
export default class MealSubscriptionDTO {
  constructor(mealSubscriptionJSON) {
    this.id = mealSubscriptionJSON.id;
    this.clientId = mealSubscriptionJSON.client_id;
    this.dietitianId = mealSubscriptionJSON.dietitian_id;
    this.stripePriceId = mealSubscriptionJSON.stripe_price_id;
    this.stripeSubscriptionId = mealSubscriptionJSON.stripe_subscription_id;
    this.shippingCost = mealSubscriptionJSON.shipping_cost;
    this.datetime = mealSubscriptionJSON.datetime * 1000;
    this.paused = mealSubscriptionJSON.paused;
    this.active = mealSubscriptionJSON.active;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  toJSON() {
    return {
      id: this.id,
      client_id: this.clientId,
      dietitian_id: this.dietitianId,
      stripe_subscription_id: this.stripeSubscriptionId,
      stripe_price_id: this.stripePriceId,
      shipping_cost: this.shippingCost,
      datetime: this.datetime / 1000,
      paused: this.paused,
      active: this.active,
    };
  }
  static initializeFromMealSubscription(mealSubscription) {
    return new MealSubscriptionDTO({
      id: mealSubscription.id,
      client_id: mealSubscription.clientId,
      dietitian_id: mealSubscription.dietitianId,
      stripe_price_id: mealSubscription.stripePriceId,
      stripe_subscription_id: mealSubscription.stripeSubscriptionId,
      shipping_cost: mealSubscription.shippingCost,
      datetime: mealSubscription.datetime / 1000,
      paused: mealSubscription.paused,
      active: mealSubscription.active,
    });
  }
}
