import checkProperties from '../../helpers/checkProperties';
export default class OrderDiscountDTO {
  constructor(orderDiscountObject) {
    this.id = orderDiscountObject.id;
    this.discountId = orderDiscountObject.discount_id;
    this.stagedClientId = orderDiscountObject.staged_client_id;
    this.amount = orderDiscountObject.amount;
    this.datetime = orderDiscountObject.datetime * 1000;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  toJSON() {
    return {
      id: this.id,
      discount_id: this.discountId,
      staged_client_id: this.stagedClientId,
      amount: this.amount,
      datetime: this.datetime / 1000,
    };
  }
}
