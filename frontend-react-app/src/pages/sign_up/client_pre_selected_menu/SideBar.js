import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import DeliveryDateUtility from '../../helpers/DeliveryDateUtility';
import BlackButton from '../../reusable_ui_components/BlackButton';
import BlueCircularProgress from '../../../reusable_ui_components/BlueCircularProgress';
import getMealsSubtotal from '../helpers/getMealsSubtotal';

const SideBar = (props) => {
  const breakfastMeals = props.extendedStagedScheduleMeals.filter(
    (chosenMeal) => chosenMeal.associatedMeal.mealTime === 'breakfast'
  );
  const lunchMeals = props.extendedStagedScheduleMeals.filter(
    (chosenMeal) => chosenMeal.associatedMeal.mealTime === 'lunch'
  );
  const dinnerMeals = props.extendedStagedScheduleMeals.filter(
    (chosenMeal) => chosenMeal.associatedMeal.mealTime === 'dinner'
  );
  const mealsByMealTime = [
    {
      mealTime: 'breakfast',
      meals: breakfastMeals,
    },
    {
      mealTime: 'lunch',
      meals: lunchMeals,
    },
    {
      mealTime: 'dinner',
      meals: dinnerMeals,
    },
  ];
  return (
    <Grid
      container
      sx={{
        paddingLeft: '2vw',
        borderLeft: `solid 2px ${props.customTheme.palette.lightGrey.main}`,
      }}
    >
      <Grid item xs={12}>
        <Typography
          fontSize={'1rem'}
          textAlign={'left'}
          margin={'0 auto'}
          paddingBottom={'2vh'}
        >
          Delivery for{' '}
          <strong>
            Sunday,{' '}
            {`${
              DeliveryDateUtility.months[
                DeliveryDateUtility.getDeliveryDateFromIndex(0).getMonth()
              ]
            } ${DeliveryDateUtility.getDeliveryDateFromIndex(0)}`}
          </strong>
        </Typography>
      </Grid>

      <Grid item xs={12}>
        {mealsByMealTime.map((mealTimeObject, i) => (
          <div
            key={`mealsByTimeDiv${i}`}
            style={{
              borderBottom: `solid 2px ${props.customTheme.palette.lightGrey.main}`,
              marginBottom: '3vh',
            }}
          >
            <Typography
              fontSize={'.9rem'}
              fontStyle={'italic'}
              key={`mealsByTimeTypo${i}`}
              marginBottom="2vh"
            >
              {`${props.customTheme.capitalized(mealTimeObject.mealTime)}:`}{' '}
            </Typography>
            <Stack key={`stack1${i}`} marginBottom="2vh">
              {mealTimeObject.meals.map((chosenMeal, j) => (
                <Grid
                  item
                  container
                  xs={12}
                  alignItems={'center'}
                  paddingBottom={'1vh'}
                  key={`mealTimeObjectGridContainer${i}${j}`}
                >
                  <Grid item xs={9} key={`mealTimeObjectGrid9${i}${j}`}>
                    <Typography
                      fontSize={'.9rem'}
                      key={`mealTimeObjectTypo${i}${j}`}
                      fontWeight={'bold'}
                    >
                      {chosenMeal.name}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Stack>
          </div>
        ))}
        <Grid item xs={12}>
          <Typography
            fontSize={'1rem'}
            textAlign={'left'}
            margin={'0 auto'}
            paddingTop={'1vh'}
          >
            Order Summary
          </Typography>
        </Grid>
        <Grid
          container
          sx={{
            marginBottom: '5vh',
            paddingTop: '1vh',
          }}
        >
          <Grid item xs={5}>
            <Typography fontSize={'1rem'} textAlign={'left'}>
              {`${props.extendedStagedScheduleMeals.length} meals`}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography fontSize={'1rem'} textAlign={'right'}>
              {`$${getMealsSubtotal(props.extendedStagedScheduleMeals)}`}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            marginBottom: '5vh',
            paddingTop: '1vh',
          }}
        >
          <BlackButton
            variant="contained"
            type={'submit'}
            disabled={props.loading}
            onClick={props.handleSubmit}
            sx={{
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '100%',
              paddingTop: '1vh',
              paddingBottom: '1vh',
              marginTop: '3vh',
            }}
          >
            {props.loading ? <BlueCircularProgress /> : 'Confirm'}
          </BlackButton>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default SideBar;
