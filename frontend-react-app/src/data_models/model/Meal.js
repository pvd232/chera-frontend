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
    // temporary image patch
    this.imageUrl =
      'https://storage.googleapis.com/meal-photos/bendito-small.png';
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
