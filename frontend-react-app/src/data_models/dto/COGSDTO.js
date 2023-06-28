import checkProperties from '../../helpers/checkProperties';
export default class COGSDTO {
  constructor(cogsObject) {
    this.numMeals = cogsObject.num_meals;
    this.isLocal = cogsObject.is_local;
    this.ingredient = cogsObject.ingredient;
    this.corePackaging = cogsObject.core_packaging;
    this.kitchen = cogsObject.kitchen;
    this.chef = cogsObject.chef;
    this.box = cogsObject.box;
    this.ice = cogsObject.ice;
    this.numBoxes = cogsObject.num_boxes;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  get costPerMeal() {
    return (
      this.ingredient +
      this.corePackaging +
      this.kitchen +
      this.chef +
      this.box +
      this.ice
    );
  }
  toJSON() {
    return {
      num_meals: this.numMeals,
      is_local: this.isLocal,
      ingredient: this.ingredient,
      core_packaging: this.corePackaging,
      kitchen: this.kitchen,
      chef: this.chef,
      box: this.box,
      ice: this.ice,
      num_boxes: this.num_boxes,
    };
  }
}
