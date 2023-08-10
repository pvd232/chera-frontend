import checkProperties from '../../helpers/checkProperties';
export default class MealSubscription {
  constructor(mealSubscriptionObject) {
    this.id = mealSubscriptionObject.id;
    this.clientId = mealSubscriptionObject.clientId;
    this.dietitianId = mealSubscriptionObject.dietitianId ?? '';
    this.stripeSubscriptionId = mealSubscriptionObject.stripeSubscriptionId;
    this.shippingRate = mealSubscriptionObject.shippingRate;
    this.datetime = mealSubscriptionObject.datetime;
    this.paused = mealSubscriptionObject.paused;
    this.active = mealSubscriptionObject.active;
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
