import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Button from '@mui/material/Button';
import LocalStorageManager from '../../../../../helpers/LocalStorageManager';
import APIC from '../../../../../helpers/APIC';
import styles from './scss/CardForm.module.scss';
import { CircularProgress, Grid, Stack } from '@mui/material';
import { useState } from 'react';

export const CardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      APIC.updateClientPaymentMethod(
        LocalStorageManager.shared.client.stripeId,
        LocalStorageManager.shared.clientMealSubscription.stripeSubscriptionId,
        paymentMethod.id
      ).then(() => {
        setLoading(false);
        window.location.reload();
      });
    }
  };

  return (
    <form
      id="card-form"
      onSubmit={handleSubmit}
      className={styles.updateCardContainer}
    >
      <Stack className={styles.stack}>
        <CardElement />

        <Grid container>
          <Grid item xs={6}>
            <Button
              variant={'contained'}
              className={styles.submitButton}
              type="submit"
            >
              {loading ? (
                <CircularProgress size={20} className={styles.progress} />
              ) : (
                'Submit'
              )}
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </form>
  );
};
