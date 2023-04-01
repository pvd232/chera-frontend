import checkProperties from '../../helpers/checkProperties';
export default class ClientDTO {
  constructor(clientData) {
    this.id = clientData.id;
    this.password = clientData.password;
    this.dietitianId = clientData.dietitian_id;
    this.mealPlanId = clientData.meal_plan_id;
    this.stripeId = clientData.stripe_id;
    this.firstName = clientData.first_name;
    this.lastName = clientData.last_name;
    this.street = clientData.street;
    this.suite = clientData.suite;
    this.city = clientData.city;
    this.state = clientData.state;
    this.zipcode = clientData.zipcode;
    this.address = clientData.address;
    this.phoneNumber = clientData.phone_number;
    this.notes = clientData.notes;
    this.datetime = clientData.datetime * 1000;
    this.active = clientData.active;
    this.properlyInitialized = (() => checkProperties(this))();
  }
  static initializeFromForm(client) {
    return new ClientDTO({
      id: client.id,
      password: client.password,
      dietitian_id: client.dietitianId,
      meal_plan_id: client.mealPlanId,
      stripe_id: client.stripeId,
      first_name: client.firstName,
      last_name: client.lastName,
      street: client.street,
      suite: client.suite,
      city: client.city,
      state: client.state,
      zipcode: client.zipcode,
      address: client.address,
      phone_number: client.phoneNumber,
      notes: client.notes,
      datetime: client.datetime / 1000,
      active: client.active,
    });
  }
  toJSON() {
    return {
      id: this.id,
      password: this.password,
      dietitian_id: this.dietitianId,
      meal_plan_id: this.mealPlanId,
      stripe_id: this.stripeId,
      first_name: this.firstName,
      last_name: this.lastName,
      street: this.street,
      suite: this.suite,
      city: this.city,
      state: this.state,
      zipcode: this.zipcode,
      address: this.address,
      phone_number: this.phoneNumber,
      notes: this.notes,
      datetime: this.datetime / 1000,
      active: this.active,
    };
  }
}
