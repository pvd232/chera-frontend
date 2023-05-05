import { useState, useEffect } from 'react';
import APIClient from '../../helpers/APIClient';
import ClientHome from './client_home/ClientHome';
import LocalStorageManager from '../../helpers/LocalStorageManager';
import SnackDTO from '../../data_models/dto/SnackDTO';
import Snack from '../../data_models/model/Snack';
import MealSubscriptionDTO from '../../data_models/dto/MealSubscriptionDTO';
import MealSubscription from '../../data_models/model/MealSubscription';
import ExtendedMeal from '../../data_models/model/ExtendedMeal';
import ExtendedMealDTO from '../../data_models/dto/ExtendedMealDTO';
import MealDietaryRestrictionDTOFactory from '../../data_models/factories/dto/MealDietaryRestrictionDTOFactory';
import MealDietaryRestrictionFactory from '../../data_models/factories/model/MealDietaryRestrictionFactory';

const ClientHomeContainer = () => {
  const [mealSubscription, setMealSubscription] = useState(false);

  const [extendedMeals, setExtendedMeals] = useState(false);
  const [snacks, setSnacks] = useState(false);

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

    // Get all snacks
    APIClient.getSnacks().then((snacksData) => {
      if (mounted) {
        const snackDTOs = snacksData.map((json) => new SnackDTO(json));
        const snacks = snackDTOs.map((snackDTO) => new Snack(snackDTO));
        setSnacks(snacks);
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

  if (mealSubscription && extendedMeals) {
    return (
      <ClientHome
        mealSubscription={mealSubscription}
        snacks={snacks}
        extendedMeals={extendedMeals}
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
