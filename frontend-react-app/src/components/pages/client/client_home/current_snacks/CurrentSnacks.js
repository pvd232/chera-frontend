import Grid from '@mui/material/Grid';
import ScheduledOrderSnackCard from './ScheduledOrderSnackCard';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import DeliveryDateUtility from '../../../../../helpers/DeliveryDateUtility';
import currentMeals from '../current_meals/scss/CurrentMeals.module.scss';
const CurrentSnacks = (props) => {
  return (
    <Grid container item lg={10} className={currentMeals.container}>
      <Grid item container className={currentMeals.headerContainer}>
        <Grid item>
          <Typography className={currentMeals.header}>Snacks</Typography>
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
      {props.currentScheduledOrderSnacks.map(
        (scheduledOrderSnackCardData, i) => (
          <Grid
            item
            key={`gridChosenScheduledOrderSnack${i}`}
            className={currentMeals.cardContainer}
          >
            <ScheduledOrderSnackCard
              snackData={scheduledOrderSnackCardData}
              handleAddScheduledOrderSnack={(scheduledOrderSnackCardData) =>
                props.handleAddScheduledOrderSnack(scheduledOrderSnackCardData)
              }
              handleRemoveScheduledOrderSnack={(scheduledOrderSnackCardData) =>
                props.handleRemoveScheduledOrderSnack(
                  scheduledOrderSnackCardData
                )
              }
              key={`clientSnack${i}`}
              cantMakeChanges={props.cantMakeChanges}
            ></ScheduledOrderSnackCard>
          </Grid>
        )
      )}
    </Grid>
  );
};
export default CurrentSnacks;
