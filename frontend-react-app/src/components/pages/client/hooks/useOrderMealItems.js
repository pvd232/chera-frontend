import { useEffect, useState } from 'react';
import ExtendedScheduledOrderMeal from '../../../../data_models/model/ExtendedScheduledOrderMeal';
import ExtendedMealFactory from '../../../../data_models/factories/model/ExtendedMealFactory';
import ExtendedMealDTOFactory from '../../../../data_models/factories/dto/ExtendedMealDTOFactory';
import MealDietaryRestrictionFactory from '../../../../data_models/factories/model/MealDietaryRestrictionFactory';
import MealDietaryRestrictionDTOFactory from '../../../../data_models/factories/dto/MealDietaryRestrictionDTOFactory';
import ExtendedScheduledOrderMealDTOFactory from '../../../../data_models/factories/dto/ExtendedScheduledOrderMealDTOFactory';
import DeliveryDateUtility from '../../../../helpers/DeliveryDateUtility';
import LocalStorageManager from '../../../../helpers/LocalStorageManager';
import ExtendedOrderMealDTO from '../../../../data_models/dto/ExtendedOrderMealDTO';
import PreviousDeliveryItem from '../../../ui_data_containers/PreviousDeliveryItem';
import DietitianClientMealCard from '../../../shared_components/DietitianClientMealCard';
import createScheduledOrderMealCardItems from '../client_home/helpers/createScheduledOrderMealCardItems';
import CircularProgressPage from '../../../shared_components/CircularProgressPage';
import APIClient from '../../../../helpers/APIClient';
export const useOrderMealItems = () => {
  const [previousOrderMeals, setPreviousOrderMeals] = useState(false);

  useEffect(() => {
    let mounted = true;

    APIClient.getClientExtendedOrderMeals(
      LocalStorageManager.shared.clientMealSubscription.id
    ).then((extendedOrderMealsData) => {
      if (mounted) {
        const extendedOrderMealDTOs = extendedOrderMealsData.map(
          (extendedOrderMealJSON) => {
            return new ExtendedOrderMealDTO(
              extendedOrderMealJSON,
              new ExtendedScheduledOrderMealDTOFactory(
                new ExtendedMealDTOFactory(
                  new MealDietaryRestrictionDTOFactory()
                )
              )
            );
          }
        );
        const extendedScheduledOrderMealDTOs = extendedOrderMealDTOs.map(
          (extendedOrderMealDTO) => {
            return extendedOrderMealDTO.scheduledOrderMeal;
          }
        );
        const extendedScheduledOrderMeals = extendedScheduledOrderMealDTOs.map(
          (extendedScheduledOrderMealDTO) => {
            return ExtendedScheduledOrderMeal.constructFromExtendedScheduledOrderMealDTO(
              extendedScheduledOrderMealDTO,
              new ExtendedMealFactory(new MealDietaryRestrictionFactory())
            );
          }
        );
        const extendedScheduledOrderMealsByDate = Array.from(
          // Returns a map of maps.
          createScheduledOrderMealCardItems(extendedScheduledOrderMeals)
        );

        // During initial sign up order meals are created for the first delivery, which is in the future, so we don't want to display those.
        const firstWeekDelivery = new Date(
          extendedScheduledOrderMealsByDate[0][0]
        );
        if (firstWeekDelivery > new Date()) {
          setPreviousOrderMeals([]);
          return;
        }

        const orderMealItems = extendedScheduledOrderMealsByDate.map((item) => {
          // Item[0] is a list of unique keys, which is the delivery date, as a timestamp, for the week.
          const deliveryDate = new Date(item[0]);

          let initialValue = 0;
          // Item[1] is a corresponding list of values, which is a Map with mealId as the key and a ScheduledOrderMealCard item as the value.
          // The ScheduledOrderMealCard item is a ScheduledOrderMeal with a quantity attribute for the number of times the meal was ordered that week.
          const quantity = Array.from(item[1].values()).reduce(
            // Sum the number of meals ordered for each week
            // Potentially useless since the quantity is the same for each meal in the week.
            (total, item) => total + item.quantity,
            initialValue
          );
          // Extract the values from the map, which are the ScheduledOrderMealCard items.
          const scheduledOrderMeals = Array.from(item[1].values());
          return new PreviousDeliveryItem({
            deliveryDate: deliveryDate,
            quantity: quantity,
            scheduledOrderMeals: scheduledOrderMeals,
          });
        });

        setPreviousOrderMeals(orderMealItems);
      }
    });
    return () => (mounted = false);
  }, []);
  return previousOrderMeals;
};
