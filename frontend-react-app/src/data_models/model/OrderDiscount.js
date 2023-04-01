import checkProperties from '../../helpers/checkProperties';
import { v4 as uuid } from 'uuid';
export default class OrderDiscount {
  constructor(orderDiscountObject) {
    if (orderDiscountObject) {
      this.id = orderDiscountObject.id;
      this.discountId = orderDiscountObject.discountId;
      this.stagedClientId = orderDiscountObject.stagedClientId;
      this.amount = orderDiscountObject.amount;
      this.datetime = orderDiscountObject.datetime;
    } else {
      this.id = uuid();
      this.discountId = '';
      this.stagedClientId = '';
      this.amount = 0.0;
      this.datetime = Date.now();
    }
    this.properlyInitialized = (() => checkProperties(this))();
  }
  static initializeFromDiscount(discountId) {
    const newOrderDiscount = new OrderDiscount();
    newOrderDiscount.discountId = discountId;
    return newOrderDiscount;
  }
}
