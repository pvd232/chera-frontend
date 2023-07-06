import { useState, useEffect, cloneElement } from 'react';
import { useSearchParams } from 'react-router-dom';
import APIClient from '../../../helpers/APIClient';
import LocalStorageManager from '../../../helpers/LocalStorageManager';
import MealPlanDTO from '../../../data_models/dto/MealPlanDTO';
import MealPlan from '../../../data_models/model/MealPlan';
import ExtendedScheduleMeal from '../../../data_models/model/ExtendedScheduleMeal';
import ExtendedScheduleMealDTO from '../../../data_models/dto/ExtendedScheduleMealDTO';
import MealSubscriptionDTO from '../../../data_models/dto/MealSubscriptionDTO';
import MealSubscription from '../../../data_models/model/MealSubscription';
import ExtendedMeal from '../../../data_models/model/ExtendedMeal';
import ExtendedMealDTO from '../../../data_models/dto/ExtendedMealDTO';
import SnackDTO from '../../../data_models/dto/SnackDTO';
import Snack from '../../../data_models/model/Snack';
import ExtendedMealDTOFactory from '../../../data_models/factories/dto/ExtendedMealDTOFactory';
import MealDietaryRestrictionDTOFactory from '../../../data_models/factories/dto/MealDietaryRestrictionDTOFactory';
import ExtendedMealFactory from '../../../data_models/factories/model/ExtendedMealFactory';
import MealDietaryRestrictionFactory from '../../../data_models/factories/model/MealDietaryRestrictionFactory';

const DietitianHomeContainer = (props) => {
  const [scheduleMeals, setScheduleMeals] = useState(false);
  const [mealSubscriptions, setMealSubscriptions] = useState(false);
  const [mealPlans, setMealPlans] = useState(false);
  // const [eatingDisorders, setEatingDisorders] = useState(false);
  const [extendedMeals, setExtendedMeals] = useState(false);
  const [snacks, setSnacks] = useState(false);

  const searchParams = useSearchParams()[0];
  const [stagedClientId, setStagedClientId] = useState('');

  useEffect(() => {
    let mounted = true;
    APIClient.getDietitianExtendedScheduleMeals(
      LocalStorageManager.shared.dietitian.id
    ).then((extendedScheduleMealsData) => {
      if (extendedScheduleMealsData) {
        const extendedScheduleMealArray = [];
        for (const extendedScheduleMeal of extendedScheduleMealsData) {
          const newExtendedScheduleMealDTO = new ExtendedScheduleMealDTO(
            extendedScheduleMeal,
            new ExtendedMealDTOFactory(new MealDietaryRestrictionDTOFactory())
          );
          const newExtendedScheduleMeal =
            ExtendedScheduleMeal.constructFromExtendedScheduleMealDTO(
              newExtendedScheduleMealDTO,
              new ExtendedMealFactory(new MealDietaryRestrictionFactory())
            );
          extendedScheduleMealArray.push(newExtendedScheduleMeal);
        }
        if (mounted) {
          setScheduleMeals(extendedScheduleMealArray);
        }
      } else {
        setScheduleMeals([]);
      }
    });
    APIClient.getDietitianMealSubscriptions(
      LocalStorageManager.shared.dietitian.id
    ).then((mealSubscriptionData) => {
      if (mealSubscriptionData) {
        const mealSubscriptionsMap = new Map();

        mealSubscriptionData
          .map(
            (mealSubscriptionJSON) =>
              new MealSubscriptionDTO(mealSubscriptionJSON)
          )
          .forEach((mealSubscriptionDTO) => {
            const mealSubscription = new MealSubscription(mealSubscriptionDTO);
            mealSubscriptionsMap.set(mealSubscription.id, mealSubscription);
          });
        if (mounted) {
          setMealSubscriptions(mealSubscriptionsMap);
        }
      } else {
        setMealSubscriptions([]);
      }
    });
    // APIClient.getEatingDisorders().then((eatingDisordersData) => {
    //   if (mounted) {
    //     const eatingDisorderDTOs = eatingDisordersData.map(
    //       (eatingDisorderData) => new EatingDisorderDTO(eatingDisorderData)
    //     );
    //     const eatingDisorders = eatingDisorderDTOs.map(
    //       (eatingDisorderDTO) => new EatingDisorder(eatingDisorderDTO)
    //     );
    //     setEatingDisorders(eatingDisorders);
    //   }
    // });
    APIClient.getMealPlans().then((mealPlansData) => {
      if (mounted) {
        const mealPlanDTOs = mealPlansData.map(
          (mealPlanData) => new MealPlanDTO(mealPlanData)
        );
        const mealPlansMap = new Map();
        const mealPlansArray = mealPlanDTOs.map((mealPlanDTO) => {
          const newMealPlan = new MealPlan(mealPlanDTO);
          mealPlansMap.set(mealPlanDTO.id, newMealPlan);
          return newMealPlan;
        });

        setMealPlans({
          mealPlansMap: mealPlansMap,
          mealPlansArray: mealPlansArray,
        });
      }
    });
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
    const stagedClientId = searchParams.get('stagedClientId');
    if (stagedClientId) {
      setStagedClientId(stagedClientId);
    }
    return () => (mounted = false);
  }, [props, searchParams]);

  if (scheduleMeals && mealSubscriptions && mealPlans) {
    // Remove duplicative clients from stagedClients if they have already created their account

    const dataProps = {
      dietitianId: LocalStorageManager.shared.dietitian.id,
      stripePromise: props.stripePromise,
      paymentConfirmed: props.paymentConfirmed,
      paymentStagedClientId: stagedClientId,
      scheduleMeals: scheduleMeals,
      mealSubscriptions: mealSubscriptions,
      mealPlans: mealPlans,
      // eatingDisorders: eatingDisorders,
      extendedMeals: extendedMeals,
      snacks: snacks,
    };
    // Pass the dataProps to the child component
    return cloneElement(props.childComponent, { ...dataProps });
  } else {
    return <></>;
  }
};
export default DietitianHomeContainer;
