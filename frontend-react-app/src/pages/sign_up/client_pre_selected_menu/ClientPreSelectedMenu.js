import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { v4 as uuid } from 'uuid';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ExtendedStagedScheduleMeal from '../../../data_models/model/ExtendedStagedScheduleMeal';
import ExtendedMealDTOFactory from '../../../data_models/factories/dto/ExtendedMealDTOFactory';
import MealDietaryRestrictionDTOFactory from '../../../data_models/factories/dto/MealDietaryRestrictionDTOFactory';
import ExtendedMealFactory from '../../../data_models/factories/model/ExtendedMealFactory';
import MealDietaryRestrictionFactory from '../../../data_models/factories/model/MealDietaryRestrictionFactory';
import OrderMealCard from '../../../reusable_ui_components/OrderMealCard';
import LocalStorageManager from '../../../helpers/LocalStorageManager';
import APIClient from '../../../helpers/APIClient';
import StagedScheduleMealItem from '../../../ui_data_containers/StagedScheduleMealItem';
import ScheduleMeal from '../../../data_models/model/ScheduleMeal';
import SideBar from '../client_menu/SideBar';
import createScheduledOrderMeals from '../helpers/createScheduledOrderMeals';

const ClientPreSelectedMenu = (props) => {
  const customTheme = useTheme();
  const [loading, setLoading] = useState(false);
  // dont want to show error message when page loads
  const [extendedStagedScheduleMeals, setExtendedStagedScheduleMeals] =
    useState([]);
  const [stagedScheduleMealItems, setStagedScheduleMealItems] = useState([]);
  useEffect(() => {
    let mounted = true;
    APIClient.getExtendedStagedScheduleMeals(props.stagedClientId).then(
      (extendedStagedScheduleMealData) => {
        if (mounted) {
          const extendedStagedScheduleMealDTOs =
            extendedStagedScheduleMealData.map(
              (extendedStagedScheduleMeal) =>
                new ExtendedStagedScheduleMeal(
                  extendedStagedScheduleMeal,
                  new ExtendedMealDTOFactory(
                    new MealDietaryRestrictionDTOFactory()
                  )
                )
            );
          const extendedStagedScheduleMeals =
            extendedStagedScheduleMealDTOs.map(
              (extendedStagedScheduleMealDTO) => {
                return new ExtendedStagedScheduleMeal(
                  extendedStagedScheduleMealDTO,
                  new ExtendedMealFactory(new MealDietaryRestrictionFactory())
                );
              }
            );
          setExtendedStagedScheduleMeals(extendedStagedScheduleMeals);
          const stagedScheduleMealItemsMap = new Map();
          extendedStagedScheduleMeals.forEach((stagedScheduleMeal) => {
            if (stagedScheduleMealItemsMap.has(stagedScheduleMeal.mealId)) {
              stagedScheduleMealItemsMap.get(
                stagedScheduleMeal.mealId
              ).quantity += 1;
            } else {
              stagedScheduleMealItemsMap.set(
                stagedScheduleMeal.mealId,
                new StagedScheduleMealItem(stagedScheduleMeal)
              );
            }
          });
          setStagedScheduleMealItems(
            Array.from(stagedScheduleMealItemsMap.values())
          );
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
    <>
      <Grid
        container
        paddingLeft={'2vw'}
        paddingRight={'2vw'}
        paddingBottom={'10vh'}
        // this gets rid of extra 'purple' space in view layout in chrome dev tools.
        alignItems="flex-start"
        paddingTop="3vh"
        backgroundColor={customTheme.palette.olive.quaternary}
      >
        {/* Meals Cards */}
        <Grid
          container
          item
          lg={9.5}
          md={8.5}
          xs={12}
          spacing={4}
          marginBottom={customTheme.smallerScreen() ? '6vh' : ''}
          justifyContent={'center'}
        >
          <Grid container item spacing={7}>
            <Grid item justifySelf={'center'} xs={12}>
              <Typography
                textAlign={'center'}
                fontSize={customTheme.fontEqualizer(20)}
              >
                Pre-Selected Meals (Chosen by Your Dietitian)
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
        </Grid>
        {/* Meals Cards */}

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
    </>
  );
};
export default ClientPreSelectedMenu;
