import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import EditDeliveryModal from '../EditDeliveryModal';
const PausedEditDelivery = (props) => (
  <Grid
    container
    item
    lg={10}
    justifyContent={'space-around'}
    alignItems={'center'}
    paddingTop={'8vh'}
  >
    <Grid item></Grid>
    <Grid container item lg={6} md={8} xs={8} justifyContent={'center'}>
      {props.paused ? (
        <Typography
          id="paused-edit-delivery"
          fontSize={props.customTheme.fontEqualizer(18)}
        >
          Your subscription is paused. To unpause it, click the edit delivery
          button and select unpause subscription.
        </Typography>
      ) : (
        <Typography
          id="skipped-edit-delivery"
          fontSize={props.customTheme.fontEqualizer(18)}
        >
          You skipped your meals this week. To unskip the week, click the edit
          delivery button and select unskip week.
        </Typography>
      )}
    </Grid>
    <Grid item alignItems={'flex-end'}>
      <Grid item sx={{ marginTop: window.innerWidth < 450 ? '2vh' : '0vh' }}>
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
        ></EditDeliveryModal>
      </Grid>
    </Grid>
  </Grid>
);
export default PausedEditDelivery;
