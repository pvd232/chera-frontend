import EditDeliveryModal from '../EditDeliveryModal';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import GreenFilledButton from './GreenFilledButton';
import DeliveryDateUtility from '../../../helpers/DeliveryDateUtility';
import BlueCircularProgress from '../../../reusable_ui_components/BlueCircularProgress';
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
    <Grid
      container
      item
      lg={10}
      justifyContent={'space-between'}
      alignItems={'center'}
      px={3}
      py={3}
    >
      <Grid
        container
        item
        xs={6}
        direction={'column'}
        alignItems={'flex-start'}
      >
        <Grid item>
          <Typography
            fontFamily={'Inter'}
            fontSize={props.customTheme.fontEqualizer(18)}
          >
            Modify this week's meals by{' '}
            {DeliveryDateUtility.getDeliveryDateForDisplay(
              DeliveryDateUtility.getCutoffDateFromIndex(
                props.selectedDeliveryIndex
              )
            )}
          </Typography>
        </Grid>
        <Grid item>
          <FormHelperText hidden={!props.editing} error={true}>
            {props.editing && props.netChangeInWeeklyMeals < 0
              ? `Remove ${-1 * props.netChangeInWeeklyMeals} meal${
                  Math.abs(props.netChangeInWeeklyMeals) > 1 ? 's' : ''
                } to keep your changes`
              : props.editing && props.netChangeInWeeklyMeals > 0
              ? `Add ${props.netChangeInWeeklyMeals} meal${
                  Math.abs(props.netChangeInWeeklyMeals) > 1 ? 's' : ''
                } to keep your changes`
              : ''}
          </FormHelperText>
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={6}
        direction={'column'}
        alignItems={'flex-end'}
        marginBottom={props.customTheme.smallerScreen() ? '2vh' : ''}
        marginTop={props.customTheme.smallerScreen() ? '2vh' : '2vh'}
      >
        <Grid
          item
          marginTop={props.customTheme.smallerScreen() ? '4vh' : ''}
          marginBottom={props.customTheme.smallerScreen() ? '4vh' : ''}
        >
          <EditDeliveryModal
            buttonText={'Edit delivery'}
            handleFinishEditing={props.handleFinishEditing}
            selectedDeliveryIndex={props.selectedDeliveryIndex}
            extendedScheduledOrderMeals={props.extendedScheduledOrderMeals}
            mealSubscription={props.mealSubscription}
            mealsPerWeek={props.extendedScheduledOrderMeals.length / 4}
            extendedMeals={props.extendedMeals}
            skipWeek={(deliveryDateIndex) => handleSkipWeek(deliveryDateIndex)}
            unskipWeek={(deliveryDateIndex) =>
              handleUnskipWeek(deliveryDateIndex)
            }
            pauseMealSubscription={() => props.pauseMealSubscription()}
            unpauseMealSubscription={() => props.unpauseMealSubscription()}
            handleChangeMeals={props.handleChangeMeals}
          ></EditDeliveryModal>
        </Grid>
        {props.editing === true ? (
          <Grid item>
            <GreenFilledButton
              variant={'filled'}
              sx={{ marginTop: '2vh' }}
              onClick={props.handleSaveChanges}
            >
              {props.loading ? (
                <BlueCircularProgress />
              ) : (
                'Save Changes for this Week'
              )}
            </GreenFilledButton>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
    </Grid>
  );
};
export default DeliveryInfo;
