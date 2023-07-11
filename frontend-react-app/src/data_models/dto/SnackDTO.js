import checkProperties from '../../helpers/checkProperties';
export default class SnackDTO {
  constructor(snackObject) {
    this.id = snackObject.id;
    this.name = snackObject.name;
    this.description = snackObject.description;
    this.imageUrl = snackObject.image_url;
    this.active = snackObject.active;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      image_url: this.imageUrl,
      active: this.active,
    };
  }
}
