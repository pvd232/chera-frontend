import ScheduledOrderMealDTO from '../../dto/ScheduledOrderMealDTO';
export default class ScheduledOrderMealDTOFactory {
  injectInstance(scheduledOrderMealJSON) {
    return new ScheduledOrderMealDTO(scheduledOrderMealJSON);
  }
}
