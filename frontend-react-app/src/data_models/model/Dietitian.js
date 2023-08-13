import checkProperties from '../../helpers/checkProperties';
import capitalize from '../../helpers/capitalize';
export default class Dietitian {
  constructor(dietitianObject) {
    if (dietitianObject) {
      this.id = dietitianObject.id;
      this.email = dietitianObject.email;
      this.phoneNumber = dietitianObject.phoneNumber;
      this.firstName = dietitianObject.firstName;
      this.lastName = dietitianObject.lastName;
      this.dieteticRegistrationNumber =
        dietitianObject.dieteticRegistrationNumber;
      this.clinicCity = dietitianObject.clinicCity;
      this.clinicState = dietitianObject.clinicState;
      this.clinicAddress = dietitianObject.clinicAddress;
      this.numberOfEDClients = dietitianObject.numberOfEDClients;
      this.datetime = dietitianObject.datetime;
      this.gotSample = dietitianObject.gotSample;
      this.active = dietitianObject.active;
    } else {
      this.id = '';
      this.email = '';
      this.phoneNumber = '';
      this.firstName = '';
      this.lastName = '';
      this.dieteticRegistrationNumber = '';
      this.clinicCity = '';
      this.clinicState = '';
      this.clinicAddress = dietitianObject.clinicAddress;
      this.numberOfEDClients = '';
      this.datetime = '';
      this.gotSample = false;
      this.active = true;
    }
    this.properlyInitialized = (() => checkProperties(this))();
  }
  static injectInstance(dietitianObject) {
    return new Dietitian(dietitianObject);
  }

  get formattedName() {
    return `${capitalize(this.firstName)} ${capitalize(this.lastName)}`;
  }
}
