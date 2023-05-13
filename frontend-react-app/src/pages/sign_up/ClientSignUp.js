import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import LocalStorageManager from '../../helpers/LocalStorageManager.js';
import ClientMenu from './client_menu/ClientMenu';
import AccountRegistration from './account_registration/AccountRegistration';
import Checkout from './Checkout.js';
import APIClient from '../../helpers/APIClient';
import MealSubscription from '../../data_models/model/MealSubscription.js';
import MealSubscriptionDTO from '../../data_models/dto/MealSubscriptionDTO.js';
import MealSubscriptionInvoice from '../../data_models/model/MealSubscriptionInvoice.js';
import MealSubscriptionInvoiceDTO from '../../data_models/dto/MealSubscriptionInvoiceDTO.js';
import OrderMealDTO from '../../data_models/dto/OrderMealDTO.js';
import OrderSnackDTO from '../../data_models/dto/OrderSnackDTO.js';
import Client from '../../data_models/model/Client';
import ClientDTO from '../../data_models/dto/ClientDTO';
import ClientPreSelectedMenu from './client_menu/ClientPreSelectedMenu.js';
import ScheduleMealDTO from '../../data_models/dto/ScheduleMealDTO.js';
import ScheduledOrderMealDTO from '../../data_models/dto/ScheduledOrderMealDTO.js';
import createInitialOrderMeals from './helpers/createInitialOrderMeals.js';
import createInitialOrderSnacks from './helpers/createInitialOrderSnacks.js';
import Payment from './Payment.js';
import ScheduleSnackDTO from '../../data_models/dto/ScheduleSnackDTO.js';
import ScheduledOrderSnackDTO from '../../data_models/dto/ScheduledOrderSnackDTO.js';
const SignUpPage = (props) => {
  const [clientSecret, setClientSecret] = useState(false);
  const [stripeSubscriptionId, setStripeSubscriptionId] = useState(false);
  const [clientPassword, setClientPassword] = useState(false);
  const [client, setClient] = useState(false);
  const [mealSubscription, setMealSubscription] = useState(false);
  const [scheduleMeals, setScheduleMeals] = useState([]);
  const [scheduledOrderMeals, setScheduledOrderMeals] = useState([]);
  const [scheduleSnacks, setScheduleSnacks] = useState([]);
  const [scheduledOrderSnacks, setScheduledOrderSnacks] = useState([]);

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
      newMealSubscriptionDTO
    );
    LocalStorageManager.shared.clientMealSubscription = createdSubscription;

    if (orderDiscount) {
      await APIClient.createOrderDiscount(orderDiscount);
    }

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
    if (scheduleSnacks.length > 0) {
      const scheduleSnackDTOs = scheduleSnacks.map((scheduleSnack) =>
        ScheduleSnackDTO.initializeFromScheduleSnack(scheduleSnack)
      );
      await APIClient.createScheduleSnacks(scheduleSnackDTOs);
      const scheduledOrderSnackDTOs = scheduledOrderSnacks.map(
        (scheduledOrderSnack) =>
          ScheduledOrderSnackDTO.initializeFromScheduledOrderSnack(
            scheduledOrderSnack
          )
      );
      await APIClient.createScheduledOrderSnacks(scheduledOrderSnackDTOs);
    }

    // Create first invoice
    const newMealSubscriptionInvoiceId = uuid();
    const newMealSubscriptionInvoice =
      MealSubscriptionInvoice.createInitialInvoice({
        mealSubscriptionInvoiceId: newMealSubscriptionInvoiceId,
        mealSubscriptionId: createdSubscription.id,
        deliveryDate: scheduledOrderMealDTOs[0].deliveryDate,
      });

    const firstWeekScheduledOrderMeals = scheduledOrderMeals.filter(
      (scheduledOrderMeal) =>
        scheduledOrderMeal.deliveryDate.getTime() ===
        newMealSubscriptionInvoice.deliveryDate.getTime()
    );
    // Create first order meals
    const initialOrderMeals = createInitialOrderMeals(
      newMealSubscriptionInvoice.id,
      firstWeekScheduledOrderMeals
    );

    // Post first invoice to the backend
    const mealSubscriptionInvoiceDTO =
      MealSubscriptionInvoiceDTO.initializeFromMealSubscriptionInvoice(
        newMealSubscriptionInvoice
      );

    await APIClient.createMealSubscriptionInvoice(
      mealSubscriptionInvoiceDTO,
      discountCode
    );

    const orderMealDTOArray = [];
    for (const orderMeal of initialOrderMeals) {
      const orderMealDTO = OrderMealDTO.initializeFromOrderMeal(orderMeal);
      orderMealDTOArray.push(orderMealDTO);
    }

    await APIClient.createOrderMeals(orderMealDTOArray);

    // Create first order snacks
    if (scheduleSnacks.length > 0) {
      const firstWeekScheduledOrderSnacks = scheduledOrderSnacks.filter(
        (scheduledOrderSnack) =>
          scheduledOrderSnack.deliveryDate.getTime() ===
          newMealSubscriptionInvoice.deliveryDate.getTime()
      );
      const initialOrderSnacks = createInitialOrderSnacks(
        newMealSubscriptionInvoice.id,
        firstWeekScheduledOrderSnacks
      );
      const orderSnackDTOArray = [];
      for (const orderSnack of initialOrderSnacks) {
        const orderSnackDTO =
          OrderSnackDTO.initializeFromOrderSnack(orderSnack);
        orderSnackDTOArray.push(orderSnackDTO);
      }
      await APIClient.createOrderSnacks(orderSnackDTOArray);
    }
    return;
  };

  const ContainerObject = {};
  ContainerObject['AccountRegistration'] = (
    <AccountRegistration
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
          snacks={props.snacks}
          mealSubscriptionId={mealSubscription.id}
          userId={props.stagedClient.id}
          editMeals={false}
          dietitianChoosingClientMeals={false}
          updateMealsData={(
            newScheduleMeals,
            newScheduledOrderMeals,
            newScheduleSnacks,
            newScheduledOrderSnacks
          ) => {
            setScheduleMeals(newScheduleMeals);
            setScheduledOrderMeals(newScheduledOrderMeals);
            setScheduleSnacks(newScheduleSnacks);
            setScheduledOrderSnacks(newScheduledOrderSnacks);
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
      scheduleSnacks={scheduleSnacks}
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

  ContainerObject['Payment'] = (
    <Payment
      clientSecret={clientSecret}
      stripePromise={props.stripePromise}
      scheduleMeals={scheduleMeals}
      scheduleSnacks={scheduleSnacks}
      discountCode={discountCode}
      orderDiscount={orderDiscount}
      stagedClient={props.stagedClient}
      shippingCost={props.shippingCost}
      handleSubmit={handleSubmit}
    />
  );
  if (props.stagedClient) {
    return ContainerObject[`${taskIndexArray[props.taskIndex]}`];
  } else {
    return <></>;
  }
};
export default SignUpPage;
