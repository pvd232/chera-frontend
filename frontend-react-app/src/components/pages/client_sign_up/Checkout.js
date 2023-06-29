import LocalStorageManager from '../../../helpers/LocalStorageManager.ts';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import DeliveryForm from './DeliveryForm.js';
import APIClient from '../../../helpers/APIClient.js';
import DiscountOrderSummary from './discount_order_summary/DiscountOrderSummary.js';

const Checkout = (props) => {
  const [editAddress, setEditAddress] = useState(
    // if the client secret exists then this page is being rerendered and the address has already been inputted and is not being edited
    true
  );
  const handleSubmit = async (newClient) => {
    const subscriptionData = await APIClient.createStripeSubscription(
      props.scheduleMeals.length,
      props.scheduleSnacks.length,
      // Use the zipcode the client inputted, encase they did so incorrectly in the AccountRegistration page
      newClient.zipcode,
      newClient.id,
      LocalStorageManager.shared.discount
        ? LocalStorageManager.shared.discount.code
        : '',
      props.stagedClient.mealsPrepaid ? true : false
    );
    newClient.stripeId = subscriptionData.client_stripe_id;
    props.setClient(newClient);
    props.setClientSecret(subscriptionData.client_secret);
    props.setStripeSubscriptionId(subscriptionData.stripe_subscription_id);
    props.updateTaskIndex();
  };

  return (
    <Grid
      container
      justifyContent={'center'}
      marginBottom={'10vh'}
      marginTop={'5vh'}
      columnGap={3}
      rowGap={3}
    >
      <Grid
        item
        container
        justifyContent={
          props.stagedClient.mealsPrepaid ? 'center' : 'flex-start'
        }
        md={props.stagedClient.mealsPrepaid ? '' : 7}
        lg={props.stagedClient.mealsPrepaid ? '' : 5}
      >
        {/* Address and Phone Number */}
        <DeliveryForm
          updateEditAddress={() => {
            setEditAddress((prevEditAddress) => !prevEditAddress);
          }}
          editAddress={editAddress}
          handleSubmit={(newClient) => handleSubmit(newClient)}
          clientPassword={props.clientPassword}
          stagedClientId={props.stagedClient.id}
          dietitianId={props.stagedClient.dietitianId}
          mealPlanId={props.stagedClient.mealPlanId}
        />
      </Grid>
      {!props.stagedClient.mealsPrepaid ? (
        <Grid item container lg={5} md={4}>
          <DiscountOrderSummary
            stagedClientId={props.stagedClient.id}
            scheduleMeals={props.scheduleMeals}
            scheduleSnacks={props.scheduleSnacks}
            dietitianPrepaying={false}
            setOrderDiscount={(orderDiscount) =>
              props.setOrderDiscount(orderDiscount)
            }
            setDiscountCode={(discount) => props.setDiscountCode(discount)}
            mealPrice={props.mealPrice}
            snackPrice={props.snackPrice}
          />
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
};
export default Checkout;
