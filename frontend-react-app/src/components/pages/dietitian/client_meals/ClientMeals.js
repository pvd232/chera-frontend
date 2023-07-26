import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ClientMealsTable from "./ClientMealsTable";
import ClientSnacksTable from "./ClientSnacksTable";
import createScheduledOrderMealCardItems from "../../client/client_home/helpers/createScheduledOrderMealCardItems";
import createScheduledOrderSnackCardItems from "../../client/client_home/helpers/createScheduledOrderSnackCardItems";
import refreshScheduledOrderMeals from "../../client/client_home/helpers/refreshScheduledOrderMeals";
import refreshScheduledOrderSnacks from "../../client/client_home/helpers/refreshScheduledOrderSnacks";
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
import ExtendedScheduledOrderSnackDTO from "../../../../data_models/dto/ExtendedScheduledOrderSnackDTO";
import ExtendedScheduledOrderSnack from "../../../../data_models/model/ExtendedScheduledOrderSnack";
import SnackFactory from "../../../../data_models/factories/model/SnackFactory";
import SnackDTOFactory from "../../../../data_models/factories/dto/SnackDTOFactory";

const ClientMeals = (props) => {
  const [filterClient, setFilterClient] = useState(
    props.clients.clientArray ? props.clients.clientArray[0].id : ""
  );

  const [selectedDeliveryIndex, setSelectedDeliveryIndex] = useState(0);
  const [extendedScheduledOrderMeals, setExtendedScheduledOrderMeals] =
    useState([]);

  const [extendedScheduledOrderSnacks, setExtendedScheduledOrderSnacks] =
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

          // Get extended scheduled order snacks
          APIClient.getExtendedScheduledOrderSnacks(mealSubscription.id).then(
            (extendedScheduledOrderSnackData) => {
              const extendedScheduledOrderSnackDTOs =
                extendedScheduledOrderSnackData.map(
                  (json) =>
                    new ExtendedScheduledOrderSnackDTO(
                      json,
                      new SnackDTOFactory()
                    )
                );

              const extendedScheduledOrderSnacks =
                extendedScheduledOrderSnackDTOs.map(
                  (extendedScheduledOrderSnackDTO) =>
                    ExtendedScheduledOrderSnack.constructFromExtendedScheduledOrderSnackDTO(
                      extendedScheduledOrderSnackDTO,
                      new SnackFactory()
                    )
                );
              if (mounted) {
                setExtendedScheduledOrderSnacks(extendedScheduledOrderSnacks);
              }
            }
          );
        }
      );
    }
  }, [filterClient, authHeader]);

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
    const refreshedSnacks = await refreshScheduledOrderSnacks(
      mealSubscription.id
    );
    setExtendedScheduledOrderMeals(refreshedMeals);
    setExtendedScheduledOrderSnacks(refreshedSnacks);
    setSelectedDeliveryIndex(0);
  };

  const handleChangeDeliveryIndex = async (deliveryIndex) => {
    setSelectedDeliveryIndex(deliveryIndex);
    const client = props.clients.clientMap.get(filterClient);
    const mealSubscription = mealSubscriptionsByClientIdMap.get(client.id);
    const refreshedMeals = await refreshScheduledOrderMeals(
      mealSubscription.id
    );
    const refreshedSnacks = await refreshScheduledOrderSnacks(
      mealSubscription.id
    );
    setExtendedScheduledOrderMeals(refreshedMeals);
    setExtendedScheduledOrderSnacks(refreshedSnacks);
  };

  return (
    extendedScheduledOrderMeals.length > 0 &&
    extendedScheduledOrderSnacks.length > 0 && (
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
            handleChangeDeliveryIndex(deliveryIndex)
          }
        />
        <ClientSnacksTable
          currentScheduledOrderSnacks={Array.from(
            createScheduledOrderSnackCardItems(
              extendedScheduledOrderSnacks,
              selectedDeliveryIndex
            ).values()
          )}
        />
      </Grid>
    )
  );
};
export default ClientMeals;
