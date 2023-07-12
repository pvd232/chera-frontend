import ExtendedMealDTO from '../../dto/ExtendedMealDTO';

export default class ExtendedMealDTOFactory {
  constructor(mealDietaryRestrictionDTOFactory) {
    this.mealDietaryRestrictionDTOFactory = mealDietaryRestrictionDTOFactory;
  }
  injectInstance(mealJSON) {
    return new ExtendedMealDTO(mealJSON, this.mealDietaryRestrictionDTOFactory);
  }
}
