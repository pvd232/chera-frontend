import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import APIC from '../../../helpers/APIC';
import LocalStorageManager from '../../../helpers/LocalStorageManager';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import clientPayment from './scss/ClientPayment.module.scss'
import { Button } from '@mui/material';


const CardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(LocalStorageManager.shared.clientMealSubscription);


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
      console.log('Payment Method:', paymentMethod);
      const resp = await APIC.updateClientPaymentMethod(LocalStorageManager.shared.client.stripeId, LocalStorageManager.shared.clientMealSubscription.stripeSubscriptionId, paymentMethod.id);
      console.log(resp)
      navigate('/home');
    }
  };

  return (
    <form id="card-form" onSubmit={handleSubmit} style={{ width: '300px' }}>
      <div id="card-element" style={{ display: 'grid', gap: '10px' }}>
        <CardElement />
        
      </div>
      <Button variant={'contained'} className={clientPayment.button} type="submit">Submit</Button>
    </form>
  );
};
const ClientPayment = (props) => {
  const [curPaymentLast4, setcurPaymentLast4] = useState('');
  const [curPaymentExpMonth, setcurPaymentExpMonth] = useState('');
  const [curPaymentExpYear, setcurPaymentExpYear] = useState('');
  useEffect(() => {
    const fetchClientPaymentMethod = async () => {
      const resp = await APIC.getClientPaymentMethod(LocalStorageManager.shared.client.stripeId);
      console.log(resp);
      setcurPaymentLast4(resp.last4)
      setcurPaymentExpMonth(resp.exp_month)
      setcurPaymentExpYear(resp.exp_year)
    };
    fetchClientPaymentMethod();
  }, []);


  return (
    <Grid container className={clientPayment.rootContainer}>
      <Grid container item className={clientPayment.headerContainer}>
        <Typography className={clientPayment.header} >
          Payment
        </Typography>
        <Grid item>
          <Stack className={clientPayment.stack}>
            <Typography  >
              Your Current Payment Method
            </Typography>
            Card: **** **** **** {curPaymentLast4}
            <br />
            Expiry: {curPaymentExpMonth} / {curPaymentExpYear}
          </Stack>
        </Grid>
        <Grid item>
          <Stack className={clientPayment.stack}>
            <Typography>Add New Card:</Typography>
            <Elements stripe={props.stripePromise}>
              <CardForm />
            </Elements>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ClientPayment;
