import checkProperties from '../helpers/checkProperties';
export default class DietitianItem {
  constructor(dietitian) {
    this.email = dietitian.id;
    this.name = dietitian.formattedName;
    this.clinicZipcode = dietitian.clinicZipcode;
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
