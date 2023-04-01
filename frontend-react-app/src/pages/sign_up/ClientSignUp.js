import LocalStorageManager from '../../helpers/LocalStorageManager.js';
import ClientMenu from './client_menu/ClientMenu';
import AccountRegistration from './account_registration/AccountRegistration';
import PaymentForm from './payment_form/PaymentForm';
import Checkout from './Checkout.js';
import APIClient from '../../helpers/APIClient';
import MealSubscription from '../../data_models/model/MealSubscription.js';
import MealSubscriptionDTO from '../../data_models/dto/MealSubscriptionDTO.js';
import MealSubscriptionInvoice from '../../data_models/model/MealSubscriptionInvoice.js';
import MealSubscriptionInvoiceDTO from '../../data_models/dto/MealSubscriptionInvoiceDTO.js';
import OrderMealDTO from '../../data_models/dto/OrderMealDTO.js';
import Client from '../../data_models/model/Client';
import ClientDTO from '../../data_models/dto/ClientDTO';
import ClientPreSelectedMenu from './client_pre_selected_menu/ClientPreSelectedMenu';
import ClientOrderSummary from './ClientOrderSummary.js';
import ScheduleMealDTO from '../../data_models/dto/ScheduleMealDTO.js';
import ScheduledOrderMealDTO from '../../data_models/dto/ScheduledOrderMealDTO.js';
import createInitialOrderMeals from './helpers/createInitialOrderMeals.js';
import Grid from '@mui/material/Grid';
import { Elements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
const SignUpPage = (props) => {
  const [clientSecret, setClientSecret] = useState(false);
  const [stripeSubscriptionId, setStripeSubscriptionId] = useState(false);
  const [clientPassword, setClientPassword] = useState(false);
  const [client, setClient] = useState(false);
  const [mealSubscription, setMealSubscription] = useState(false);
  const [scheduleMeals, setScheduleMeals] = useState([]);
  const [scheduledOrderMeals, setScheduledOrderMeals] = useState([]);
  const [orderDiscount, setOrderDiscount] = useState(false);
  const [discountCode, setDiscountCode] = useState(false);
  const taskIndexArray = [
    'AccountRegistration',
    'ClientMenu',
    'Checkout',
    'Payment',
  ];

  const handleSubmit = async () => {
    const rehydratedClientDTO = ClientDTO.initializeFromForm(client);
    const returnedClientData = await APIClient.createClient(
      rehydratedClientDTO
    );
    if (!rehydratedClientDTO) {
      alert(APIClient.networkErrorMessage);
    }
    const returnedClientDTO = new ClientDTO(returnedClientData);
    const returnedClient = new Client(returnedClientDTO);
    LocalStorageManager.shared.client = returnedClient;

    const newMealSubscription = new MealSubscription(mealSubscription);
    newMealSubscription.stripeSubscriptionId = stripeSubscriptionId;
    newMealSubscription.dietitianId = returnedClient.dietitianId;

    const newMealSubscriptionDTO =
      MealSubscriptionDTO.initializeFromMealSubscription(newMealSubscription);
    const createdSubscription = await APIClient.createMealSubscription(
      newMealSubscriptionDTO,
      // Store discount in local storage because setting it in state is disruptive to the UI
      LocalStorageManager.shared.orderDiscount
    );
    LocalStorageManager.shared.clientMealSubscription = createdSubscription;

    const scheduleMealDTOs = scheduleMeals.map((scheduleMeal) =>
      ScheduleMealDTO.initializeFromScheduleMeal(scheduleMeal)
    );

    await APIClient.createScheduleMeals(scheduleMealDTOs);

    const scheduledOrderMealDTOs = scheduledOrderMeals.map(
      (scheduledOrderMeal) =>
        ScheduledOrderMealDTO.initializeFromScheduledOrderMeal(
          scheduledOrderMeal
        )
    );

    await APIClient.createScheduledOrderMeals(scheduledOrderMealDTOs);

    // Create first invoice

    const newMealSubscriptionInvoiceId = uuid();
    const newMealSubscriptionInvoice =
      MealSubscriptionInvoice.createInitialInvoice({
        mealSubscriptionInvoiceId: newMealSubscriptionInvoiceId,
        mealSubscriptionId: createdSubscription.id,
        deliveryDate: scheduledOrderMealDTOs[0].deliveryDate,
      });
    // Create first order meals
    const initialOrderMeals = createInitialOrderMeals(
      newMealSubscriptionInvoice.id,
      scheduledOrderMeals
    );

    // Post first invoice to the backend
    const mealSubscriptionInvoiceDTO =
      MealSubscriptionInvoiceDTO.initializeFromMealSubscriptionInvoice(
        newMealSubscriptionInvoice
      );
    await APIClient.createMealSubscriptionInvoice(mealSubscriptionInvoiceDTO);

    const orderMealDTOArray = [];
    for (const orderMeal of initialOrderMeals) {
      const orderMealDTO = OrderMealDTO.initializeFromOrderMeal(orderMeal);
      orderMealDTOArray.push(orderMealDTO);
    }

    await APIClient.createOrderMeals(orderMealDTOArray);
    return;
  };
  const getPaymentElement = () => {
    if (clientSecret) {
      const appearance = {
        theme: 'stripe',
      };
      const stripeOptions = {
        clientSecret,
        appearance,
      };
      return (
        <Elements
          options={stripeOptions}
          stripe={props.stripePromise}
          key={clientSecret}
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
                numMeals={scheduleMeals.length}
                clientSecret={clientSecret}
                returnUrl={APIClient.getClientHomeUrl()}
                discountCode={discountCode}
                handleSubmit={() => handleSubmit()}
              />
            </Grid>
            <Grid item lg={3} md={4}>
              <ClientOrderSummary
                discountCode={discountCode}
                orderDiscount={orderDiscount}
                prepaid={props.stagedClient.mealsPrepaid}
                stagedClientId={props.stagedClient.id}
                shippingCost={props.shippingCost}
                scheduleMeals={scheduleMeals}
              />
            </Grid>
          </Grid>
        </Elements>
      );
    } else {
      return <></>;
    }
  };
  const ContainerObject = {};
  ContainerObject['AccountRegistration'] = (
    <AccountRegistration
      stripePriceId={props.stripePriceId}
      stagedClientId={props.stagedClient.id}
      dietitianId={props.stagedClient.dietitianId}
      shippingCost={props.shippingCost}
      updateMealSubscription={(newMealSubscription) => {
        setMealSubscription(newMealSubscription);
        props.updateTaskIndex(1);
      }}
      updateClientPassword={(newPassword) => setClientPassword(newPassword)}
    />
  );
  ContainerObject['ClientMenu'] = (() => {
    if (
      props.stagedClient.mealsPrepaid ||
      props.stagedClient.mealsPreSelected
    ) {
      return (
        <ClientPreSelectedMenu
          meals={props.extendedMeals}
          mealSubscriptionId={mealSubscription.id}
          stagedClientId={props.stagedClient.id}
          updateMealsData={(newScheduleMeals, newScheduledOrderMeals) => {
            setScheduleMeals(newScheduleMeals);
            setScheduledOrderMeals(newScheduledOrderMeals);
            props.updateTaskIndex(2);
          }}
        />
      );
    } else {
      return (
        <ClientMenu
          extendedMeals={props.extendedMeals}
          mealSubscriptionId={mealSubscription.id}
          userId={props.stagedClient.id}
          editMeals={false}
          dietitianChoosingClientMeals={false}
          updateMealsData={(newScheduleMeals, newScheduledOrderMeals) => {
            setScheduleMeals(newScheduleMeals);
            setScheduledOrderMeals(newScheduledOrderMeals);
            props.updateTaskIndex(2);
          }}
        />
      );
    }
  })();
  ContainerObject['Checkout'] = (
    <Checkout
      shippingCost={props.shippingCost}
      stagedClient={props.stagedClient}
      clientPassword={clientPassword}
      scheduleMeals={scheduleMeals}
      stripePromse={props.stripePromise}
      updateTaskIndex={() => props.updateTaskIndex(3)}
      setClient={(newClient) => setClient(newClient)}
      setClientSecret={(newClientSecret) => setClientSecret(newClientSecret)}
      setStripeSubscriptionId={(newStripeSubscriptionId) =>
        setStripeSubscriptionId(newStripeSubscriptionId)
      }
      setOrderDiscount={(newOrderDiscount) =>
        setOrderDiscount(newOrderDiscount)
      }
      setDiscountCode={(newDiscountCode) => setDiscountCode(newDiscountCode)}
    />
  );

  ContainerObject['Payment'] = getPaymentElement();
  if (props.stagedClient) {
    return ContainerObject[`${taskIndexArray[props.taskIndex]}`];
  } else {
    return <></>;
  }
};
export default SignUpPage;
