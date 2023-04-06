import checkProperties from '../../helpers/checkProperties';
export default class Meal {
  constructor(mealObject) {
    this.id = mealObject.id;
    this.mealTime = mealObject.mealTime;
    this.name = mealObject.name;
    this.description = mealObject.description;
    this.imageUrl = mealObject.imageUrl;
    this.price = mealObject.price;
    this.active = mealObject.active;
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
