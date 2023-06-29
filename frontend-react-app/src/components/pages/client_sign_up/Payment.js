import Grid from '@mui/material/Grid';
import { Elements } from '@stripe/react-stripe-js';
import APIClient from '../../../helpers/APIClient';
import PaymentForm from './payment_form/PaymentForm';
import ClientOrderSummary from './ClientOrderSummary.js';
const Payment = (props) => {
  if (props.clientSecret) {
    const appearance = {
      theme: 'stripe',
    };
    const stripeOptions = {
      clientSecret: props.clientSecret,
      appearance: appearance,
    };
    return (
      <Elements
        options={stripeOptions}
        stripe={props.stripePromise}
        key={props.clientSecret}
      >
        <Grid
          container
          justifyContent={'center'}
          sx={{ position: 'fixed', top: '25%', bottom: '25%' }}
          columnGap={3}
        >
          <Grid item md={6}>
            <PaymentForm
              dietitianPrepaying={false}
              numMeals={props.scheduleMeals.length}
              clientSecret={props.clientSecret}
              returnUrl={APIClient.getClientHomeUrl()}
              discountCode={props.discountCode}
              handleSubmit={() => props.handleSubmit()}
            />
          </Grid>
          <Grid item lg={3} md={4}>
            <ClientOrderSummary
              discountCode={props.discountCode}
              orderDiscount={props.orderDiscount}
              prepaid={props.stagedClient.mealsPrepaid}
              stagedClientId={props.stagedClient.id}
              scheduleMeals={props.scheduleMeals}
              scheduleSnacks={props.scheduleSnacks}
              mealPrice={props.mealPrice}
              snackPrice={props.snackPrice}
            />
          </Grid>
        </Grid>
      </Elements>
    );
  } else {
    return <></>;
  }
};
export default Payment;
