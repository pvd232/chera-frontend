import checkProperties from '../../helpers/checkProperties';
export default class Snack {
  constructor(mealObject) {
    this.id = mealObject.id;
    this.name = mealObject.name;
    this.description = mealObject.description;
    this.imageUrl = mealObject.imageUrl;
    this.active = mealObject.active;
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
