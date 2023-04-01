import DeliveryDateUtility from '../../../helpers/DeliveryDateUtility';
import ScheduledOrderMeal from '../../../data_models/model/ScheduledOrderMeal';
const createScheduledOrderMeals = (scheduleMeals) => {
  const scheduledOrderMeals = [];

  // add scheduled ordered meals for weeks 0-3
  for (let i = 0; i < 4; i++) {
    const deliveryDate = DeliveryDateUtility.getDeliveryDateFromIndex(i);
    // use chosen schedule Meals to created future scheduledOrderMeals
    for (const scheduleMeal of scheduleMeals) {
      const newScheduledOrderMeal =
        ScheduledOrderMeal.initializeFromScheduleMeal(
          scheduleMeal,
          deliveryDate
        );
      scheduledOrderMeals.push(newScheduledOrderMeal);
    }
  }
  return scheduledOrderMeals;
};
export default createScheduledOrderMeals;
