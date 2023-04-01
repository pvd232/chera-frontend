import checkProperties from '../../helpers/checkProperties';
export default class MealDTO {
  constructor(mealObject) {
    this.id = mealObject.id;
    this.mealTime = mealObject.meal_time;
    this.name = mealObject.name;
    this.description = mealObject.description;
    this.imageUrl = mealObject.image_url;
    this.price = mealObject.price;
    this.active = mealObject.active;
    // temporary image patch
    this.imageUrl =
      'https://storage.googleapis.com/meal-photos/bendito-small.png';
    this.properlyInitialized = (() => checkProperties(this))();
  }
  toJSON() {
    return {
      id: this.id,
      meal_time: this.mealTime,
      name: this.name,
      description: this.description,
      image_url: this.imageUrl,
      price: this.price,
      active: this.active,
      dietary_restrictions: this.dietaryRestrictions,
    };
  }
}
