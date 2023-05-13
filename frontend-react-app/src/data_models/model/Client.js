import checkProperties from '../../helpers/checkProperties';
import capitalize from '../../helpers/capitalize';
export default class Client {
  constructor(clientObject) {
    if (clientObject) {
      this.id = clientObject.id;
      this.password = clientObject.password;
      this.dietitianId = clientObject.dietitianId;
      this.mealPlanId = clientObject.mealPlanId;
      this.stripeId = clientObject.stripeId;
      this.firstName = clientObject.firstName;
      this.lastName = clientObject.lastName;
      this.street = clientObject.street;
      this.suite = clientObject.suite;
      this.city = clientObject.city;
      this.state = clientObject.state;
      this.zipcode = clientObject.zipcode;
      this.zipcodeExtension = clientObject.zipcodeExtension;
      this.address = clientObject.address;
      this.phoneNumber = clientObject.phoneNumber;
      this.notes = clientObject.notes;
      this.datetime = clientObject.datetime;
      this.active = clientObject.active;
    } else {
      this.id = '';
      this.password = '';
      this.dietitianId = '';
      this.mealPlanId = '';
      this.stripeId = '';
      this.firstName = '';
      this.lastName = '';
      this.street = '';
      this.suite = '';
      this.city = '';
      this.state = '';
      this.zipcode = '';
      this.zipcodeExtension = '';
      this.address = '';
      this.phoneNumber = '';
      this.notes = '';
      this.datetime = '';
      this.active = true;
    }
    this.isStagedClient = false;
    this.properlyInitialized = (() => checkProperties(this))();
  }

  get formattedName() {
    return `${capitalize(this.firstName)} ${capitalize(this.lastName)}`;
  }
}
