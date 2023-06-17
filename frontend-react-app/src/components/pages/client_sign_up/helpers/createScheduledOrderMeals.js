import DeliveryDateUtility from '../../../../helpers/DeliveryDateUtility';
import ScheduledOrderMeal from '../../../../data_models/model/ScheduledOrderMeal';
const createScheduledOrderMeals = (scheduleMeals, createFirstWeekMeals) => {
  const scheduledOrderMeals = [];

  // If editing a current meal subscription and past the deadline to edit current week meals (i.e. today is after the cutoff date for the current week), then start at week 1
  const startingMealIndex = createFirstWeekMeals ? 0 : 1;
  // Add scheduled ordered meals for weeks 0-3
  for (let i = startingMealIndex; i < 4; i++) {
    const deliveryDate = DeliveryDateUtility.getDeliveryDateFromIndex(i);
    // Use chosen schedule Meals to created future scheduledOrderMeals
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
