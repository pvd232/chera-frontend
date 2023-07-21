import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ClientMealsTable from "./ClientMealsTable";
import createScheduleMealCardItems from "./helpers/createScheduleMealCardItems";
import createScheduledOrderMealCardItems from "../../client/client_home/helpers/createScheduledOrderMealCardItems";
import refreshScheduledOrderMeals from '../../client/client_home/helpers/refreshScheduledOrderMeals';
import clientMeals from "./scss/ClientMeals.module.scss";
import APIClient from "../../../../helpers/APIClient";
import ExtendedScheduledOrderMealDTO from "../../../../data_models/dto/ExtendedScheduledOrderMealDTO";
import ExtendedMealDTOFactory from "../../../../data_models/factories/dto/ExtendedMealDTOFactory";
import MealDietaryRestrictionDTOFactory from "../../../../data_models/factories/dto/MealDietaryRestrictionDTOFactory";
import ExtendedScheduledOrderMeal from "../../../../data_models/model/ExtendedScheduledOrderMeal";
import ExtendedMealFactory from "../../../../data_models/factories/model/ExtendedMealFactory";
import MealDietaryRestrictionFactory from "../../../../data_models/factories/model/MealDietaryRestrictionFactory";
import MealSubscriptionDTO from "../../../../data_models/dto/MealSubscriptionDTO";
import MealSubscription from "../../../../data_models/model/MealSubscription";
import useAuthHeader from "../../../../helpers/useAuthHeader";

const ClientMeals = (props) => {
  const [filterClient, setFilterClient] = useState(
    props.clients.clientArray ? props.clients.clientArray[0].id : ""
  );

  const [scheduleMealCardItems, setScheduleMealCardItems] = useState([]);
  const [selectedDeliveryIndex, setSelectedDeliveryIndex] = useState(0);
  const [extendedScheduledOrderMeals, setExtendedScheduledOrderMeals] =
    useState([]);

  const authHeader = useAuthHeader();

  useEffect(() => {
    let mounted = true;
    if (authHeader && filterClient) {
      // Fetch mealSubscription first
      APIClient.getClientMealSubscription(filterClient, authHeader).then(
        (mealSubscriptionJSON) => {
          const mealSubscriptionDTO = new MealSubscriptionDTO(
            mealSubscriptionJSON
          );
          const mealSubscription = new MealSubscription(mealSubscriptionDTO);

          // Once we have mealSubscription, fetch extendedScheduledOrderMeals
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
                      new ExtendedMealFactory(
                        new MealDietaryRestrictionFactory()
                      )
                    )
                );
              if (mounted) {
                setExtendedScheduledOrderMeals(extendedScheduledOrderMeals);
              }
            }
          );
        }
      );
    }
  }, [filterClient, authHeader]);

  

  const scheduleMealsByMealSubscriptionMap = (() => {
    const map = new Map();
    props.scheduleMeals.forEach((extendedScheduleMeal) => {
      if (map.has(extendedScheduleMeal.mealSubscriptionId)) {
        map
          .get(extendedScheduleMeal.mealSubscriptionId)
          .push(extendedScheduleMeal);
      } else {
        map.set(extendedScheduleMeal.mealSubscriptionId, [
          extendedScheduleMeal,
        ]);
      }
    });
    return map;
  })();

  const mealSubscriptionsByClientIdMap = (() => {
    const map = new Map();
    props.mealSubscriptions.forEach((mealSubscription) => {
      map.set(mealSubscription.clientId, mealSubscription);
    });
    return map;
  })();

  const handleFilterChange = async (event) => {
    // nesting the dependent state object' setState function works! nesting is based on dependency order ie., everything is dependent on client filter, which filters meals that are entered into mealSubscription filter which filters schedule meals
    setFilterClient(event.target.value);
    const client = props.clients.clientMap.get(event.target.value);
    const mealSubscription = mealSubscriptionsByClientIdMap.get(client.id);
    const refreshedMeals = await refreshScheduledOrderMeals(
      mealSubscription.id
    );
    setExtendedScheduledOrderMeals(refreshedMeals);
    /*setScheduleMealCardItems(() => {
      if (event.target.value !== "all") {
        const client = props.clients.clientMap.get(event.target.value);
        const mealSubscription = mealSubscriptionsByClientIdMap.get(client.id);
        return createScheduleMealCardItems(
          scheduleMealsByMealSubscriptionMap.get(mealSubscription.id)
        );
      } else {
        return createScheduleMealCardItems(props.scheduleMeals);
      }
    });*/
  };

  return (
    extendedScheduledOrderMeals.length > 0 &&(
    <Grid container item xs={10} className={clientMeals.pageContainer}>
      <ClientMealsTable
        clients={props.clients?.clientArray ?? []}
        filterClient={filterClient}
        selectedDeliveryIndex={selectedDeliveryIndex}
        currentScheduledOrderMeals={Array.from(
          createScheduledOrderMealCardItems(
            extendedScheduledOrderMeals,
            selectedDeliveryIndex
          ).values()
        )}
        handleFilterChange={(e) => handleFilterChange(e)}
        handleChangeDeliveryIndex={(deliveryIndex) =>
          setSelectedDeliveryIndex(deliveryIndex)
        }
      />
    </Grid>
    )
  );
};
export default ClientMeals;
