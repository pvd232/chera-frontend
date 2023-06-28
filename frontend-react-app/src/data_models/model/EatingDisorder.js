import checkProperties from '../../helpers/checkProperties';
import capitalize from '../../helpers/capitalize';
export default class EatingDisorder {
    constructor(eatingDisorder) {
        this.id = eatingDisorder.id;
        this.name = eatingDisorder.name;
        this.properlyInitialized = (() => checkProperties(this))();
    }
    get formattedName() {
        return `${capitalize(this.name)}`;
    }
}
