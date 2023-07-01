import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import previousDeliveries from './scss/PreviousDeliveries.module.scss';
import APIC from '../../../helpers/APIC';
import LocalStorageManager from '../../../helpers/LocalStorageManager';
import { Elements } from '@stripe/react-stripe-js';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import Card from '@mui/material/Card';
import ButtonContainer from '../client_sign_up/payment_form/ButtonContainer';
import { useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText';


const CardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');


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
      

      stripe.createToken(cardElement).then(function(result) {
        if (result.error) {
          console.log("Error adding new card")
          console.error(result.error);
        } else {
          var token = result.token.id;
          console.log(token);

          const resp = APIC.updateClientPaymentMethod(LocalStorageManager.shared.client.stripeId, LocalStorageManager.shared.clientMealSubscription.stripeSubscriptionId, token);
          console.log(resp)
        }
      });

      
    }
  };

  return (
    <form id="card-form" onSubmit={handleSubmit}>
      <div id="card-element" style={{ display: 'grid', gap: '10px' }}>
      <CardElement options={{
      style: {
        base: {
          display: 'flex',
          marginBottom: '10px',
        },
      },
    }} />
      </div>
      <button type="submit">Submit</button>
    </form>



    // <Grid
    //   item
    //   container
    //   sx={{
    //     height: '100%',
    //   }}
    // >
    //   <Card variant={'outlined'}>
    //     <Grid
    //       container
    //       padding={'2vh 2vw 2vh 2vw'}
    //       justifyContent={'space-between'}
    //     >
    //       <Grid item xs={12}>
    //         <Typography
    //           fontSize={'1.7rem'}
    //           textAlign={'start'}
    //           marginBottom={'3vh'}
    //         >
    //           Payment Information
    //         </Typography>
    //       </Grid>

    //       <Grid container item xs={12} justifyContent={'center'}>
    //         {/* Stripe Checkout Form */}
    //         <Grid item xs={12} id="pre-stripe-grid">
    //           <PaymentElement id="pre-loaded-stripe-frame" />
    //         </Grid>
    //         <Grid item container xs={12} justifyContent={'center'} mt={2}>
    //           <ButtonContainer
    //             handleSubmit={() => handleSubmit()}
    //           ></ButtonContainer>
    //         </Grid>
    //         <Grid item container xs={12} justifyContent={'center'}>
    //           {message && (
    //             <FormHelperText
    //               error={true}
    //               sx={{
    //                 fontSize: '.9rem',
    //                 padding: '10px 12px',
    //                 marginRight: 'auto',
    //                 marginLeft: 'auto',
    //                 paddingBottom: '2vh',
    //                 fontWeight: 'bold',
    //               }}
    //             >
    //               {message}
    //             </FormHelperText>
    //           )}
    //         </Grid>
    //         {/* Stripe Checkout Form */}
    //       </Grid>
    //     </Grid>
    //   </Card>
    // </Grid>




  );
};
const ClientPayment = (props) => {
  const [curPayment, setcurPayment] = useState('');
  useEffect(() => {
    const fetchClientPaymentMethod = async () => {
      console.log(LocalStorageManager.shared.client);
      const resp = await APIC.getClientPaymentMethod(LocalStorageManager.shared.client.stripeId);
      console.log(resp);
      setcurPayment(resp)
    };

    fetchClientPaymentMethod();
  }, []);


  return (
    <Grid container item  xs={10}>
      <Grid item>
      <br />
      <br />
      <br />
        <Typography id={'previous-deliveries-header'} >
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
