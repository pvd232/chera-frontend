import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import planDetails from './scss/PlanDetails.module.scss';
import planImage from './../../../static/images/plan.png';
import APIClient from '../../../helpers/APIClient';
import LocalStorageManager from '../../../helpers/LocalStorageManager';
const PlanDetails = (props) => {
  const [confirmDeleteUsername, setConfirmDeleteUsername] = 
    useState('');
  const [loadingDeleteSubscription, setLoadingDeleteSubscription] =
    useState(false);
  // const [confirmDeleteSubscription, setConfirmDeleteSubscription] =
  //   useState(false);

  const handleDeleteSubscription = async () => {
    console.log(LocalStorageManager.shared.client);
    const client = LocalStorageManager.shared.client;
    confirmDeleteUsername === client.id
    // confirmDeleteUsername === props.clientId
      ? (() => {
          setLoadingDeleteSubscription(true);
          APIClient.deleteScheduleMeals(client.mealPlanId).then(() => {
            APIClient.deleteScheduledOrderMeals(client.mealPlanId).then(
              () => {
                APIClient.deleteScheduleSnacks(client.mealPlanId).then(
                  () => {
                    APIClient.deleteScheduledOrderSnacks(
                      client.mealPlanId
                    ).then(() => {
                      APIClient.deleteStripeSubscription(
                        client.id
                      ).then(() => {
                        APIClient.deleteStripeCustomer(
                          client.stripeId
                        ).then(() => {
                          APIClient.deactivateClient(client.id).then(
                            () => {
                              APIClient.deactivateMealSubscription(
                                client.id
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

  return (
    <Grid container item className={planDetails.pageContainer} xs={8}>
      <Grid item container justifyContent={'center'} borderBottom={'2px solid darkGrey'}>
        <Typography
          id={'plan-details-header'}
          className={planDetails.header}
        >
          Your Plan Details
        </Typography>
      </Grid>

      {/* Starter Plan Section */}
      <Grid container item className={planDetails.contentContainer}>
        <Grid container item className={planDetails.cardContainer}>
          <Grid item xs={2}>
            <img src={planImage} alt="Plan" className={planDetails.planImage}/>
          </Grid>
          <Grid item xs={8}>
            <Typography className={planDetails.planText}>
              Starter Plan
            </Typography>
            <Typography>
              Free to use with no monthly fees or volume restrictions when you use Shippo's carrier accounts.
            </Typography>
            <Typography>
              $0.05 fee will be applied per label when using your own carrier account(s).
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="success" className={planDetails.upgradeButton}>
              Upgrade Plan
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Close Account Section */}
      <Grid container item className={planDetails.contentContainer}>
        <Grid container item className={planDetails.cardContainer}>
          <Grid item xs={8}>
            <Typography className={planDetails.closeAccountText}>
              Close Account
            </Typography>
            <Typography>
              When you close your account, you lose access to your historical shopping data and settings.
            </Typography>
          </Grid>
          <Grid container item xs={4}>
            <Grid item xs={6}>
              <TextField 
                className={planDetails.confirmUsernameField}
                label="Confirm Username..." 
                value={confirmDeleteUsername} 
                onChange={event => setConfirmDeleteUsername(event.target.value)} 
              />
            </Grid>
            <Grid item xs={6}>
            {
                loadingDeleteSubscription 
                ? 
                <Grid item xs={6}>
                  <CircularProgress className={planDetails.closeAccountLoader} color="secondary" />
                </Grid>
                : 
                <Grid item xs={6}>
                  <Button className={planDetails.closeAccountLink} onClick={handleDeleteSubscription}>
                    Close Account
                  </Button>
                </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PlanDetails;
