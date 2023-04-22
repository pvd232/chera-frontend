import { useState, useEffect, cloneElement } from 'react';
import { useSearchParams } from 'react-router-dom';
import APIClient from '../../helpers/APIClient';
import LocalStorageManager from '../../helpers/LocalStorageManager';
import MealPlanDTO from '../../data_models/dto/MealPlanDTO';
import MealPlan from '../../data_models/model/MealPlan';
import ExtendedScheduleMeal from '../../data_models/model/ExtendedScheduleMeal';
import ExtendedScheduleMealDTO from '../../data_models/dto/ExtendedScheduleMealDTO';
import ExtendedStagedClientDTO from '../../data_models/dto/ExtendedStagedClientDTO';
import ExtendedStagedClient from '../../data_models/model/ExtendedStagedClient';
import MealSubscriptionDTO from '../../data_models/dto/MealSubscriptionDTO';
import MealSubscription from '../../data_models/model/MealSubscription';
import ExtendedMeal from '../../data_models/model/ExtendedMeal';
import ExtendedMealDTO from '../../data_models/dto/ExtendedMealDTO';
import ExtendedMealDTOFactory from '../../data_models/factories/dto/ExtendedMealDTOFactory';
import MealDietaryRestrictionDTOFactory from '../../data_models/factories/dto/MealDietaryRestrictionDTOFactory';
import ExtendedMealFactory from '../../data_models/factories/model/ExtendedMealFactory';
import MealDietaryRestrictionFactory from '../../data_models/factories/model/MealDietaryRestrictionFactory';
import ExtendedClientDTO from '../../data_models/dto/ExtendedClientDTO';
import ExtendedClient from '../../data_models/model/ExtendedClient';
import MealPlanDTOFactory from '../../data_models/factories/dto/MealPlanDTOFactory';
import MealPlanFactory from '../../data_models/factories/model/MealPlanFactory';

const DietitianHomeContainer = (props) => {
  const [extendedClients, setExtendedClients] = useState(false);
  const [extendedStagedClients, setExtendedStagedClients] = useState(false);
  const [scheduleMeals, setScheduleMeals] = useState(false);
  const [mealSubscriptions, setMealSubscriptions] = useState(false);
  const [mealPlans, setMealPlans] = useState(false);
  const [extendedMeals, setExtendedMeals] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const [stagedClientId, setStagedClientId] = useState('');

  useEffect(() => {
    let mounted = true;
    APIClient.getExtendedStagedClients(
      LocalStorageManager.shared.dietitian.id
    ).then((extendedStagedClientData) => {
      if (extendedStagedClientData) {
        const extendedStagedClientDTOs = extendedStagedClientData.map(
          (extendedStagedClientJSON) =>
            new ExtendedStagedClientDTO(
              extendedStagedClientJSON,
              new MealPlanDTOFactory()
            )
        );
        // Initializer seperates out MealPlan to accomodate for creation of ExtendedStagedClients in DietitianHome
        const extendedStagedClientItems = extendedStagedClientDTOs.map(
          (extendedStagedClientDTO) =>
            new ExtendedStagedClient(
              extendedStagedClientDTO,
              extendedStagedClientDTO.mealPlan,
              new MealPlanFactory()
            )
        );
        if (mounted) {
          setExtendedStagedClients(extendedStagedClientItems);
        }
      } else {
        setExtendedStagedClients([]);
      }
    });

    APIClient.getExtendedClients(LocalStorageManager.shared.dietitian.id).then(
      (clientData) => {
        if (clientData) {
          const clientArray = [];
          const clientMap = new Map();
          for (const client of clientData) {
            const newClientDTO = new ExtendedClientDTO(
              client,
              new MealPlanDTOFactory()
            );
            const newClient = new ExtendedClient(
              newClientDTO,
              new MealPlanFactory()
            );
            clientArray.push(newClient);
            clientMap.set(newClient.id, newClient);
          }
          if (mounted) {
            setExtendedClients({
              clientArray: clientArray,
              clientMap: clientMap,
            });
          }
        } else {
          setExtendedClients({});
        }
      }
    );
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
    const stagedClientId = searchParams.get('stagedClientId');
    if (stagedClientId) {
      setStagedClientId(stagedClientId);
    }
    return () => (mounted = false);
  }, [props, searchParams]);

  if (
    extendedClients &&
    extendedStagedClients &&
    scheduleMeals &&
    mealSubscriptions &&
    mealPlans
  ) {
    // remove duplicative clients from stagedClients if they have already created their account
    const filteredExtendedStagedClients = extendedStagedClients.filter(
      (stagedClient) =>
        extendedClients.clientArray?.findIndex(
          (client) => client.id === stagedClient.id
        ) === -1
    );
    const dataProps = {
      dietitianId: LocalStorageManager.shared.dietitian.id,
      stripePromise: props.stripePromise,
      paymentConfirmed: props.paymentConfirmed,
      paymentStagedClientId: stagedClientId,
      clients: extendedClients,
      stagedClients: filteredExtendedStagedClients,
      scheduleMeals: scheduleMeals,
      mealSubscriptions: mealSubscriptions,
      mealPlans: mealPlans,
      extendedMeals: extendedMeals,
    };
    // Pass the dataProps to the child component
    return cloneElement(props.childComponent, { dataProps: dataProps });
  } else {
    return <></>;
  }
};
export default DietitianHomeContainer;
