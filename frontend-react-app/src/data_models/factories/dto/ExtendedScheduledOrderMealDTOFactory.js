import ExtendedScheduledOrderMealDTO from '../../dto/ExtendedScheduledOrderMealDTO';
export default class ExtendedScheduledOrderMealDTOFactory {
  constructor(extendedMealDTOFactory) {
    this.extendedMealDTOFactory = extendedMealDTOFactory;
  }
  injectInstance(extendedScheduledOrderMealJSON) {
    return new ExtendedScheduledOrderMealDTO(
      extendedScheduledOrderMealJSON,
      this.extendedMealDTOFactory
    );
  }
}
