import checkProperties from '../../helpers/checkProperties';
export default class DiscountDTO {
  constructor(discountObject) {
    this.id = discountObject.id;
    this.code = discountObject.code;
    this.discountPercentage = discountObject.discount_percentage;
    this.active = discountObject.active;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  toJSON() {
    return {
      id: this.id,
      code: this.code,
      discount_percentage: this.discountPercentage,
      active: this.active,
    };
  }
}
