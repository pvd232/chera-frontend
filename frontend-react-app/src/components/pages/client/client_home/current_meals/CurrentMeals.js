import Grid from '@mui/material/Grid';
import ScheduledOrderMealCard from './ScheduledOrderMealCard';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import currentMeals from './scss/CurrentMeals.module.scss';
import DeliveryDateUtility from '../../../../../helpers/DeliveryDateUtility';
const CurrentMeals = (props) => (
  <Grid container item className={currentMeals.container}>
    <Grid item container className={currentMeals.headerContainer}>
      <Grid item>
        <Typography className={currentMeals.header}>Meals</Typography>
      </Grid>
      {props.cantMakeChanges && !props.isFirstDelivery ? (
        <Grid item>
          <Tooltip
            title={
              "It's too late to make changes to this order. All changes must be made by " +
              DeliveryDateUtility.weekdays[
                DeliveryDateUtility.getCutoffDateFromIndex(
                  props.currentDeliveryDateIndex
                ).getDay()
              ] +
              ' at ' +
              DeliveryDateUtility.getFormattedTime(
                DeliveryDateUtility.getCutoffDateFromIndex(
                  props.currentDeliveryDateIndex
                )
              )
            }
            placement="right"
          >
            <IconButton>
              <InfoIcon className={currentMeals.toolTip} />
            </IconButton>
          </Tooltip>
        </Grid>
      ) : props.isFirstDelivery ? (
        <Grid item>
          <Tooltip
            title={
              'Beginning your second week, you can make changes to your order until ' +
              DeliveryDateUtility.weekdays[
                DeliveryDateUtility.getCutoffDateFromIndex(
                  props.currentDeliveryDateIndex
                ).getDay()
              ] +
              ' at ' +
              DeliveryDateUtility.getFormattedTime(
                DeliveryDateUtility.getCutoffDateFromIndex(
                  props.currentDeliveryDateIndex
                )
              )
            }
            placement="right"
          >
            <IconButton>
              <InfoIcon className={currentMeals.toolTip} />
            </IconButton>
          </Tooltip>
        </Grid>
      ) : (
        <Tooltip
          title={
            'You can make changes to your order until ' +
            DeliveryDateUtility.weekdays[
              DeliveryDateUtility.getCutoffDateFromIndex(
                props.currentDeliveryDateIndex
              ).getDay()
            ] +
            ' at ' +
            DeliveryDateUtility.getFormattedTime(
              DeliveryDateUtility.getCutoffDateFromIndex(
                props.currentDeliveryDateIndex
              )
            )
          }
          placement="right"
        >
          <IconButton>
            <InfoIcon className={currentMeals.toolTip} />
          </IconButton>
        </Tooltip>
      )}
    </Grid>
    <Grid item container>
      {props.currentScheduledOrderMeals.map((scheduledOrderMealCardData, i) => (
        <Grid
          item
          key={`gridChosenScheduledOrderMeal${i}`}
          className={currentMeals.cardContainer}
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
  </Grid>
);
export default CurrentMeals;
