import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import EditDeliveryModal from './EditDeliveryModal';
import pausedEditDelivery from './scss/PausedEditDelivery.module.scss';
const PausedEditDelivery = (props) => (
  <Grid container item className={pausedEditDelivery.container}>
    <Grid
      container
      item
      lg={6}
      md={8}
      xs={8}
      className={pausedEditDelivery.headerContainer}
    >
      {props.paused ? (
        <Typography
          id="paused-edit-delivery"
          className={pausedEditDelivery.header}
        >
          Your subscription is paused. To unpause it, click the edit delivery
          button and select unpause subscription.
        </Typography>
      ) : (
        <Typography
          id="skipped-edit-delivery"
          className={pausedEditDelivery.header}
        >
          You skipped your meals this week. To unskip the week, click the edit
          delivery button and select unskip week.
        </Typography>
      )}
    </Grid>
    <Grid item>
      <Grid item>
        <EditDeliveryModal
          buttonText={'Edit delivery'}
          handleFinishEditing={props.handleFinishEditing}
          selectedDeliveryIndex={props.selectedDeliveryIndex}
          extendedScheduledOrderMeals={props.extendedScheduledOrderMeals}
          skipWeek={(deliveryDateIndex) => props.skipWeek(deliveryDateIndex)}
          unskipWeek={(deliveryDateIndex) =>
            props.unskipWeek(deliveryDateIndex)
          }
          pauseMealSubscription={() => props.pauseMealSubscription()}
          unpauseMealSubscription={() => props.unpauseMealSubscription()}
          mealSubscription={props.mealSubscription}
          mealsPerWeek={props.mealsPerWeek}
          weekSkipped={props.weekSkipped}
          paused={props.paused}
        />
      </Grid>
    </Grid>
  </Grid>
);
export default PausedEditDelivery;
