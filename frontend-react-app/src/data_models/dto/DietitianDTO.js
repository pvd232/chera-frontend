import checkProperties from '../../helpers/checkProperties';
import capitalize from '../../helpers/capitalize';
export default class DietitianDTO {
  constructor(dietitianObject) {
    this.id = dietitianObject.id;
    this.email = dietitianObject.email;
    this.phoneNumber = dietitianObject.phone_number;
    this.firstName = dietitianObject.first_name;
    this.lastName = dietitianObject.last_name;
    this.dieteticRegistrationNumber =
      dietitianObject.dietetic_registration_number;
    this.clinicCity = dietitianObject.clinic_city;
    this.clinicState = dietitianObject.clinic_state;
    this.clinicAddress = dietitianObject.clinic_address;
    this.clinicUrl = dietitianObject.clinic_url;
    this.numberOfEDClients = dietitianObject.number_of_ed_clients;
    this.percentIntensiveOutpatient =
      dietitianObject.percent_intensive_outpatient;
    this.percentRegularOutpatient = dietitianObject.percent_regular_outpatient;
    this.datetime = dietitianObject.datetime * 1000;
    this.gotSample = dietitianObject.got_sample;
    this.active = dietitianObject.active;
    this.admin = dietitianObject.admin;
    this.properlyInitialized = (() => checkProperties(this))();
  }

  static initializeFromForm(formData) {
    return new DietitianDTO({
      id: formData.id,
      email: formData.email,
      phone_number: formData.phoneNumber,
      first_name: formData.firstName,
      last_name: formData.lastName,
      dietetic_registration_number: formData.dieteticRegistrationNumber,
      clinic_city: formData.city,
      clinic_state: formData.state,
      clinic_address: formData.address,
      clinic_url: formData.clinicUrl,
      number_of_ed_clients: formData.numberOfEDClients,
      percent_intensive_outpatient: formData.percentIntensiveOutpatient,
      percent_regular_outpatient: formData.percentRegularOutpatient,
      datetime: formData.datetime / 1000,
      got_sample: formData.gotSample,
      active: formData.active,
      admin: formData.admin,
    });
  }

  toJSON() {
    const data = {
      id: this.id,
      email: this.email,
      phone_number: this.phoneNumber,
      first_name: this.firstName,
      last_name: this.lastName,
      dietetic_registration_number: this.dieteticRegistrationNumber,
      clinic_city: this.clinicCity,
      clinic_state: this.clinicState,
      clinic_address: this.clinicAddress,
      clinic_url: this.clinicUrl,
      number_of_ed_clients: this.numberOfEDClients,
      percent_intensive_outpatient: this.percentIntensiveOutpatient,
      percent_regular_outpatient: this.percentRegularOutpatient,
      datetime: this.datetime / 1000,
      got_sample: this.gotSample,
      active: this.active,
      admin: this.admin,
    };
    return data;
  }

  get formattedName() {
    return `${capitalize(this.firstName)} ${capitalize(this.lastName)}`;
  }
}
