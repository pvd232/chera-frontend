import MealPlanDTO from '../../dto/MealPlanDTO';
export default class MealPlanDTOFactory {
  injectInstance(mealDietaryRestrictionJSON) {
    return new MealPlanDTO(mealDietaryRestrictionJSON);
  }
}
