import { useEffect, useState, cloneElement } from 'react';
import Grid from '@mui/material/Grid';
import APIClient from '../../../../helpers/APIClient';
import MealDietaryRestrictionFactory from '../../../../data_models/factories/model/MealDietaryRestrictionFactory';
import MealDietaryRestrictionDTOFactory from '../../../../data_models/factories/dto/MealDietaryRestrictionDTOFactory';
import StagedClientDTO from '../../../../data_models/dto/StagedClientDTO';
import ExtendedMealDTO from '../../../../data_models/dto/ExtendedMealDTO';
import ExtendedMeal from '../../../../data_models/model/ExtendedMeal';
import SnackDTO from '../../../../data_models/dto/SnackDTO';
import Snack from '../../../../data_models/model/Snack';
import LocalStorageManager from '../../../../helpers/LocalStorageManager';
import TaskBarItem from './TaskBarItem';
import TaskBarLine from './TaskBarLine';

const TaskBar = (props) => {
  const [extendedMeals, setExtendedMeals] = useState(false);
  const [snacks, setSnacks] = useState(false);
  const [shippingCost, setShippingCost] = useState(false);
  const [stagedClient, setStagedClient] = useState(false);
  const [taskIndex, setTaskIndex] = useState(0);

  useEffect(() => {
    let mounted = true;

    APIClient.getShippingCost().then((shippingCost) => {
      if (mounted) {
        setShippingCost(shippingCost);
      }
    });
    APIClient.getExtendedMeals().then((extendedMeals) => {
      if (mounted) {
        const extendedMealArray = [];
        for (const extendedMeal of extendedMeals) {
          const newExtendedMealDTO = new ExtendedMealDTO(
            extendedMeal,
            new MealDietaryRestrictionDTOFactory()
          );
          const newExtendedMeal = new ExtendedMeal(
            newExtendedMealDTO,
            new MealDietaryRestrictionFactory()
          );
          extendedMealArray.push(newExtendedMeal);
        }
        setExtendedMeals(extendedMealArray);
      }
    });
    APIClient.getSnacks().then((snacks) => {
      if (mounted) {
        const snackArray = [];
        for (const snack of snacks) {
          const newSnackDTO = new SnackDTO(snack);
          const newSnack = new Snack(newSnackDTO);
          snackArray.push(newSnack);
        }
        setSnacks(snackArray);
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
    if (window.location.href.includes('staged_client_id')) {
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
      let stagedClientId = params.staged_client_id; // "some_value"
      APIClient.getStagedClient(stagedClientId).then((stagedClientData) => {
        const returnedStagedClient = new StagedClientDTO(stagedClientData);
        // If client account was already created then get values created during previous incompleted registration
        if (returnedStagedClient.accountCreated) {
          window.location.assign('client-login');
        } else {
          if (mounted) {
            setStagedClient(returnedStagedClient);
          }
        }
      });
    }
    return () => (mounted = false);
  }, []);

  if (stagedClient && extendedMeals && snacks) {
    const signupProps = {
      extendedMeals: extendedMeals,
      snacks: snacks,
      stagedClient: stagedClient,
      shippingCost: shippingCost,
      stripePromise: props.stripePromise,
      updateTaskIndex: (newTaskIndex) => setTaskIndex(newTaskIndex),
      taskIndex: taskIndex,
    };
    return (
      <Grid
        container
        sx={{
          position: 'relative',
        }}
      >
        <Grid
          container
          sx={{
            minHeight: '100vh',
            position: 'absolute',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Grid
            container
            justifyContent={'center'}
            alignItems={'center'}
            paddingTop={'3vh'}
            paddingBottom={'2vh'}
            // paddingLeft={'2vw'}
            // paddingRight={'2vw'}
            height={'13vh'}
          >
            <Grid
              container
              item
              xs={10}
              md={6}
              lg={4}
              justifyContent={'space-between'}
            >
              <TaskBarItem
                symbolName={'person_outlined'}
                text={'Register'}
                index={0}
                taskIndex={taskIndex}
              />
              <TaskBarLine index={0} taskIndex={taskIndex} />
              <TaskBarItem
                symbolName={'dinner_dining_outlined'}
                text={'Pick meals'}
                index={1}
                taskIndex={taskIndex}
              />

              <TaskBarLine index={1} taskIndex={taskIndex} />
              <TaskBarItem
                symbolName={'shopping_cart_outlined'}
                text={'Checkout'}
                index={2}
                taskIndex={taskIndex}
              />
              <TaskBarLine index={2} taskIndex={taskIndex} />
              <TaskBarItem
                symbolName={'payment'}
                text={'Payment'}
                index={3}
                taskIndex={taskIndex}
              />
            </Grid>
          </Grid>

          <Grid
            container
            item
            sx={{
              width: '100%',
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {cloneElement(props.childComponent, { ...signupProps })}
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return <></>;
  }
};
export default TaskBar;
