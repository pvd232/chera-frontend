import { useState } from 'react';
import { Button, FormControlLabel, FormGroup } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import APIClient from '../../../../helpers/APIClient';
import DeliveryDateUtility from '../../../../helpers/DeliveryDateUtility';
import Transition from '../../../shared_components/Transition';
import BlueCircularProgress from '../../../shared_components/BlueCircularProgress';
import ClientMenu from '../../sign_up/client_menu/ClientMenu';
import getNextDeliveryDate from '../helpers/getNextDeliveryDate';
import checkUpcomingDelivery from '../helpers/checkUpcomingDelivery';
import { pastCutoffDate } from './helpers/pastCutoffDate';
import editDeliveryModal from './scss/EditDeliveryModal.module.scss';
const EditDeliveryModal = (props) => {
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
    const ableToChangeCurrentWeek = !pastCutoffDate(
      props.selectedDeliveryIndex
    );
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
  const buttonsDisabled = () => {
    if (pastCutoffDate(props.selectedDeliveryIndex) || props.paused) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Grid item className={editDeliveryModal.container}>
      <Button
        id="edit-delivery-button"
        variant="outlined"
        onClick={() => {
          handleClickOpen();
        }}
        className={editDeliveryModal.button}
      >
        {props.buttonText}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        // keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={editMeals ? 'xl' : 'xs'}
      >
        {!editMeals ? (
          <Grid container item className={editDeliveryModal.dialogContainer}>
            <Grid item>
              <Typography className={editDeliveryModal.header}>
                Manage Delivery
              </Typography>
            </Grid>
            <DialogContent>
              <Grid
                container
                item
                className={editDeliveryModal.dialogContentContainer}
              >
                <Grid item>
                  <Typography className={editDeliveryModal.modalBodyText}>
                    {props.paused &&
                    !checkUpcomingDelivery(props.extendedScheduledOrderMeals)
                      ? 'Your subscription is paused. You have no upcoming deliveries.'
                      : 'Your next delivery is estimated to arrive on:'}
                  </Typography>
                </Grid>
                <Grid item>
                  {checkUpcomingDelivery(props.extendedScheduledOrderMeals) && (
                    <Grid item>
                      <Typography
                        className={editDeliveryModal.deliveryDateText}
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
                    </Grid>
                  )}
                </Grid>
                <Grid
                  container
                  item
                  className={editDeliveryModal.dialogActionsContainer}
                >
                  <Grid item>
                    <Typography className={editDeliveryModal.modalBodyText}>
                      {!props.paused
                        ? !pastCutoffDate(props.selectedDeliveryIndex) &&
                          props.weekSkipped
                          ? 'Want some meals this week?'
                          : !pastCutoffDate(props.selectedDeliveryIndex) &&
                            !props.weekSkipped
                          ? "Can't make this week?"
                          : "The deadline has passed to make changes to this week's order."
                        : props.paused &&
                          (checkUpcomingDelivery(
                            props.extendedScheduledOrderMeals
                          )
                            ? 'Your weekly meals will be skipped indefinitely after this week.'
                            : 'Your weekly meals are already skipped.')}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Button
                      id="skip-week-button"
                      disabled={() => buttonsDisabled()}
                      variant={'contained'}
                      onClick={handleSkipWeek}
                      className={editDeliveryModal.dialogButton}
                    >
                      {loading ? (
                        <BlueCircularProgress />
                      ) : props.weekSkipped ? (
                        'Unskip week'
                      ) : (
                        'Skip this week'
                      )}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Typography className={editDeliveryModal.modalBodyText}>
                      {!props.paused
                        ? `You are currently receiving ${props.mealsPerWeek} meals per week.`
                        : "Your subscription is paused and you're not receiving any new meals."}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      disabled={props.paused}
                      variant="contained"
                      onClick={() => handleChangeMeals()}
                      className={editDeliveryModal.dialogButton}
                    >
                      Change Meals
                    </Button>
                  </Grid>
                  <Grid item>
                    <Typography className={editDeliveryModal.modalBodyText}>
                      {props.paused
                        ? 'Want to get back on your meal plan?'
                        : 'Need to take a break?'}
                    </Typography>
                  </Grid>

                  <Grid item>
                    {!props.paused ? (
                      <Button
                        id="pause-subscription-button"
                        onClick={handlePauseMealSubscription}
                        variant="contained"
                        className={editDeliveryModal.dialogButton}
                      >
                        {loadingPauseSubscription ? (
                          <BlueCircularProgress />
                        ) : (
                          'Pause subscription'
                        )}
                      </Button>
                    ) : (
                      <Button
                        id="unpause-subscription-button"
                        onClick={handleUnpauseMealSubscription}
                        variant="contained"
                        className={editDeliveryModal.dialogButton}
                      >
                        {loadingPauseSubscription ? (
                          <BlueCircularProgress />
                        ) : (
                          'Unpause subscription'
                        )}
                      </Button>
                    )}
                  </Grid>

                  <Grid item>
                    <Typography className={editDeliveryModal.modalBodyText}>
                      Account deletion is permanent.
                    </Typography>
                  </Grid>
                  <Grid item>
                    {confirmDeleteSubscription ? (
                      <FormGroup>
                        <FormControlLabel>
                          <Typography
                            className={editDeliveryModal.modalBodyText}
                          >
                            Deleting your subscription will delete your account
                            and cancel all future deliveries. It cannot be
                            undone. Please enter your username to confirm.
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
                    <Button
                      id="deactivate-subscription-button"
                      disabled={props.paused}
                      onClick={
                        confirmDeleteSubscription
                          ? () => handleDeleteSubscription()
                          : () => setConfirmDeleteSubscription(true)
                      }
                      variant="contained"
                      className={editDeliveryModal.dialogButton}
                    >
                      {loadingDeleteSubscription ? (
                        <BlueCircularProgress />
                      ) : (
                        'Delete subscription'
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
          </Grid>
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
    </Grid>
  );
};
export default EditDeliveryModal;
