import checkProperties from '../../helpers/checkProperties';
import capitalize from '../../helpers/capitalize';
export default class DietitianDTO {
  constructor(dietitianObject) {
    this.id = dietitianObject.id;
    this.password = dietitianObject.password;
    this.firstName = dietitianObject.first_name;
    this.lastName = dietitianObject.last_name;
    this.clinicName = dietitianObject.clinic_name;
    this.clinicZipcode = dietitianObject.clinic_zipcode;
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
      clinic_name: formData.clinicName,
      clinic_zipcode: formData.clinicZipcode,
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
      clinic_name: this.clinicName,
      clinic_zipcode: this.clinicZipcode,
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
