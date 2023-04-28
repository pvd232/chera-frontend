import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { v4 as uuid } from 'uuid';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import OrderMealCard from './OrderMealCard';
import LocalStorageManager from '../../../helpers/LocalStorageManager';
import APIClient from '../../../helpers/APIClient';
import ScheduleMeal from '../../../data_models/model/ScheduleMeal';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import SnackCard from './SnackCard';
import SideBar from './SideBar';
import createScheduledOrderMeals from '../helpers/createScheduledOrderMeals';
import getStagedScheduleMealPageData from './helpers/getStagedScheduleMealPageData';

const ClientPreSelectedMenu = (props) => {
  const customTheme = useTheme();
  const [loading, setLoading] = useState(false);

  // Dont want to show error message when page loads
  const [extendedStagedScheduleMeals, setExtendedStagedScheduleMeals] =
    useState([]);
  const [stagedScheduleMealItems, setStagedScheduleMealItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    APIClient.getExtendedStagedScheduleMeals(props.stagedClientId).then(
      (extendedStagedScheduleMealData) => {
        const [extendedStagedScheduleMeals, stagedScheduleMealItems] =
          getStagedScheduleMealPageData(extendedStagedScheduleMealData);
        if (mounted) {
          setExtendedStagedScheduleMeals(extendedStagedScheduleMeals);
          setStagedScheduleMealItems(stagedScheduleMealItems);
        }
      }
    );
  }, [props.stagedClientId]);

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
    const newScheduledOrderMeals = createScheduledOrderMeals(newScheduleMeals);
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
            extendedStagedScheduleMeals={extendedStagedScheduleMeals}
            handleSubmit={handleSubmit}
            customTheme={customTheme}
            loading={loading}
          />
        }
      </Grid>
      {/* Side Bar */}
    </Grid>
  );
};
export default ClientPreSelectedMenu;
