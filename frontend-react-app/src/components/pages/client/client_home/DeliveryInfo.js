import EditDeliveryModal from './EditDeliveryModal';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeliveryDateUtility from '../../../../helpers/DeliveryDateUtility';
import BlueCircularProgress from '../../../shared_components/BlueCircularProgress';
import deliveryInfo from './scss/DeliveryInfo.module.scss';
import { Stack } from '@mui/material';
const DeliveryInfo = (props) => {
  const handleSkipWeek = async (deliveryDate) => {
    await props.skipWeek(deliveryDate);
    return;
  };
  const handleUnskipWeek = async (deliveryDate) => {
    await props.unskipWeek(deliveryDate);
    return;
  };
  return (
    <Grid container item className={deliveryInfo.rootContainer}>
      <Grid container item xs={6} className={deliveryInfo.headerContainer}>
        <Grid item>
          <Stack className={deliveryInfo.stack}>
            {props.isFirstDelivery ? (
              <>
                <Typography className={deliveryInfo.themeHeader}>
                  Welcome to Chera!
                </Typography>
                <Typography className={deliveryInfo.header}>
                  This is your home page. Here you can view your upcoming
                  deliveries and make changes to your subscription.
                </Typography>
              </>
            ) : (
              <>
                <Typography className={deliveryInfo.themeHeader}>
                  Welcome back!
                </Typography>
                <Typography className={deliveryInfo.header}>
                  {"Modify this week's delivery by " +
                    DeliveryDateUtility.getDateForDisplay(
                      DeliveryDateUtility.getCutoffDateFromIndex(
                        props.selectedDeliveryIndex
                      )
                    )}
                </Typography>
              </>
            )}
          </Stack>
        </Grid>
        <Grid item>
          <FormHelperText
            hidden={!props.editing}
            error={true}
            className={deliveryInfo.errorText}
          >
            {props.editing && props.netChangeInWeeklyMeals < 0
              ? `Remove ${-1 * props.netChangeInWeeklyMeals} meal${
                  Math.abs(props.netChangeInWeeklyMeals) > 1 ? 's' : ''
                } to keep your changes`
              : props.editing && props.netChangeInWeeklyMeals > 0
              ? `Add ${props.netChangeInWeeklyMeals} meal${
                  Math.abs(props.netChangeInWeeklyMeals) > 1 ? 's' : ''
                } to keep your changes`
              : props.editing && props.netChangeInWeeklySnacks < 0
              ? `Remove ${-1 * props.netChangeInWeeklySnacks} snack${
                  Math.abs(props.netChangeInWeeklySnacks) > 1 ? 's' : ''
                } to keep your changes`
              : props.editing && props.netChangeInWeeklySnacks > 0
              ? `Add ${props.netChangeInWeeklySnacks} snack${
                  Math.abs(props.netChangeInWeeklySnacks) > 1 ? 's' : ''
                } to keep your changes`
              : ''}
          </FormHelperText>
        </Grid>
      </Grid>
      <Grid container item xs={6} className={deliveryInfo.modalButtonContainer}>
        <EditDeliveryModal
          isFirstDelivery={props.isFirstDelivery}
          paused={props.paused}
          clientId={props.clientId}
          buttonText={'Edit delivery'}
          handleFinishEditing={props.handleFinishEditing}
          selectedDeliveryIndex={props.selectedDeliveryIndex}
          extendedScheduledOrderMeals={props.extendedScheduledOrderMeals}
          extendedScheduledOrderSnacks={props.extendedScheduledOrderSnacks}
          mealSubscription={props.mealSubscription}
          mealsPerWeek={props.extendedScheduledOrderMeals.length / 4}
          extendedMeals={props.extendedMeals}
          snacks={props.snacks}
          skipWeek={(deliveryDateIndex) => handleSkipWeek(deliveryDateIndex)}
          unskipWeek={(deliveryDateIndex) =>
            handleUnskipWeek(deliveryDateIndex)
          }
          pauseMealSubscription={() => props.pauseMealSubscription()}
          unpauseMealSubscription={() => props.unpauseMealSubscription()}
          handleUpdateFoodData={props.handleUpdateFoodData}
          handleDeleteSubscription={props.handleDeleteSubscription}
        />
        {props.editing === true ? (
          <Grid item>
            <Button
              id={'save-changes-button'}
              variant={'filled'}
              className={deliveryInfo.saveChangesButton}
              onClick={props.handleSaveChanges}
            >
              {props.loading ? <BlueCircularProgress /> : 'Save changes'}
            </Button>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
    </Grid>
  );
};
export default DeliveryInfo;
