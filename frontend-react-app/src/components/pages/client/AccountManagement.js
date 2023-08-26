import React, { useState } from 'react';
import {
  Button,
  Grid,
  Typography,
  TextField,
  CircularProgress,
} from '@mui/material';
import styles from './scss/AccountManagement.module.scss';
import APIClient from '../../../helpers/APIClient';
import LocalStorageManager from '../../../helpers/LocalStorageManager';
import { useNavigate } from 'react-router-dom';
const AccountManagement = () => {
  const [confirmDeleteUsername, setConfirmDeleteUsername] = useState('');
  const [loadingDeleteSubscription, setLoadingDeleteSubscription] =
    useState(false);
  const navigate = useNavigate();

  const handleDeleteSubscription = async () => {
    const client = LocalStorageManager.shared.client;
    const clientMeal = LocalStorageManager.shared.clientMealSubscription;

    confirmDeleteUsername === client.email
      ? (() => {
          setLoadingDeleteSubscription(true);
          APIClient.deleteScheduleMeals(clientMeal.id).then(() => {
            APIClient.deleteScheduledOrderMeals(clientMeal.id).then(() => {
              APIClient.deleteScheduleSnacks(clientMeal.id).then(() => {
                APIClient.deleteScheduledOrderSnacks(clientMeal.id).then(() => {
                  APIClient.deleteStripeSubscription(
                    clientMeal.stripeSubscriptionId
                  ).then(() => {
                    APIClient.deleteStripeCustomer(client.stripeId).then(() => {
                      APIClient.deactivateClient(client.id).then(() => {
                        APIClient.deactivateMealSubscription(
                          clientMeal.id
                        ).then(() => {
                          setLoadingDeleteSubscription(false);

                          navigate('/client-log-in');
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        })()
      : alert('Please enter your username to confirm deletion.');
  };

  return (
    <Grid container item className={styles.pageContainer} xs={10}>
      <Grid item container className={styles.childContainer}>
        <Typography id={'account-management-header'} className={styles.header}>
          Manage Your Account
        </Typography>
      </Grid>

      {/* Close Account Section */}
      <Grid container item className={styles.contentContainer}>
        <Grid container item className={styles.cardContainer}>
          <Grid item container>
            <Grid item>
              <Typography className={styles.closeAccountText}>
                Close Account
              </Typography>
              <Typography>
                Closing your account is permanent and irreversible.
              </Typography>
            </Grid>
          </Grid>
          <Grid container item lg={6} className={styles.buttonContainer}>
            <Grid item>
              <TextField
                className={styles.confirmUsernameField}
                label="Confirm email"
                value={confirmDeleteUsername}
                onChange={(event) =>
                  setConfirmDeleteUsername(event.target.value)
                }
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                className={styles.closeAccountLink}
                onClick={handleDeleteSubscription}
              >
                {loadingDeleteSubscription ? (
                  <CircularProgress size={24} className={styles.progress} />
                ) : (
                  'Close account'
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AccountManagement;
