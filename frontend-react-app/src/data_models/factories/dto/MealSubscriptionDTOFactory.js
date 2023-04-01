import MealSubscriptionDTO from '../../dto/MealSubscriptionDTO';
export default class MealSubscriptionDTOFactory {
  injectInstance(mealSubscriptionJSON) {
    return new MealSubscriptionDTO(mealSubscriptionJSON);
  }
}
