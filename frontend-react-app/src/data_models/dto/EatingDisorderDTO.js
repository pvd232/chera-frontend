import checkProperties from '../../helpers/checkProperties';
export default class EatingDisorderDTO {
    constructor(eatingDisorder) {
        this.id = eatingDisorder.id;
        this.name = eatingDisorder.name;

        this.properlyInitialized = (() => checkProperties(this))();
    }

    toJSON() {
        const data = {
            id: this.id,
            name: this.name,
        };
        return data;
    }
}
