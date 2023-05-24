import checkProperties from '../../helpers/checkProperties';
import capitalize from '../../helpers/capitalize';
export default class DietitianDTO {
  constructor(dietitianObject) {
    this.id = dietitianObject.id;
    this.password = dietitianObject.password;
    this.firstName = dietitianObject.first_name;
    this.lastName = dietitianObject.last_name;
    this.dieteticRegistrationNumber =
      dietitianObject.dietetic_registration_number;
    this.clinicCity = dietitianObject.clinic_city;
    this.clinicState = dietitianObject.clinic_state;
    this.clinicAddress = dietitianObject.clinic_address;
    this.clinicUrl = dietitianObject.clinic_url;
    this.datetime = dietitianObject.datetime * 1000;
    this.active = dietitianObject.active;
    this.admin = dietitianObject.admin;
    this.properlyInitialized = (() => checkProperties(this))();
  }

  static initializeFromForm(formData) {
    return new DietitianDTO({
      id: formData.id,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName,
      dietetic_registration_number: formData.dieteticRegistrationNumber,
      clinic_city: formData.clinicCity,
      clinic_state: formData.clinicState,
      clinic_address: formData.clinicAddress,
      clinic_url: formData.clinicUrl,
      admin: formData.admin,
      notes: formData.notes,
      datetime: formData.datetime / 1000,
      active: formData.active,
    });
  }

  toJSON() {
    const data = {
      id: this.id,
      password: this.password,
      first_name: this.firstName,
      last_name: this.lastName,
      dietetic_registration_number: this.dieteticRegistrationNumber,
      clinic_city: this.clinicCity,
      clinic_state: this.clinicState,
      clinic_address: this.clinicAddress,
      clinic_url: this.clinicUrl,
      datetime: this.datetime / 1000,
      active: this.active,
      admin: this.admin,
    };
    return data;
  }

  get formattedName() {
    return `${capitalize(this.firstName)} ${capitalize(this.lastName)}`;
  }
}
