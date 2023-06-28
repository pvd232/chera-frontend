import checkProperties from '../../helpers/checkProperties';
export default class EatingDisorderDTO {
    constructor(eatingDisorder) {
        this.id = eatingDisorder.id;
        this.name = eatingDisorder.name;

        this.properlyInitialized = (() => checkProperties(this))();
    }
    static initializeFromStagedClient(eatingDisorder) {
        return new StagedClientDTO({
            id: eatingDisorder.id,
            name: eatingDisorder.name,
        });
    }

    toJSON() {
        const data = {
            id: this.id,
            name: this.name,
        };
        return data;
    }
}
