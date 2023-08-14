import { Elements } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import APIC from '../../../../../helpers/APIC';
import LocalStorageManager from '../../../../../helpers/LocalStorageManager';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import styles from './scss/ClientPayment.module.scss';
import { CardForm } from './CardForm';
import { CircularProgress } from '@mui/material';
const PaymentMethods = (props) => {
  const [loading, setLoading] = useState(true);
  const [curPaymentLast4, setcurPaymentLast4] = useState('');
  const [curPaymentExpMonth, setcurPaymentExpMonth] = useState('');
  const [curPaymentExpYear, setcurPaymentExpYear] = useState('');
  useEffect(() => {
    APIC.getClientPaymentMethod(
      LocalStorageManager.shared.client.stripeId
    ).then((resp) => {
      setcurPaymentLast4(resp.last4);
      setcurPaymentExpMonth(resp.exp_month);
      setcurPaymentExpYear(resp.exp_year);
      setLoading(false);
    });
  }, []);

  return (
    <Grid container className={styles.rootContainer} xs={10}>
      <Grid container item className={styles.headerContainer}>
        <Grid item>
          <Typography className={styles.header}>Payment Method</Typography>
        </Grid>
      </Grid>
      {loading ? (
        <Grid container item className={styles.loadingContainer}>
          <CircularProgress size={24} className={styles.progress} />
        </Grid>
      ) : (
        <Grid item container className={styles.contentContainer}>
          <Grid item container>
            <Stack className={styles.stack}>
              <Typography className={styles.contentHeader}>
                Current Payment Method
              </Typography>
              <Typography>Card: **** **** **** {curPaymentLast4}</Typography>
              <Typography>
                Expiration: {curPaymentExpMonth} / {curPaymentExpYear}
              </Typography>
            </Stack>
          </Grid>
          <Grid item container>
            <Stack className={styles.stack}>
              <Typography className={styles.contentHeader}>
                Update Payment Method:
              </Typography>
              <Elements stripe={props.stripePromise}>
                <CardForm />
              </Elements>
            </Stack>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default PaymentMethods;
