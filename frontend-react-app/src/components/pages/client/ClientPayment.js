import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import APIC from '../../../helpers/APIC';
import LocalStorageManager from '../../../helpers/LocalStorageManager';
import { useNavigate } from 'react-router-dom';

const CardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      navigate('/home');
    }
  };

  return (
    <form id="card-form" onSubmit={handleSubmit}>
      <div id="card-element" style={{ display: 'grid', gap: '10px' }}>
        <CardElement
          options={{
            style: {
              base: {
                display: 'flex',
                marginBottom: '10px',
              },
            },
          }}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
const ClientPayment = (props) => {
  const [curPayment, setcurPayment] = useState('');
  useEffect(() => {
    const fetchClientPaymentMethod = async () => {
      const resp = await APIC.getClientPaymentMethod(
        LocalStorageManager.shared.client.stripeId
      );
      setcurPayment(resp);
    };

    fetchClientPaymentMethod();
  }, []);

  return (
    <Grid container item xs={10}>
      <Grid item>
        <br />
        <br />
        <br />
        <Typography id={'previous-deliveries-header'}>
          Your Current Payment Method: **** **** **** {curPayment}
        </Typography>
        <br />
        <br />
        <br />
        <Typography>Add New Card:</Typography>
        <Elements stripe={props.stripePromise}>
          <CardForm />
        </Elements>
      </Grid>
    </Grid>
  );
};

export default ClientPayment;
