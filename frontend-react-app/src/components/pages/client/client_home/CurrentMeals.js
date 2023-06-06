import Grid from '@mui/material/Grid';
import ScheduledOrderMealCard from './ScheduledOrderMealCard';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
const CurrentMeals = (props) => {
  return (
    <Grid
      container
      item
      lg={10}
      spacing={3}
      marginBottom={'10vh'}
      justifyContent={'flex-start'}
    >
      <Grid item container justifyContent={'flex-start'}>
        <Typography
          fontSize={'1.5rem'}
          textAlign={'center'}
          marginBottom={'5vh'}
          marginTop={'2vh'}
        >
          Meals
        </Typography>
        {props.cantMakeChanges && !props.isFirstDelivery ? (
          <Grid item>
            <Tooltip
              title="It's too late to make changes to this order. All changes must be made by Wednesday at 10 PM"
              placement="right"
            >
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        ) : props.isFirstDelivery ? (
          <Grid item>
            <Tooltip
              title="Beginning your second week, you can make changes to your order until Wednesday at 10 PM"
              placement="right"
            >
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
      {props.currentScheduledOrderMeals.map((scheduledOrderMealCardData, i) => (
        <Grid
          item
          key={`gridChosenScheduledOrderMeal${i}`}
          sx={{
            marginLeft: window.innerWidth < 450 ? 'auto' : '',
            marginRight: window.innerWidth < 450 ? 'auto' : '',
          }}
        >
          <ScheduledOrderMealCard
            mealData={scheduledOrderMealCardData}
            handleAddScheduledOrderMeal={(scheduledOrderMealCardData) =>
              props.handleAddScheduledOrderMeal(scheduledOrderMealCardData)
            }
            handleRemoveScheduledOrderMeal={(scheduledOrderMealCardData) =>
              props.handleRemoveScheduledOrderMeal(scheduledOrderMealCardData)
            }
            key={`clientMeal${i}`}
            cantMakeChanges={props.cantMakeChanges}
          ></ScheduledOrderMealCard>
        </Grid>
      ))}
    </Grid>
  );
};
export default CurrentMeals;
