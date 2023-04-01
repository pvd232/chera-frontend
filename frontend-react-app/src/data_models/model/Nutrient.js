import checkProperties from '../../helpers/checkProperties';
export default class Nutrient {
  constructor(nutrientObject) {
    this.id = nutrientObject.id;
    this.name = nutrientObject.name;
    this.unit = nutrientObject.unit;
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
