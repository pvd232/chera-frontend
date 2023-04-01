import MealDTO from './MealDTO';

export default class ExtendedMealDTO extends MealDTO {
  constructor(extendedMealDTO, mealDietaryRestrictionDTOFactory) {
    super(extendedMealDTO);
    this.dietaryRestrictions = extendedMealDTO.dietary_restrictions.map(
      (dietaryRestriction) =>
        mealDietaryRestrictionDTOFactory.injectInstance(dietaryRestriction)
    );
  }
}
