import { v4 as uuid } from 'uuid';
import OrderMeal from '../../../../data_models/model/OrderMeal';
const createInitialOrderMeals = (
  mealSubscriptionInvoiceId,
  scheduledOrderMeals
) => {
  const orderMeals = [];
  for (const scheduledOrderMeal of scheduledOrderMeals) {
    const orderMealId = uuid();
    const newOrderMeal = OrderMeal.initializeFromScheduledOrderMeal(
      orderMealId,
      mealSubscriptionInvoiceId,
      scheduledOrderMeal.id
    );
    orderMeals.push(newOrderMeal);
  }
  return orderMeals;
};
export default createInitialOrderMeals;
