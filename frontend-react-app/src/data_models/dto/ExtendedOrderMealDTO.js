import OrderMealDTO from './OrderMealDTO';
class ExtendedOrderMealDTO extends OrderMealDTO {
  constructor(extendedOrderMealDTO, extendedScheduledOrderMealDTOFactory) {
    super(extendedOrderMealDTO);
    this.scheduledOrderMeal =
      extendedScheduledOrderMealDTOFactory.injectInstance(
        extendedOrderMealDTO.scheduled_order_meal
      );
  }
}
export default ExtendedOrderMealDTO;
