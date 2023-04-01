import checkProperties from '../../helpers/checkProperties';
export default class MealSubscriptionInvoiceDTO {
  constructor(mealSubscriptionInvoiceObject) {
    this.id = mealSubscriptionInvoiceObject.id;
    this.mealSubscriptionId =
      mealSubscriptionInvoiceObject.meal_subscription_id;
    this.subtotal = mealSubscriptionInvoiceObject.subtotal;
    this.salesTaxPercentage =
      mealSubscriptionInvoiceObject.sales_tax_percentage;
    this.salesTaxTotal = mealSubscriptionInvoiceObject.sales_tax_total;
    this.shippingTotal = mealSubscriptionInvoiceObject.shipping_total;
    this.stripeFeeTotal = mealSubscriptionInvoiceObject.stripe_fee_total;
    this.stripeInvoiceId = mealSubscriptionInvoiceObject.stripe_invoice_id;
    this.stripePaymentIntentId =
      mealSubscriptionInvoiceObject.stripe_payment_intent_id;
    this.total = mealSubscriptionInvoiceObject.total;
    this.datetime = mealSubscriptionInvoiceObject.datetime * 1000;
    this.deliveryDate = new Date(
      mealSubscriptionInvoiceObject.delivery_date * 1000
    );
    this.properlyInitialized = (() => checkProperties(this))();
  }
  static initializeFromMealSubscriptionInvoice(mealSubscriptionInvoiceObject) {
    return new MealSubscriptionInvoiceDTO({
      id: mealSubscriptionInvoiceObject.id,
      meal_subscription_id: mealSubscriptionInvoiceObject.mealSubscriptionId,
      subtotal: mealSubscriptionInvoiceObject.subtotal,
      sales_tax_percentage: mealSubscriptionInvoiceObject.salesTaxPercentage,
      sales_tax_total: mealSubscriptionInvoiceObject.salesTaxTotal,
      stripe_fee_total: mealSubscriptionInvoiceObject.stripeFeeTotal,
      shipping_total: mealSubscriptionInvoiceObject.shippingTotal,
      stripe_invoice_id: mealSubscriptionInvoiceObject.stripeInvoiceId,
      stripe_payment_intent_id:
        mealSubscriptionInvoiceObject.stripePaymentIntentId,
      total: mealSubscriptionInvoiceObject.total,
      datetime: mealSubscriptionInvoiceObject.datetime / 1000,
      delivery_date:
        mealSubscriptionInvoiceObject.deliveryDate.getTime() / 1000,
    });
  }
  toJSON() {
    return {
      id: this.id,
      meal_subscription_id: this.mealSubscriptionId,
      subtotal: this.subtotal,
      sales_tax_percentage: this.salesTaxPercentage,
      sales_tax_total: this.salesTaxTotal,
      stripe_fee_total: this.stripeFeeTotal,
      shipping_total: this.shippingTotal,
      stripe_invoice_id: this.stripeInvoiceId,
      stripe_payment_intent_id: this.stripePaymentIntentId,
      total: this.total,
      datetime: this.datetime / 1000,
      delivery_date: this.deliveryDate.getTime() / 1000,
    };
  }
}
