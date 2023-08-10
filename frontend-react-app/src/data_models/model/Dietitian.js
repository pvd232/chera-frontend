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
      this.clinicUrl = dietitianObject.clinicUrl;
      this.numberOfEDClients = dietitianObject.numberOfEDClients;
      this.percentIntensiveOutpatient =
        dietitianObject.percentIntensiveOutpatient;
      this.percentRegularOutpatient = dietitianObject.percentRegularOutpatient;
      this.datetime = dietitianObject.datetime;
      this.gotSample = dietitianObject.gotSample;
      this.admin = dietitianObject.admin;
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
      this.clinicUrl = '';
      this.numberOfEDClients = '';
      this.percentIntensiveOutpatient = '';
      this.percentRegularOutpatient = '';
      this.datetime = '';
      this.gotSample = false;
      this.admin = false;
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
