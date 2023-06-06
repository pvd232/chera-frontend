import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { FormControlLabel, FormGroup } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import APIClient from '../../../helpers/APIClient';
import DeliveryDateUtility from '../../../helpers/DeliveryDateUtility';
import OrangeButton from '../../reusable_ui_components/OrangeButton';
import OrangeButtonWhiteText from '../../reusable_ui_components/OrangeButtonWhiteText';
import Transition from '../../reusable_ui_components/Transition';
import BlueCircularProgress from '../../reusable_ui_components/BlueCircularProgress';
import ClientMenu from '../sign_up/client_menu/ClientMenu';
import getNextDeliveryDate from './helpers/getNextDeliveryDate';
import checkUpcomingDelivery from './helpers/checkUpcomingDelivery';
import canMakeChanges from './helpers/canMakeChanges';
const EditDeliveryModal = (props) => {
  const customTheme = useTheme();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingPauseSubscription, setLoadingPauseSubscription] =
    useState(false);
  const [loadingDeleteSubscription, setLoadingDeleteSubscription] =
    useState(false);
  const [confirmDeleteSubscription, setConfirmDeleteSubscription] =
    useState(false);
  const [
    confirmDeleteSubscriptionUsername,
    setConfirmDeleteSubscriptionUsername,
  ] = useState('');
  const [editMeals, setEditMeals] = useState(false);
  const [canMakeChangesToCurrentWeek, setCanMakeChangesToCurrentWeek] =
    useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setConfirmDeleteSubscription(false);
    setConfirmDeleteSubscriptionUsername('');
    setEditMeals(false);
    setOpen(false);
  };

  const handleUpdateFoodData = async () => {
    await props.handleUpdateFoodData();
    handleClose();
  };
  const handleSkipWeek = async () => {
    setLoading(true);
    if (props.weekSkipped) {
      // Unskip week in component then update scheduledOrderMeals in parent with call to props
      await APIClient.unskipWeek(
        props.mealSubscription.id,
        props.mealSubscription.stripeSubscriptionId,
        DeliveryDateUtility.getDeliveryDateFromIndex(
          props.selectedDeliveryIndex
        ).getTime() / 1000
      );
      props.unskipWeek();
      setLoading(false);
    } else {
      const isFirstDelivery = await APIClient.checkIfFirstWeek(
        props.mealSubscription.id
      );
      if (!isFirstDelivery || props.selectedDeliveryIndex > 0) {
        await APIClient.skipWeek(
          props.mealSubscription.id,
          props.mealSubscription.stripeSubscriptionId,
          DeliveryDateUtility.getDeliveryDateFromIndex(
            props.selectedDeliveryIndex
          ).getTime() / 1000
        );
        props.skipWeek();
        setLoading(false);
      } else {
        alert(
          'You cannot skip your first week of delivery. Please contact us if you would like to cancel your subscription.'
        );
        setLoading(false);
      }
    }

    return;
  };

  const handlePauseMealSubscription = async () => {
    setLoadingPauseSubscription(true);
    // Update mealSubscription in backend
    APIClient.pauseMealSubscription(props.mealSubscription.id).then(() => {
      APIClient.pauseScheduledOrderMeals(props.mealSubscription.id).then(() => {
        props.pauseMealSubscription();
        setLoadingPauseSubscription(false);
      });
    });
  };
  const handleUnpauseMealSubscription = async () => {
    setLoadingPauseSubscription(true);
    // Update meal program in backend
    APIClient.unpauseMealSubscription(props.mealSubscription.id).then(() => {
      APIClient.unpauseScheduledOrderMeals(props.mealSubscription.id).then(
        () => {
          props.unpauseMealSubscription();
          setLoadingPauseSubscription(false);
        }
      );
    });
  };

  const handleDeleteSubscription = async () => {
    confirmDeleteSubscriptionUsername === props.clientId
      ? (() => {
          setLoadingDeleteSubscription(true);
          APIClient.deleteScheduleMeals(props.mealSubscription.id).then(() => {
            APIClient.deleteScheduledOrderMeals(props.mealSubscription.id).then(
              () => {
                APIClient.deleteScheduleSnacks(props.mealSubscription.id).then(
                  () => {
                    APIClient.deleteScheduledOrderSnacks(
                      props.mealSubscription.id
                    ).then(() => {
                      APIClient.deleteStripeSubscription(
                        props.mealSubscription.stripeSubscriptionId
                      ).then(() => {
                        APIClient.deleteStripeCustomer(
                          props.stripeCustomerId
                        ).then(() => {
                          APIClient.deactivateClient(props.clientId).then(
                            () => {
                              APIClient.deactivateMealSubscription(
                                props.clientId
                              ).then(() => {
                                setLoadingDeleteSubscription(false);
                                props.handleDeleteSubscription();
                              });
                            }
                          );
                        });
                      });
                    });
                  }
                );
              }
            );
          });
        })()
      : alert('Please enter your username to confirm deletion.');
  };
  const handleChangeMeals = async () => {
    const ableToChangeCurrentWeek = canMakeChanges(props.selectedDeliveryIndex);
    const isFirstDelivery = await APIClient.checkIfFirstWeek(
      props.mealSubscription.id
    );
    if (!ableToChangeCurrentWeek || isFirstDelivery) {
      alert('These changes will take effect next week and onwards.');
    } else {
      setCanMakeChangesToCurrentWeek(true);
    }
    setEditMeals(true);
  };
  return (
    <div>
      <OrangeButton
        id="edit-delivery-button"
        variant="outlined"
        onClick={() => {
          handleClickOpen();
        }}
      >
        {props.buttonText}
      </OrangeButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={editMeals ? 'xl' : 'xs'}
      >
        {!editMeals ? (
          <>
            <Typography
              fontSize={customTheme.fontEqualizer(24)}
              textAlign={'center'}
              marginTop={'40px'}
            >
              Manage Delivery
            </Typography>
            <DialogContent>
              <Typography
                fontSize={customTheme.fontEqualizer(16)}
                textAlign={'center'}
              >
                {props.paused &&
                !checkUpcomingDelivery(props.extendedScheduledOrderMeals)
                  ? 'Your subscription is paused. You have no upcoming deliveries.'
                  : 'Your next delivery is estimated to arrive on'}
              </Typography>
              {checkUpcomingDelivery(props.extendedScheduledOrderMeals) && (
                <Typography
                  fontSize={customTheme.fontEqualizer(16)}
                  paddingBottom={'20px'}
                  fontWeight={'bold'}
                  textAlign={'center'}
                >
                  {
                    DeliveryDateUtility.weekdays[
                      getNextDeliveryDate(
                        props.extendedScheduledOrderMeals
                      ).getDay()
                    ]
                  }
                  {', '}
                  {
                    DeliveryDateUtility.months[
                      getNextDeliveryDate(
                        props.extendedScheduledOrderMeals
                      ).getMonth()
                    ]
                  }{' '}
                  {getNextDeliveryDate(
                    props.extendedScheduledOrderMeals
                  ).getDate()}
                  , 2PM - 8PM
                </Typography>
              )}

              <Typography
                fontSize={customTheme.fontEqualizer(16)}
                textAlign={'center'}
                mt={2}
              >
                {!props.paused
                  ? canMakeChanges(props.selectedDeliveryIndex) &&
                    props.weekSkipped
                    ? 'Want some meals this week?'
                    : canMakeChanges(props.selectedDeliveryIndex) &&
                      !props.weekSkipped
                    ? "Can't make this week?"
                    : "The deadline has passed to make changes to this week's order."
                  : props.paused &&
                    (checkUpcomingDelivery(props.extendedScheduledOrderMeals)
                      ? 'Your weekly meals will be skipped indefinitely after this week.'
                      : 'Your weekly meals are already skipped.')}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Grid container justifyContent={'center'}>
                <OrangeButtonWhiteText
                  id="skip-week-button"
                  disabled={
                    !canMakeChanges(props.selectedDeliveryIndex) || props.paused
                  }
                  variant={'contained'}
                  onClick={handleSkipWeek}
                >
                  {loading ? (
                    <BlueCircularProgress />
                  ) : props.weekSkipped ? (
                    'Unskip week'
                  ) : (
                    'Skip this week'
                  )}
                </OrangeButtonWhiteText>
              </Grid>
            </DialogActions>
            <DialogContent>
              <Typography
                fontSize={customTheme.fontEqualizer(16)}
                textAlign={'center'}
              >
                {!props.paused
                  ? `You're currently receiving ${props.mealsPerWeek} meals per week.`
                  : "Your subscription is paused and you're not receiving any new meals."}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Grid container justifyContent={'center'}>
                <OrangeButtonWhiteText
                  disabled={props.paused}
                  variant="contained"
                  onClick={() => handleChangeMeals()}
                >
                  Change Meals
                </OrangeButtonWhiteText>
              </Grid>
            </DialogActions>{' '}
            <DialogContent>
              <Typography
                fontSize={customTheme.fontEqualizer(16)}
                textAlign={'center'}
              >
                {props.paused
                  ? 'Want to get back on your meal plan?'
                  : 'Need to take a break? You can pause indefinitely.'}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Grid container justifyContent={'center'} marginBottom={'40px'}>
                {!props.paused ? (
                  <OrangeButtonWhiteText
                    id="pause-subscription-button"
                    onClick={handlePauseMealSubscription}
                    variant="contained"
                  >
                    {loadingPauseSubscription ? (
                      <BlueCircularProgress />
                    ) : (
                      'Pause subscription'
                    )}
                  </OrangeButtonWhiteText>
                ) : (
                  <OrangeButtonWhiteText
                    id="unpause-subscription-button"
                    onClick={handleUnpauseMealSubscription}
                  >
                    {loadingPauseSubscription ? (
                      <BlueCircularProgress />
                    ) : (
                      'Unpause subscription'
                    )}
                  </OrangeButtonWhiteText>
                )}
              </Grid>
            </DialogActions>{' '}
            <DialogActions>
              <Grid container justifyContent={'center'} marginBottom={'40px'}>
                {confirmDeleteSubscription ? (
                  <FormGroup>
                    <FormControlLabel>
                      <Typography
                        fontSize={customTheme.fontEqualizer(16)}
                        textAlign={'center'}
                      >
                        Deleting your subscription will delete your account and
                        cancel all future deliveries. It cannot be undone.
                        Please enter your username to confirm.
                      </Typography>
                    </FormControlLabel>

                    <TextField
                      id="confirm-delete-subscription"
                      value={confirmDeleteSubscriptionUsername}
                      onChange={(e) =>
                        setConfirmDeleteSubscriptionUsername(e.target.value)
                      }
                    ></TextField>
                  </FormGroup>
                ) : null}
                <OrangeButtonWhiteText
                  id="deactivate-subscription-button"
                  onClick={
                    confirmDeleteSubscription
                      ? () => handleDeleteSubscription()
                      : () => setConfirmDeleteSubscription(true)
                  }
                >
                  {loadingDeleteSubscription ? (
                    <BlueCircularProgress />
                  ) : (
                    'Delete subscription'
                  )}
                </OrangeButtonWhiteText>
              </Grid>
            </DialogActions>{' '}
          </>
        ) : (
          <ClientMenu
            hasSnacks={props.extendedScheduledOrderSnacks.length > 0}
            snacks={props.snacks}
            extendedMeals={props.extendedMeals}
            editMeals={true}
            canChangeFirstWeek={canMakeChangesToCurrentWeek}
            finishEditing={() => handleUpdateFoodData()}
            userId={props.mealSubscription.clientId}
            mealSubscriptionId={props.mealSubscription.id}
            dietitianChoosingClientMeals={false}
          ></ClientMenu>
        )}
      </Dialog>
    </div>
  );
};
export default EditDeliveryModal;
