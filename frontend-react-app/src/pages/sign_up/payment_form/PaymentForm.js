import { useState } from 'react';
import { PaymentElement } from '@stripe/react-stripe-js';
import { useStripe } from '@stripe/react-stripe-js';
import { useElements } from '@stripe/react-stripe-js';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import FormHelperText from '@mui/material/FormHelperText';
import APIClient from '../../../helpers/APIClient';
import ButtonContainer from './ButtonContainer';
const PaymentForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');
  const handleSubmit = async () => {
    if (props.dietitianPrepaying) {
      await APIClient.createDietitianPrePayment(
        props.numMeals,
        props.numSnacks,
        props.stagedClientId,
        props.dietitianId,
        props.stripePaymentIntentId,
        props.discountCode
      );
    } else {
      await props.handleSubmit();
    }
    const { error } = stripe.confirmPayment({
      // Elements instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: props.returnUrl ?? 'https://bendito.io/',
      },
    });
    if (error) {
      setMessage(error.message);
    }
    return false;
  };

  return (
    <Grid
      item
      container
      sx={{
        height: '100%',
      }}
    >
      <Card variant={'outlined'}>
        <Grid
          container
          padding={'2vh 2vw 2vh 2vw'}
          justifyContent={'space-between'}
        >
          <Grid item xs={12}>
            <Typography
              fontSize={'1.7rem'}
              textAlign={'start'}
              marginBottom={'3vh'}
            >
              Payment Information
            </Typography>
          </Grid>

          <Grid container item xs={12} justifyContent={'center'}>
            {/* Stripe Checkout Form */}
            <Grid item xs={12} id="pre-stripe-grid">
              <PaymentElement id="pre-loaded-stripe-frame" />
            </Grid>
            <Grid item container xs={12} justifyContent={'center'} mt={2}>
              <ButtonContainer
                handleSubmit={() => handleSubmit()}
              ></ButtonContainer>
            </Grid>
            <Grid item container xs={12} justifyContent={'center'}>
              {message && (
                <FormHelperText
                  error={true}
                  sx={{
                    fontSize: '.9rem',
                    padding: '10px 12px',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    paddingBottom: '2vh',
                    fontWeight: 'bold',
                  }}
                >
                  {message}
                </FormHelperText>
              )}
            </Grid>
            {/* Stripe Checkout Form */}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};
export default PaymentForm;
