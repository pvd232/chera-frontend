import { v4 as uuid } from 'uuid';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LocalStorageManager from '../../../../helpers/LocalStorageManager';
import APIClient from '../../../../helpers/APIClient';
import ScheduleMeal from '../../../../data_models/model/ScheduleMeal';
import createScheduledOrderMeals from '../helpers/createScheduledOrderMeals';
import getStagedScheduleMealPageData from './helpers/getStagedScheduleMealPageData';
import SnackCard from './SnackCard';
import SideBar from './SideBar';
import OrderMealCard from './OrderMealCard';
import useAuthHeader from '../../../../helpers/useAuthHeader';


const ClientPreSelectedMenu = (props) => {
  const customTheme = useTheme();
  const [loading, setLoading] = useState(false);
  const authHeader = useAuthHeader();

  // Dont want to show error message when page loads
  const [extendedStagedScheduleMeals, setExtendedStagedScheduleMeals] =
    useState([]);
  const [stagedScheduleMealItems, setStagedScheduleMealItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    if(authHeader){
      APIClient.getExtendedStagedScheduleMeals(props.stagedClientId, authHeader).then(
        (extendedStagedScheduleMealData) => {
          const [extendedStagedScheduleMeals, stagedScheduleMealItems] =
            getStagedScheduleMealPageData(extendedStagedScheduleMealData);
          if (mounted) {
            setExtendedStagedScheduleMeals(extendedStagedScheduleMeals);
            setStagedScheduleMealItems(stagedScheduleMealItems);
          }
        }
      );
    }
  }, [props.stagedClientId, authHeader]);

  const timer = useRef();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleSubmit = async () => {
    if (!loading) {
      setLoading(true);
    }
    const newScheduleMeals = extendedStagedScheduleMeals.map(
      (stagedScheduleMeal) =>
        ScheduleMeal.initializeFromStagedScheduleMeal(
          uuid(),
          stagedScheduleMeal
        )
    );
    const newScheduledOrderMeals = createScheduledOrderMeals(
      newScheduleMeals,
      true
    );
    timer.current = window.setTimeout(() => {
      setLoading(false);
      LocalStorageManager.shared.taskIndex += 1;
      props.updateMealsData(newScheduleMeals, newScheduledOrderMeals);
    }, 500);
  };

  return (
    <Grid
      container
      item
      md={8.5}
      lg={9.5}
      xs={12}
      columnSpacing={4}
      marginBottom={customTheme.smallerScreen() ? '6vh' : ''}
      justifyContent={'center'}
    >
      <Grid
        item
        container
        spacing={2}
        sx={{ height: 'min-content' }}
        marginBottom="5vh"
      >
        <Grid item container justifyContent={'flex-start'}>
          <Typography
            fontSize={'1.5rem'}
            textAlign={'center'}
            marginBottom={'2vh'}
            marginTop={'2vh'}
          >
            Meals
          </Typography>
        </Grid>
        {stagedScheduleMealItems.length > 0 &&
          stagedScheduleMealItems.map((stagedScheduleMealItem, i) => (
            <Grid item key={`mealGridItem${i}`} md={5.5} lg={4}>
              {OrderMealCard({
                key: `mealMediaCard${i}`,
                mealData: stagedScheduleMealItem.associatedMeal,
                displayMealButtons: false,
              })}
            </Grid>
          ))}
      </Grid>
      {/* Meals Cards */}
      {/* Snack Cards */}
      <Grid item container justifyContent={'flex-start'}>
        <Grid item></Grid>
        <Typography
          fontSize={'1.5rem'}
          textAlign={'center'}
          marginBottom={'5vh'}
          marginTop={'2vh'}
        >
          Snacks
        </Typography>
        <Grid item>
          <Tooltip
            title="Optional, ordered in quantities of 2"
            placement="right"
          >
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container item spacing={7}>
        {props.snacks.map((snack, i) => (
          <Grid item key={`snackGridItem${i}`} md={4}>
            {SnackCard({
              key: `snackMediaCard${i}`,
              snack: snack,
              index: i,
            })}
          </Grid>
        ))}
      </Grid>
      {/* Snack Cards */}

      {/* Side Bar */}
      <Grid item lg={2.5} md={3.5} xs={12} sx={{ marginTop: '0vh' }}>
        {
          <SideBar
            chosenScheduleMeals={extendedStagedScheduleMeals}
            chosenScheduleSnacks={[]}
            handleSubmit={handleSubmit}
            customTheme={customTheme}
            loading={loading}
            cogs={props.cogs}
            shippingRate={props.shippingRate}
          />
        }
      </Grid>
      {/* Side Bar */}
    </Grid>
  );
};
export default ClientPreSelectedMenu;
