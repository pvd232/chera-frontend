import { useState, useEffect } from 'react';
import APIClient from '../../helpers/APIClient';
import ClientHome from './client_home/ClientHome';
import LocalStorageManager from '../../helpers/LocalStorageManager';
import MealSubscriptionDTO from '../../data_models/dto/MealSubscriptionDTO';
import MealSubscription from '../../data_models/model/MealSubscription';
import ExtendedMeal from '../../data_models/model/ExtendedMeal';
import ExtendedMealFactory from '../../data_models/factories/model/ExtendedMealFactory';
import ExtendedMealDTO from '../../data_models/dto/ExtendedMealDTO';
import ExtendedMealDTOFactory from '../../data_models/factories/dto/ExtendedMealDTOFactory';
import MealDietaryRestrictionDTOFactory from '../../data_models/factories/dto/MealDietaryRestrictionDTOFactory';
import ExtendedScheduledOrderMeal from '../../data_models/model/ExtendedScheduledOrderMeal';
import ExtendedScheduledOrderMealDTO from '../../data_models/dto/ExtendedScheduledOrderMealDTO';
import MealDietaryRestrictionFactory from '../../data_models/factories/model/MealDietaryRestrictionFactory';
import refreshScheduledOrderMeals from './client_home/helpers/refreshScheduledOrderMeals';
const ClientHomeContainer = () => {
  const [mealSubscription, setMealSubscription] = useState(false);
  const [extendedScheduledOrderMeals, setExtendedScheduledOrderMeals] =
    useState(false);
  const [extendedMeals, setExtendedMeals] = useState(false);
  useEffect(() => {
    let mounted = true;

    //  First get client's meal subscription
    APIClient.getClientMealSubscription(
      LocalStorageManager.shared.client.id
    ).then((mealSubscriptionJSON) => {
      const mealSubscriptionDTO = new MealSubscriptionDTO(mealSubscriptionJSON);
      const mealSubscription = new MealSubscription(mealSubscriptionDTO);
      LocalStorageManager.shared.clientMealSubscription = mealSubscription;
      setMealSubscription(mealSubscription);

      //  Then get client's scheduled order meals using meal subscription id
      APIClient.getExtendedScheduledOrderMeals(mealSubscription.id).then(
        (extendedScheduledOrderMealsData) => {
          const extendedScheduledOrderMealDTOs =
            extendedScheduledOrderMealsData.map(
              (json) =>
                new ExtendedScheduledOrderMealDTO(
                  json,
                  new ExtendedMealDTOFactory(
                    new MealDietaryRestrictionDTOFactory()
                  )
                )
            );
          const extendedScheduledOrderMeals =
            extendedScheduledOrderMealDTOs.map(
              (extendedScheduledOrderMealDTO) =>
                ExtendedScheduledOrderMeal.constructFromExtendedScheduledOrderMealDTO(
                  extendedScheduledOrderMealDTO,
                  new ExtendedMealFactory(new MealDietaryRestrictionFactory())
                )
            );

          setExtendedScheduledOrderMeals(extendedScheduledOrderMeals);
        }
      );
    });
    // Get all meals, irrespective of meal subscription thread
    APIClient.getExtendedMeals().then((extendedMealsData) => {
      if (mounted) {
        const extendedMealDTOs = extendedMealsData.map(
          (json) =>
            new ExtendedMealDTO(json, new MealDietaryRestrictionDTOFactory())
        );
        const extendedMeals = extendedMealDTOs.map(
          (extendedMealDTO) =>
            new ExtendedMeal(
              extendedMealDTO,
              new MealDietaryRestrictionFactory()
            )
        );
        setExtendedMeals(extendedMeals);
      }
    });
    APIClient.getCurrentWeekDeliveryandCutoffDates().then((data) => {
      const upcomingDeliveryDatesArray = data.upcoming_delivery_dates.map(
        (date) => parseFloat(date) * 1000
      );
      LocalStorageManager.shared.upcomingDeliveryDates =
        upcomingDeliveryDatesArray;
      const upcomingCutoffDatesArray = data.upcoming_cutoff_dates.map(
        (date) => parseFloat(date) * 1000
      );
      LocalStorageManager.shared.upcomingCutoffDates = upcomingCutoffDatesArray;
    });
    return () => (mounted = false);
  }, []);
  const handleSkipWeek = async () => {
    const extendedScheduledOrderMeals = await refreshScheduledOrderMeals(
      mealSubscription.id
    );
    setExtendedScheduledOrderMeals(extendedScheduledOrderMeals);
    return;
  };
  const handleUnskipWeek = async () => {
    const extendedScheduledOrderMeals = await refreshScheduledOrderMeals(
      mealSubscription.id
    );
    setExtendedScheduledOrderMeals(extendedScheduledOrderMeals);
    setExtendedScheduledOrderMeals(extendedScheduledOrderMeals);
    return;
  };
  const handleChangeMeals = async () => {
    const extendedScheduledOrderMeals = refreshScheduledOrderMeals(
      mealSubscription.id
    );
    setExtendedScheduledOrderMeals(extendedScheduledOrderMeals);
  };
  if (mealSubscription && extendedScheduledOrderMeals && extendedMeals) {
    return (
      <ClientHome
        mealSubscription={mealSubscription}
        extendedMeals={extendedMeals}
        extendedScheduledOrderMeals={extendedScheduledOrderMeals}
        handleChangeMeals={() => handleChangeMeals()}
        skipWeek={() => handleSkipWeek()}
        unskipWeek={() => handleUnskipWeek()}
        pauseMealSubscription={() => {
          setMealSubscription((prevState) => {
            prevState.paused = true;
            return prevState;
          });
        }}
        unpauseMealSubscription={() => {
          setMealSubscription((prevState) => {
            prevState.paused = false;
            return prevState;
          });
        }}
      ></ClientHome>
    );
  } else {
    return <></>;
  }
};
export default ClientHomeContainer;
