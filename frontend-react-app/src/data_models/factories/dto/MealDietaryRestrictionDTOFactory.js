import MealDietaryRestrictionDTO from '../../dto/MealDietaryRestrictionDTO';
export default class MealDietaryRestrictionDTOFactory {
  injectInstance(mealDietaryRestrictionJSON) {
    return new MealDietaryRestrictionDTO(mealDietaryRestrictionJSON);
  }
}
