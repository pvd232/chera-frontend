import checkProperties from '../helpers/checkProperties';
export default class DietitianItem {
  constructor(dietitian) {
    this.email = dietitian.id;
    this.name = dietitian.formattedName;
    this.clinicState = dietitian.clinicState;
    this.properlyInitialized = (() => checkProperties(this))();
  }
}
