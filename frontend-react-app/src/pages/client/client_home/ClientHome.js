import { useTheme } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import Grid from '@mui/material/Grid';
import ExtendedMealDTOFactory from '../../../data_models/factories/dto/ExtendedMealDTOFactory';
import MealDietaryRestrictionDTOFactory from '../../../data_models/factories/dto/MealDietaryRestrictionDTOFactory';
import ExtendedScheduledOrderMealDTO from '../../../data_models/dto/ExtendedScheduledOrderMealDTO';
import ExtendedScheduledOrderMeal from '../../../data_models/model/ExtendedScheduledOrderMeal';
import ExtendedScheduledOrderSnackDTO from '../../../data_models/dto/ExtendedScheduledOrderSnackDTO';
import ExtendedScheduledOrderSnack from '../../../data_models/model/ExtendedScheduledOrderSnack';
import SnackFactory from '../../../data_models/factories/model/SnackFactory';
import SnackDTOFactory from '../../../data_models/factories/dto/SnackDTOFactory';
import ScheduledOrderMeal from '../../../data_models/model/ScheduledOrderMeal';
import ExtendedMealFactory from '../../../data_models/factories/model/ExtendedMealFactory';
import MealDietaryRestrictionFactory from '../../../data_models/factories/model/MealDietaryRestrictionFactory';
import DeliveryDateUtility from '../../../helpers/DeliveryDateUtility';
import APIClient from '../../../helpers/APIClient';
import DeliveryInfo from './DeliveryInfo';
import CalendarSelector from './CalendarSelector';
import PausedEditDelivery from './PausedEditDelivery';
import CurrentSnacks from './CurrentSnacks';
import CurrentMeals from './CurrentMeals';
import OtherMeals from './OtherMeals';
import getOtherMeals from './helpers/getOtherMeals';
import createScheduledOrderMealCardItems from './helpers/createScheduledOrderMealCardItems';
import createScheduledOrderSnackCardItems from './helpers/createScheduledOrderSnackCardItems';
import getUniqueExtendedMealsMap from './helpers/getUniqueExtendedMealsMap';
import checkIfWeekSkipped from './helpers/checkIfWeekSkipped';
import refreshScheduledOrderMeals from './helpers/refreshScheduledOrderMeals';
import getMealsByDietaryRestrictionMap from './helpers/mealsByDietaryRestrictionMap';
import getMealsByMealTimeMap from './helpers/getMealsByTimeMap';
import ScheduledOrderMealDTO from '../../../data_models/dto/ScheduledOrderMealDTO';
import canMakeChanges from '../helpers/canMakeChanges';

const ClientHome = (props) => {
  const customTheme = useTheme();
  const [netChangeInWeeklyMeals, setNetChangeInWeeklyMeals] = useState(0);
  const [netChangeInWeeklySnacks, setNetChangeInWeeklySnacks] = useState(0);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  // Paused state inherited from parent, but updated locally when the user pauses the subscription
  const [paused, setPaused] = useState(false);
  const [selectedDeliveryIndex, setSelectedDeliveryIndex] = useState(0);

  // This is the list of the client's current scheduled order meals, represented as ClientMealCardData
  const [extendedScheduledOrderMeals, setExtendedScheduledOrderMeals] =
    useState([]);

  const [extendedScheduledOrderSnacks, setExtendedScheduledOrderSnacks] =
    useState([]);

  // WeekSkipped state inherited from parent, but updated locally when the user pauses the subscription

  const [weekSkipped, setWeekSkipped] = useState(
    checkIfWeekSkipped(selectedDeliveryIndex, extendedScheduledOrderMeals)
  );

  const [isFirstDelivery, setIsFirstDelivery] = useState(false);
  const [otherMeals, setOtherMeals] = useState(
    // This function returns all meals that are not in the client's subscription, represented as ExtendedMeal objects
    getOtherMeals(
      // This is a map of all unique meals the client has in their subscription
      getUniqueExtendedMealsMap(extendedScheduledOrderMeals),
      // This is a map of all meals the client can choose from
      props.extendedMeals
    )
  );
  useEffect(() => {
    let mounted = true;
    //  Then get client's scheduled order meals using meal subscription id
    APIClient.getExtendedScheduledOrderMeals(props.mealSubscription.id).then(
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
        const extendedScheduledOrderMeals = extendedScheduledOrderMealDTOs.map(
          (extendedScheduledOrderMealDTO) =>
            ExtendedScheduledOrderMeal.constructFromExtendedScheduledOrderMealDTO(
              extendedScheduledOrderMealDTO,
              new ExtendedMealFactory(new MealDietaryRestrictionFactory())
            )
        );
        if (mounted) {
          setExtendedScheduledOrderMeals(extendedScheduledOrderMeals);
        }
      }
    );

    // Get extended scheduled order snacks
    APIClient.getExtendedScheduledOrderSnacks(props.mealSubscription.id).then(
      (extendedScheduledOrderSnackData) => {
        if (mounted) {
          const extendedScheduledOrderSnackDTOs =
            extendedScheduledOrderSnackData.map(
              (json) =>
                new ExtendedScheduledOrderSnackDTO(json, new SnackDTOFactory())
            );

          const extendedScheduledOrderSnacks =
            extendedScheduledOrderSnackDTOs.map(
              (extendedScheduledOrderSnackDTO) =>
                ExtendedScheduledOrderSnack.constructFromExtendedScheduledOrderSnackDTO(
                  extendedScheduledOrderSnackDTO,
                  new SnackFactory()
                )
            );

          setExtendedScheduledOrderSnacks(extendedScheduledOrderSnacks);
        }
      }
    );
    APIClient.checkIfFirstWeek(props.mealSubscription.id).then(
      (isFirstWeek) => {
        if (mounted) {
          setIsFirstDelivery(isFirstWeek);
        }
      }
    );
    return () => (mounted = false);
  }, [props.mealSubscription.id]);

  const [filterMealTime, setFilterMealTime] = useState('all');
  const [filterMealPreferences, setFilterMealPreferences] = useState('all');

  const mealsByDietaryRestrictionMap = (() => {
    return getMealsByDietaryRestrictionMap(props.extendedMeals);
  })();

  const mealsByMealTimeMap = (() => {
    return getMealsByMealTimeMap(props.extendedMeals);
  })();

  const handleFinishEditing = async () => {
    const refreshedMeals = await refreshScheduledOrderMeals(
      props.mealSubscription.id
    );
    setExtendedScheduledOrderMeals(refreshedMeals);
    setOtherMeals(
      getOtherMeals(
        getUniqueExtendedMealsMap(refreshedMeals),
        props.extendedMeals
      )
    );
    setNetChangeInWeeklyMeals(0);
    setEditing(false);
  };

  const handleAddFromScheduledOrderMealCard = (clientMealCardData) => {
    setEditing(true);

    const newExtendedScheduledOrderMeal =
      ExtendedScheduledOrderMeal.constructNewInstanceFromExtendedScheduledOrderMealDTO(
        uuid(),
        clientMealCardData.extendedScheduledOrderMeal,
        new ExtendedMealFactory(new MealDietaryRestrictionFactory())
      );

    setExtendedScheduledOrderMeals((prevExtendedScheduledOrderMeals) => {
      setNetChangeInWeeklyMeals((prevNum) => (prevNum -= 1));
      return [
        ...prevExtendedScheduledOrderMeals,
        newExtendedScheduledOrderMeal,
      ];
    });
  };
  const handleAddFromScheduledOrderSnackCard = (clientSnackCardData) => {
    setEditing(true);

    const newExtendedScheduledOrderSnack =
      ExtendedScheduledOrderSnack.constructNewInstanceFromExtendedScheduledOrderSnackDTO(
        uuid(),
        clientSnackCardData.extendedScheduledOrderSnack,
        new SnackFactory()
      );

    setExtendedScheduledOrderSnacks((prevExtendedScheduledOrderSnacks) => {
      setNetChangeInWeeklySnacks((prevNum) => (prevNum -= 1));
      return [
        ...prevExtendedScheduledOrderSnacks,
        newExtendedScheduledOrderSnack,
      ];
    });
  };

  const handleRemoveScheduledOrderSnack = (clientMealCardData) => {
    setEditing(true);

    setExtendedScheduledOrderSnacks((prevExtendedScheduledOrderSnacks) => {
      const newExtendedScheduledOrderSnacks =
        prevExtendedScheduledOrderSnacks.filter(
          (extendedScheduledOrderSnack) =>
            extendedScheduledOrderSnack.id !==
            clientMealCardData.extendedScheduledOrderSnack.id
        );
      setOtherMeals(
        getOtherMeals(
          getUniqueExtendedMealsMap(newExtendedScheduledOrderSnacks),
          props.extendedMeals
        )
      );
      return newExtendedScheduledOrderSnacks;
    });
    setNetChangeInWeeklyMeals((prevNum) => (prevNum += 1));
  };

  const handleAddFromOtherMealCard = (extendedMeal) => {
    // ExtendedMeal parameter is an ExtendedMeal object
    setEditing(true);

    const newScheduledOrderMeal = ScheduledOrderMeal.initializeFromMeal(
      extendedMeal.id,
      props.mealSubscription.id,
      DeliveryDateUtility.getDeliveryDateFromIndex(selectedDeliveryIndex)
    );
    const newExtendedScheduledOrderMeal =
      ExtendedScheduledOrderMeal.constructNewInstanceFromScheduledOrderMeal(
        uuid(),
        newScheduledOrderMeal,
        new ExtendedMealFactory(new MealDietaryRestrictionFactory()),
        extendedMeal
      );
    setExtendedScheduledOrderMeals((prevExtendedScheduledOrderMeals) => {
      setOtherMeals(
        getOtherMeals(
          getUniqueExtendedMealsMap([
            ...prevExtendedScheduledOrderMeals,
            newExtendedScheduledOrderMeal,
          ]),
          props.extendedMeals
        )
      );
      return [
        ...prevExtendedScheduledOrderMeals,
        newExtendedScheduledOrderMeal,
      ];
    });
    setNetChangeInWeeklyMeals((prevNum) => (prevNum -= 1));
  };

  const handleRemoveScheduledOrderMeal = (clientMealCardData) => {
    setEditing(true);

    setExtendedScheduledOrderMeals((prevExtendedScheduledOrderMeals) => {
      const newExtendedScheduledOrderMeals =
        prevExtendedScheduledOrderMeals.filter(
          (extendedScheduledOrderMeal) =>
            extendedScheduledOrderMeal.id !==
            clientMealCardData.extendedScheduledOrderMeal.id
        );
      setOtherMeals(
        getOtherMeals(
          getUniqueExtendedMealsMap(newExtendedScheduledOrderMeals),
          props.extendedMeals
        )
      );
      return newExtendedScheduledOrderMeals;
    });
    setNetChangeInWeeklyMeals((prevNum) => (prevNum += 1));
  };

  const handleChangeDeliveryIndex = (deliveryIndex) => {
    setSelectedDeliveryIndex(deliveryIndex);
    setWeekSkipped(
      checkIfWeekSkipped(deliveryIndex, extendedScheduledOrderMeals)
    );
    handleFinishEditing();
  };

  const handleSaveChanges = async () => {
    if (netChangeInWeeklyMeals !== 0 || netChangeInWeeklySnacks !== 0) {
      return;
    }
    setLoading(true);
    await APIClient.updateScheduledOrderMeals(
      extendedScheduledOrderMeals.map((extendedScheduledOrderMeal) =>
        ScheduledOrderMealDTO.initializeFromScheduledOrderMeal(
          extendedScheduledOrderMeal
        )
      )
    );
    setLoading(false);
    setEditing(false);
  };

  const handleSkipWeek = async () => {
    // Get fresh meals from server
    const extendedScheduledOrderMeals = await refreshScheduledOrderMeals(
      props.mealSubscription.id
    );
    setExtendedScheduledOrderMeals(extendedScheduledOrderMeals);
    setWeekSkipped(true);
  };

  const handleUnskipWeek = async () => {
    const extendedScheduledOrderMeals = await refreshScheduledOrderMeals(
      props.mealSubscription.id
    );
    setExtendedScheduledOrderMeals(extendedScheduledOrderMeals);
    setWeekSkipped(false);
  };

  const handleChangeMeals = async () => {
    const newScheduledOrderMeals = await refreshScheduledOrderMeals(
      props.mealSubscription.id
    );
    setExtendedScheduledOrderMeals(newScheduledOrderMeals);
  };

  const handleFilterChange = (event) => {
    const originalOtherMeals = getOtherMeals(
      getUniqueExtendedMealsMap(extendedScheduledOrderMeals),
      props.extendedMeals
    );
    // Meal time filter selected
    if (event.target.name === 'filterMealTime') {
      setFilterMealTime(event.target.value);
      // No meal time filter
      if (event.target.value === 'all') {
        // No meal time and no dietary restriction filter
        if (filterMealPreferences === 'all') {
          setOtherMeals(originalOtherMeals);
        } else {
          // No meal time filter, dietary restriction filter
          const filteredOtherMeals = originalOtherMeals.filter((otherMeal) =>
            mealsByDietaryRestrictionMap
              .get(filterMealPreferences)
              .has(otherMeal.id)
          );
          setOtherMeals(filteredOtherMeals);
        }
      } else {
        // Meal time filter
        if (filterMealPreferences === 'all') {
          // Meal time filter, no dietary restriction filter
          const filteredOtherMeals = originalOtherMeals.filter((otherMeal) =>
            mealsByMealTimeMap.get(event.target.value).has(otherMeal.id)
          );
          setOtherMeals(filteredOtherMeals);
        } else {
          const timeFilteredOtherMeals = originalOtherMeals.filter(
            (otherMeal) =>
              mealsByMealTimeMap.get(event.target.value).has(otherMeal.id)
          );
          const filteredOtherMeals = timeFilteredOtherMeals.filter(
            (otherMeal) =>
              mealsByDietaryRestrictionMap
                .get(filterMealPreferences)
                .has(otherMeal.id)
          );
          // Meal time and dietary restriction filter
          setOtherMeals(filteredOtherMeals);
        }
      }
    }
    // Dietary restriction filter selected
    else {
      setFilterMealPreferences(event.target.value);
      // No dietary restriction filter
      if (event.target.value === 'all') {
        // No dietary restriction nor meal time filter
        if (filterMealTime === 'all') {
          setOtherMeals(originalOtherMeals);
        } else {
          // No dietary restriction filter, meal time filter
          const filteredOtherMeals = originalOtherMeals.filter((otherMeal) =>
            mealsByMealTimeMap.get(filterMealTime).has(otherMeal.id)
          );
          setOtherMeals(filteredOtherMeals);
        }
      } else {
        // Dietary restriction filter
        if (filterMealTime === 'all') {
          // Dietary restriction filter and no meal time filter
          const filteredOtherMeals = originalOtherMeals.filter((otherMeal) =>
            mealsByDietaryRestrictionMap
              .get(event.target.value)
              .has(otherMeal.id)
          );
          setOtherMeals(filteredOtherMeals);
        } else {
          // Dietary restriction and meal time filter
          const timeFilteredOtherMeals = originalOtherMeals.filter(
            (otherMeal) =>
              mealsByMealTimeMap.get(filterMealTime).has(otherMeal.id)
          );
          const filteredOtherMeals = timeFilteredOtherMeals.filter(
            (otherMeal) =>
              mealsByDietaryRestrictionMap
                .get(event.target.value)
                .has(otherMeal.id)
          );
          setOtherMeals(filteredOtherMeals);
        }
      }
    }
  };
  return (
    extendedScheduledOrderMeals.length > 0 && (
      <Grid container justifyContent={'center'} py={3}>
        {paused || weekSkipped ? (
          <>
            <CalendarSelector
              selectedDeliveryIndex={
                !paused ? selectedDeliveryIndex : undefined
              }
              customTheme={customTheme}
              handleChangeDeliveryIndex={(deliveryIndex) =>
                handleChangeDeliveryIndex(deliveryIndex)
              }
            />
            <PausedEditDelivery
              customTheme={customTheme}
              extendedScheduledOrderMeals={extendedScheduledOrderMeals}
              mealSubscription={props.mealSubscription}
              mealsPerWeek={extendedScheduledOrderMeals.length / 4}
              selectedDeliveryIndex={selectedDeliveryIndex}
              // Paused state must be passed directly as a prop to trigger a re-render
              paused={paused}
              weekSkipped={weekSkipped}
              skipWeek={handleSkipWeek}
              unskipWeek={() => {
                handleUnskipWeek(
                  DeliveryDateUtility.getDeliveryDateFromIndex(
                    selectedDeliveryIndex
                  ).getTime() / 1000
                );
              }}
              pauseMealSubscription={() => {
                props.pauseMealSubscription();
                // Update the state to trigger a re-render
                setPaused(props.mealSubscription.paused);
              }}
              unpauseMealSubscription={() => {
                props.unpauseMealSubscription();
                setPaused(props.mealSubscription.paused);
              }}
            ></PausedEditDelivery>
          </>
        ) : (
          <>
            <CalendarSelector
              selectedDeliveryIndex={selectedDeliveryIndex}
              customTheme={customTheme}
              handleChangeDeliveryIndex={(deliveryIndex) =>
                handleChangeDeliveryIndex(deliveryIndex)
              }
            />
            <DeliveryInfo
              loading={loading}
              customTheme={customTheme}
              mealSubscription={props.mealSubscription}
              extendedMeals={props.extendedMeals}
              weekSkipped={weekSkipped}
              extendedScheduledOrderMeals={extendedScheduledOrderMeals}
              netChangeInWeeklyMeals={netChangeInWeeklyMeals}
              editing={editing}
              selectedDeliveryIndex={selectedDeliveryIndex}
              handleFinishEditing={handleFinishEditing}
              handleSaveChanges={handleSaveChanges}
              handleChangeDeliveryIndex={(deliveryIndex) =>
                handleChangeDeliveryIndex(deliveryIndex)
              }
              skipWeek={handleSkipWeek}
              unskipWeek={handleUnskipWeek}
              pauseMealSubscription={() => {
                props.pauseMealSubscription();
                setPaused(true);
              }}
              unpauseMealSubscription={() => {
                props.unpauseMealSubscription();
                setPaused(false);
              }}
              handleChangeMeals={handleChangeMeals}
            ></DeliveryInfo>
            <CurrentMeals
              customTheme={customTheme}
              currentScheduledOrderMeals={Array.from(
                createScheduledOrderMealCardItems(
                  extendedScheduledOrderMeals,
                  selectedDeliveryIndex
                ).values()
              )}
              handleAddScheduledOrderMeal={(item) =>
                handleAddFromScheduledOrderMealCard(item)
              }
              handleRemoveScheduledOrderMeal={(meal) =>
                handleRemoveScheduledOrderMeal(meal)
              }
              cantMakeChanges={
                selectedDeliveryIndex === 0 &&
                (isFirstDelivery || !canMakeChanges(selectedDeliveryIndex))
              }
              isFirstDelivery={isFirstDelivery}
            />
            {extendedScheduledOrderSnacks.length > 0 && (
              <CurrentSnacks
                customTheme={customTheme}
                currentScheduledOrderSnacks={Array.from(
                  createScheduledOrderSnackCardItems(
                    extendedScheduledOrderSnacks,
                    selectedDeliveryIndex
                  ).values()
                )}
                handleAddScheduledOrderSnack={(item) =>
                  handleAddFromScheduledOrderSnackCard(item)
                }
                handleRemoveScheduledOrderSnack={(snack) =>
                  handleRemoveScheduledOrderSnack(snack)
                }
                cantMakeChanges={
                  selectedDeliveryIndex === 0 &&
                  (isFirstDelivery || !canMakeChanges(selectedDeliveryIndex))
                }
                isFirstDelivery={isFirstDelivery}
              />
            )}
            <OtherMeals
              customTheme={customTheme}
              otherMeals={otherMeals}
              filterMealTime={filterMealTime}
              filterMealPreferences={filterMealPreferences}
              handleFilterChange={handleFilterChange}
              handleAddScheduledOrderMeal={(newScheduledOrderMeal) =>
                handleAddFromOtherMealCard(newScheduledOrderMeal)
              }
            ></OtherMeals>
          </>
        )}
      </Grid>
    )
  );
};
export default ClientHome;
