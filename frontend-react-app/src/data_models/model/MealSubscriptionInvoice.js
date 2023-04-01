import checkProperties from '../../helpers/checkProperties';
export default class MealSubscriptionInvoice {
  constructor(mealSubscriptionInvoiceObject) {
    if (mealSubscriptionInvoiceObject) {
      this.id = mealSubscriptionInvoiceObject.id;
      this.mealSubscriptionId =
        mealSubscriptionInvoiceObject.mealSubscriptionId;
      this.subtotal = mealSubscriptionInvoiceObject.subtotal;
      this.salesTaxPercentage =
        mealSubscriptionInvoiceObject.salesTaxPercentage;
      this.salesTaxTotal = mealSubscriptionInvoiceObject.salesTaxTotal;
      this.shippingTotal = mealSubscriptionInvoiceObject.shippingTotal;
      this.stripeFeeTotal = mealSubscriptionInvoiceObject.stripeFeeTotal;
      this.stripeInvoiceId = mealSubscriptionInvoiceObject.stripeInvoiceId;
      this.stripePaymentIntentId =
        mealSubscriptionInvoiceObject.stripePaymentIntentId;
      this.total = mealSubscriptionInvoiceObject.total;
      this.datetime = mealSubscriptionInvoiceObject.datetime;
      this.deliveryDate = new Date(mealSubscriptionInvoiceObject.deliveryDate);
    }
    // Static initializer
    else {
      this.id = '';
      this.mealSubscriptionId = '';
      this.subtotal = 0.0;
      this.salesTaxPercentage = 0.0;
      this.salesTaxTotal = 0.0;
      this.stripeFeeTotal = 0.0;
      this.shippingTotal = 0.0;
      this.stripePaymentIntentId = '';
      this.stripeInvoiceId = '';
      this.total = 0.0;
      this.datetime = Date.now();
      this.deliveryDate = '';
    }
    this.properlyInitialized = (() => checkProperties(this))();
  }

  static createInitialInvoice({
    mealSubscriptionInvoiceId,
    mealSubscriptionId,
    deliveryDate,
  }) {
    const newMealSubscriptionInvoice = new MealSubscriptionInvoice();
    newMealSubscriptionInvoice.id = mealSubscriptionInvoiceId;
    newMealSubscriptionInvoice.mealSubscriptionId = mealSubscriptionId;
    newMealSubscriptionInvoice.deliveryDate = deliveryDate;
    return newMealSubscriptionInvoice;
  }
}
