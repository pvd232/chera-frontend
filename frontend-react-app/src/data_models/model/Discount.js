import checkProperties from '../../helpers/checkProperties';
export default class Discount {
  constructor(discountObject) {
    this.id = discountObject.id;
    this.code = discountObject.code;
    this.discountPercentage = discountObject.discountPercentage;
    this.active = discountObject.active;
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
