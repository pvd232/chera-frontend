import checkProperties from '../../helpers/checkProperties';
class PreviousDeliveryItem {
  constructor(previousDeliveryObject) {
    this.deliveryDate = previousDeliveryObject.deliveryDate;
    this.quantity = previousDeliveryObject.quantity;
    this.scheduledOrderMeals = previousDeliveryObject.scheduledOrderMeals;
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
export default PreviousDeliveryItem;
