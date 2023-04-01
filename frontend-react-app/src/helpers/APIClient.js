import { Buffer } from 'buffer';
import getBaseURL from './getBaseURL';
class APIClient {
  constructor() {
    // Host name will be localhost will running async tests in jest
    if (
      window.location.host === 'localhost:3000' ||
      window.location.host === 'localhost'
    ) {
      this.env = 'debug';
      this.baseUrl = getBaseURL('api');
      this.frontEndBaseUrl = getBaseURL('frontend');
      this.mode = 'cors';
    } else if (window.location.host === 'staging.bendito.io') {
      this.env = 'staging-production';
      this.baseUrl = getBaseURL('api');
      this.frontEndBaseUrl = getBaseURL('frontend');
      this.mode = 'same-origin';
    } else {
      this.env = 'production';
      this.baseUrl = getBaseURL('api');
      this.frontEndBaseUrl = getBaseURL('frontend');
      this.mode = 'same-origin';
    }
  }
  get networkErrorMessage() {
    return 'An error occured. Please check your network connection and try again.';
  }
  async fetchWrapper(request, requestParams) {
    const response = await fetch(request, requestParams).catch((error) => {
      if (this.env === 'debug' || this.env === 'staging-production') {
        if (typeof error.json === 'function') {
          error
            .json()
            .then((jsonError) => {
              console.log('Json error from API');
              throw new Error(jsonError);
            })
            .catch(() => {
              console.log('Generic error from API');
              throw new Error(error.statusText);
            });
        } else {
          console.log('Fetch error');
          throw new Error(error);
        }
      } else {
        if (typeof error.json === 'function') {
          error
            .json()
            .then((jsonError) => {
              console.log('Json error from API', jsonError);
            })
            .catch(() => {
              console.log('Generic error from API', error.statusText);
            });
        } else {
          console.log('Fetch error', error);
        }
        return false;
      }
    });
    return response;
  }
  async getCurrentWeekDeliveryandCutoffDates() {
    const requestUrl = this.baseUrl + `/delivery_date`;

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const responseData = await response.json();
    return responseData;
  }
  async getExtendedScheduledOrderMeals(mealSubscriptionId) {
    const requestUrl =
      this.baseUrl +
      `/extended_scheduled_order_meal?meal_subscription_id=${mealSubscriptionId}`;

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const responseData = await response.json();
    return responseData;
  }
  getPaidStagedMealsReturnUrl(stagedClientId) {
    if (this.env === 'debug') {
      return (
        this.frontEndBaseUrl +
        `/d-home-payment-confirmed?stagedClientId=${stagedClientId}`
      );
    } else {
      return (
        this.baseUrl +
        `/d-home-payment-confirmed?stagedClientId=${stagedClientId}`
      );
    }
  }
  // Admin methods
  async getAdminDietitians() {
    const requestUrl = this.baseUrl + '/dietitian/admin';

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const responseData = await response.json();
    return responseData;
  }
  async getAdminMealSubscriptions() {
    const requestUrl = this.baseUrl + '/meal_subscription/admin';

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const scheduleMealSubscriptions = await response.json();
    return scheduleMealSubscriptions;
  }
  async getAdminStagedClients() {
    const requestUrl = `${this.baseUrl}/staged_client/admin`;

    const request = new Request(requestUrl);

    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);

    const responseData = await response.json();
    return responseData;
  }
  async getAdminScheduledOrderMeals() {
    const requestUrl = this.baseUrl + '/scheduled_order_meal/admin';
    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };

    const response = await this.fetchWrapper(request, requestParams);
    const scheduledOrderMealJSON = await response.json();

    return scheduledOrderMealJSON;
  }
  async getAdminClients() {
    const requestUrl = `${this.baseUrl}/client/admin`;

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const clientData = await response.json();
    return clientData;
  }
  async getAdminScheduleMeals() {
    const requestUrl = this.baseUrl + '/schedule_meal/admin';

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);

    const scheduleMeals = await response.json();
    return scheduleMeals;
  }

  // Dietitian methods
  async updateDietitianPassword(formValues) {
    const requestUrl = this.baseUrl + '/dietitian/reset_password';

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'PUT',
      body: JSON.stringify(formValues),
      mode: this.mode,
      cache: 'default',
    };

    const updatedDietitanData = await this.fetchWrapper(request, requestParams);
    const updatedDietitan = await updatedDietitanData.json();
    return updatedDietitan;
  }
  async updateClientMealSubscriptionId(clientId, mealSubscriptionId) {
    const requestUrl = `${this.baseUrl}/client/${clientId}?meal_subscription_id=${mealSubscriptionId}`;

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'PUT',
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(request, requestParams);
    return;
  }
  async updateClientPassword(formValues) {
    const requestUrl = this.baseUrl + '/client/password';

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'PUT',
      body: JSON.stringify(formValues),
      mode: this.mode,
      cache: 'default',
    };

    const response = await this.fetchWrapper(request, requestParams);
    const updatedClient = await response.json();
    return updatedClient;
  }
  async requestResetDietitianPassword(email) {
    const requestUrl = this.baseUrl + '/dietitian/reset_password';

    const requestHeaders = new Headers();
    requestHeaders.set('dietitian-id', email);

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      headers: requestHeaders,
      mode: this.mode,
      cache: 'default',
    };

    const response = await this.fetchWrapper(request, requestParams);
    // Unauthorized dietitianId
    if (response.status === 401) {
      return false;
    } else {
      return true;
    }
  }
  async requestResetClientPassword(email) {
    const requestUrl = this.baseUrl + '/client/password';

    const requestHeaders = new Headers();
    requestHeaders.set('client-id', email);

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      headers: requestHeaders,
      mode: this.mode,
      cache: 'default',
    };

    const response = await this.fetchWrapper(request, requestParams);
    // Unauthorized clientId
    if (response.status === 401) {
      return false;
    } else {
      return true;
    }
  }
  async authenticateDietitian(credentials) {
    const requestUrl = this.baseUrl + `/dietitian/authenticate`;

    const requestHeaders = new Headers();
    requestHeaders.set(
      'Authorization',
      'Basic ' +
        Buffer.from(`${credentials.id}:${credentials.password}`).toString(
          'base64'
        )
    );

    const request = new Request(requestUrl);

    const requestParams = {
      method: 'GET',
      headers: requestHeaders,
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    // Dietitian failed to authenticate
    if (response.status === 401) {
      return false;
    } else {
      const dietitianJSON = await response.json();
      return dietitianJSON;
    }
  }
  async getDietitian(dietitianId) {
    const requestUrl = `${this.baseUrl}/dietitian/${dietitianId}`;

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);

    // Dietitian does not exist
    if (response.status === 404) {
      return false;
    } else {
      return true;
    }
  }
  async createDietitian(dietitian) {
    const requestUrl = this.baseUrl + '/dietitian';

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'POST',
      body: JSON.stringify(dietitian),
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const createdDietitianJSON = await response.json();
    return createdDietitianJSON;
  }
  getExtendedStagedClients = async (dietitianId) => {
    const requestUrl = `${this.baseUrl}/extended_staged_client?dietitian_id=${dietitianId}`;
    const request = new Request(requestUrl);

    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };

    const response = await this.fetchWrapper(request, requestParams);
    if (response.status === 204) {
      return null;
    } else {
      const responseData = await response.json();
      return responseData;
    }
  };

  getStagedClient = async (stagedClientId) => {
    const requestUrl = `${this.baseUrl}/staged_client/${stagedClientId}`;

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);

    // Staged client does not exist
    if (response.status === 404) {
      return false;
    }
    const responseData = await response.json();
    return responseData;
  };
  checkIfFirstWeek = async (mealSubscriptionId) => {
    const requestUrl =
      this.baseUrl + `/meal_subscription/${mealSubscriptionId}/first_week`;
    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const isFirstWeek = await response.json();
    return isFirstWeek;
  };
  skipWeek = async (mealSubscriptionId, stripeSubscriptionId, deliveryDate) => {
    const requestUrl = this.baseUrl + '/meal_subscription/skip_week';
    // const requestHeaders = new Headers();
    const skippingData = {
      meal_subscription_id: mealSubscriptionId,
      stripe_subscription_id: stripeSubscriptionId,
      unskipping: false,
      delivery_date: deliveryDate,
    };
    const request = new Request(requestUrl);
    const requestParams = {
      method: 'PUT',
      body: JSON.stringify(skippingData),
      mode: this.mode,
      cache: 'default',
    };
    await this.fetchWrapper(request, requestParams);
    return;
  };
  unskipWeek = async (
    mealSubscriptionId,
    stripeSubscriptionId,
    deliveryDate
  ) => {
    const requestUrl = this.baseUrl + '/meal_subscription/skip_week';
    const skippingData = {
      meal_subscription_id: mealSubscriptionId,
      stripe_subscription_id: stripeSubscriptionId,
      unskipping: true,
      delivery_date: deliveryDate,
    };
    const request = new Request(requestUrl);
    const requestParams = {
      method: 'PUT',
      body: JSON.stringify(skippingData),
      mode: this.mode,
      cache: 'default',
    };
    await this.fetchWrapper(request, requestParams);
    return;
  };
  sendReminderEmail = async (stagedClientId) => {
    const requestUrl = this.baseUrl + '/staged_client/reminder';

    const requestHeaders = new Headers();

    requestHeaders.set('staged-client-id', stagedClientId);

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      headers: requestHeaders,
      mode: this.mode,
      cache: 'default',
    };
    await this.fetchWrapper(request, requestParams);
    return;
  };
  createStagedClient = async (stagedClient) => {
    const requestUrl = this.baseUrl + '/staged_client';

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'POST',
      body: JSON.stringify(stagedClient),
      mode: this.mode,
      cache: 'default',
    };
    await this.fetchWrapper(request, requestParams);
    return;
  };
  async getMealPlans() {
    const requestUrl = `${this.baseUrl}/meal_plan`;
    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const mealPlanData = await response.json();
    return mealPlanData;
  }
  async getExtendedClients(dietitianId) {
    const requestUrl = `${this.baseUrl}/extended_client?dietitian_id=${dietitianId}`;

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    if (response.status === 204) {
      return null;
    } else {
      const clientsData = await response.json();
      return clientsData;
    }
  }

  async getDietitianExtendedScheduleMeals(dietitianId) {
    const requestUrl =
      this.baseUrl + `/extended_schedule_meal?dietitian_id=${dietitianId}`;

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    if (response.status === 204) {
      return [];
    } else {
      const extendedScheduleMeals = await response.json();
      return extendedScheduleMeals;
    }
  }

  async getDietitianMealSubscriptions(dietitianId) {
    const requestUrl =
      this.baseUrl + `/meal_subscription?dietitian_id=${dietitianId}`;

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    if (response.status === 204) {
      return null;
    } else {
      const scheduleMealSubscriptions = await response.json();
      return scheduleMealSubscriptions;
    }
  }
  // Client methods
  async updateStripeSubscription(mealSubscriptionId, numberOfMeals) {
    const requestUrl =
      this.baseUrl +
      `/stripe/subscription?meal_subscription_id=${mealSubscriptionId}`;

    const requestHeaders = new Headers();
    requestHeaders.set('number-of-meals', numberOfMeals);

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'PUT',
      headers: requestHeaders,
      mode: this.mode,
      cache: 'default',
    };
    await this.fetchWrapper(request, requestParams);
    return;
  }
  async createStripeSubscription(
    numberOfMeals,
    clientId,
    discountCode,
    prepaid
  ) {
    const requestUrl = this.baseUrl + '/stripe/subscription';

    const requestBody = {
      client_id: clientId,
      number_of_meals: numberOfMeals,
      discount_code: discountCode,
      prepaid: prepaid,
    };

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'POST',
      body: JSON.stringify(requestBody),
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);

    const stripeData = await response.json();
    return stripeData;
  }

  async authenticateClient(credentials) {
    const requestUrl = this.baseUrl + `/client/authenticate`;
    const requestHeaders = new Headers();

    requestHeaders.set(
      'Authorization',
      'Basic ' +
        Buffer.from(`${credentials.id}:${credentials.password}`).toString(
          'base64'
        )
    );

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      headers: requestHeaders,
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    // Client failed to authenticate
    if (response.status === 401) {
      return false;
    } else {
      const clientJSON = await response.json();
      return clientJSON;
    }
  }
  async getClientScheduledOrderMeals(mealSubscriptionId) {
    const requestUrl =
      this.baseUrl +
      `/scheduled_order_meal?meal_subscription_id=${mealSubscriptionId}`;
    const request = new Request(requestUrl);

    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };

    const response = await this.fetchWrapper(request, requestParams);
    const scheduledOrderMealJSON = await response.json();
    return scheduledOrderMealJSON;
  }
  async getClientExtendedScheduleMeals(mealSubscriptionId) {
    const requestUrl =
      this.baseUrl +
      `/extended_schedule_meal?meal_subscription_id=${mealSubscriptionId}`;
    const request = new Request(requestUrl);

    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const extendedScheduleMealData = await response.json();
    return extendedScheduleMealData;
  }
  async getClientScheduleMeals(mealSubscriptionId) {
    const requestUrl =
      this.baseUrl +
      `/schedule_meal?meal_subscription_id=${mealSubscriptionId}`;
    const request = new Request(requestUrl);

    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const scheduleMealData = await response.json();
    return scheduleMealData;
  }
  createClient = async (clientData) => {
    const requestUrl = this.baseUrl + '/client';

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'POST',
      body: JSON.stringify(clientData),
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const clientJSON = await response.json();
    return clientJSON;
  };
  updateStagedClient = async (clientData) => {
    const requestUrl = this.baseUrl + '/staged_client';

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'PUT',
      body: JSON.stringify(clientData),
      mode: this.mode,
      cache: 'default',
    };
    await this.fetchWrapper(request, requestParams);
    return;
  };
  createDietitianPrePayment = async (
    numMeals,
    stagedClientId,
    dietitianId,
    stripePaymentIntentId,
    discountCode = false
  ) => {
    const requestUrl = this.baseUrl + '/dietitian_prepayment';
    const requestData = {
      num_meals: numMeals,
      staged_client_id: stagedClientId,
      dietitian_id: dietitianId,
      // Send empty string if no discount code exists
      discount_code: discountCode ? discountCode : '',
      stripe_payment_intent_id: stripePaymentIntentId,
    };
    const requestParams = {
      method: 'POST',
      body: JSON.stringify(requestData),
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  };
  async createMeal(meal) {
    const requestUrl = this.baseUrl + '/meal';

    const requestParams = {
      method: 'POST',
      body: JSON.stringify(meal),
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }
  async createRecipeIngredients(recipeIngredients) {
    const requestUrl = this.baseUrl + '/recipe_ingredient';

    const requestParams = {
      method: 'POST',
      body: JSON.stringify(recipeIngredients),
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }
  async createMealPlanMeal(mealPlanMeal) {
    const requestUrl = this.baseUrl + '/meal_plan_meal';

    const requestParams = {
      method: 'POST',
      body: JSON.stringify(mealPlanMeal),
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }
  async createMealDietaryRestriction(mealDietaryRestriction) {
    const requestUrl = this.baseUrl + '/meal_dietary_restriction';

    const requestParams = {
      method: 'POST',
      body: JSON.stringify(mealDietaryRestriction),
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }
  async createMealSubscription(mealSubscription, orderDiscount = false) {
    const requestUrl = this.baseUrl + '/meal_subscription';
    const requestData = {
      meal_subscription: mealSubscription,
      order_discount: orderDiscount,
    };
    const requestParams = {
      method: 'POST',
      body: JSON.stringify(requestData),
      mode: this.mode,
      cache: 'default',
    };

    const response = await this.fetchWrapper(requestUrl, requestParams);
    const returnedMealSubscriptionData = await response.json();

    return returnedMealSubscriptionData;
  }

  async getClientMealSubscription(clientId) {
    const requestUrl =
      this.baseUrl + `/meal_subscription?client_id=${clientId}`;

    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(requestUrl, requestParams);
    const returnedMealSubscriptionData = await response.json();
    return returnedMealSubscriptionData;
  }
  async pauseMealSubscription(mealSubscriptionId) {
    const requestUrl =
      this.baseUrl + `/meal_subscription/${mealSubscriptionId}`;

    const requestHeaders = new Headers();
    requestHeaders.set('update', 'pause');

    const requestParams = {
      method: 'PUT',
      headers: requestHeaders,
      mode: this.mode,
      cache: 'default',
    };
    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }
  async unpauseMealSubscription(mealSubscriptionId) {
    const requestUrl =
      this.baseUrl + `/meal_subscription/${mealSubscriptionId}`;

    const requestHeaders = new Headers();
    requestHeaders.set('update', 'unpause');

    const requestParams = {
      method: 'PUT',
      headers: requestHeaders,
      mode: this.mode,
      cache: 'default',
    };
    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }
  // TODO implement this in UI and backend
  async deactivateMealSubscription(mealSubscriptionId) {
    const requestUrl = `${this.baseUrl}/meal_subscription/${mealSubscriptionId}`;

    const requestHeaders = new Headers();
    requestHeaders.set('update', 'deactivate');

    const requestParams = {
      method: 'PUT',
      headers: requestHeaders,
      mode: this.mode,
      cache: 'default',
    };
    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }

  async getMealSubscriptionInvoices(mealSubscriptionId) {
    const requestUrl =
      this.baseUrl +
      `/meal_subscription_invoice?meal_subscription_id=${mealSubscriptionId}`;

    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(requestUrl, requestParams);
    const mealSubscriptionInvoiceData = await response.json();
    return mealSubscriptionInvoiceData;
  }
  async createMealSubscriptionInvoice(mealSubscriptionInvoice) {
    const requestUrl = this.baseUrl + '/meal_subscription_invoice';
    const requestParams = {
      method: 'POST',
      body: JSON.stringify(mealSubscriptionInvoice),
      mode: this.mode,
      cache: 'default',
    };

    const response = await this.fetchWrapper(requestUrl, requestParams);
    const data = await response.json();
    return data;
  }
  async createScheduleMeals(scheduleMeals) {
    const requestUrl = this.baseUrl + '/schedule_meal';
    const requestParams = {
      method: 'POST',
      body: JSON.stringify(scheduleMeals),
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }
  async createStagedScheduleMeals(stagedScheduleMeals) {
    const requestUrl = this.baseUrl + '/staged_schedule_meal';
    const requestParams = {
      method: 'POST',
      body: JSON.stringify(stagedScheduleMeals),
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }
  async getExtendedStagedScheduleMeals(stagedClientId) {
    const requestUrl = `${this.baseUrl}/extended_staged_schedule_meal?staged_client_id=${stagedClientId}`;

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const extendedStagedScheduleMealObjects = await response.json();
    return extendedStagedScheduleMealObjects;
  }
  async getStagedScheduleMeals(stagedClientId) {
    const requestUrl = `${this.baseUrl}/staged_schedule_meal?staged_client_id=${stagedClientId}`;

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const stagedScheduleMealObjects = await response.json();
    return stagedScheduleMealObjects;
  }
  async createScheduledOrderMeals(scheduledOrderMeals) {
    const requestUrl = this.baseUrl + '/scheduled_order_meal';
    const requestParams = {
      method: 'POST',
      body: JSON.stringify(scheduledOrderMeals),
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }
  // Handle changes to scheduled order meals on home page
  async updateScheduledOrderMeals(updatedScheduledOrderMeals) {
    const requestUrl = this.baseUrl + '/scheduled_order_meal';
    const requestHeaders = new Headers();

    requestHeaders.set('deactivate', 'no');

    const requestParams = {
      method: 'PUT',
      headers: requestHeaders,
      body: JSON.stringify(updatedScheduledOrderMeals),
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }
  async unpauseScheduledOrderMeals(mealSubscriptionId) {
    const requestUrl =
      this.baseUrl +
      `/scheduled_order_meal?meal_subscription_id=${mealSubscriptionId}`;

    const requestHeaders = new Headers();
    requestHeaders.set('update', 'unpause');
    const requestParams = {
      method: 'PUT',
      headers: requestHeaders,
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }
  async pauseScheduledOrderMeals(mealSubscriptionId) {
    const requestUrl =
      this.baseUrl +
      `/scheduled_order_meal?meal_subscription_id=${mealSubscriptionId}`;

    const requestHeaders = new Headers();
    requestHeaders.set('update', 'pause');

    const requestParams = {
      method: 'PUT',
      headers: requestHeaders,
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }
  async deleteScheduledOrderMeals(mealSubscriptionId) {
    const requestUrl =
      this.baseUrl +
      `/scheduled_order_meal?meal_subscription_id=${mealSubscriptionId}`;

    const requestHeaders = new Headers();

    const requestParams = {
      method: 'DELETE',
      headers: requestHeaders,
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }
  async deleteScheduleMeals(mealSubscriptionId) {
    const requestUrl =
      this.baseUrl +
      `/schedule_meal?meal_subscription_id=${mealSubscriptionId}`;

    const requestParams = {
      method: 'DELETE',
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }

  async createOrderMeals(orderMeals) {
    const requestUrl = this.baseUrl + '/order_meal';
    const requestParams = {
      method: 'POST',
      body: JSON.stringify(orderMeals),
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }
  async getExtendedMeals() {
    const requestUrl = this.baseUrl + '/extended_meal';

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);

    const extendedMealsData = await response.json();
    return extendedMealsData;
  }
  async getMeals() {
    const requestUrl = this.baseUrl + '/meal';

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);

    const mealsData = await response.json();

    return mealsData;
  }
  getClientHomeUrl() {
    if (this.env === 'debug') {
      return this.frontEndBaseUrl + '/home';
    } else {
      return this.baseUrl + '/home';
    }
  }
  async getUpdatedExtendedMealPlanMeal(newRecipe) {
    const requestUrl = this.baseUrl + '/extended_meal_plan_meal';

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'PUT',
      body: JSON.stringify(newRecipe),
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const updatedExtendedMealPlanMeal = await response.json();
    return updatedExtendedMealPlanMeal;
  }
  async getExtendedMealPlanMeals() {
    const requestUrl = this.baseUrl + '/extended_meal_plan_meal';

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);

    const mealPlanMealsData = await response.json();
    return mealPlanMealsData;
  }
  async getMealPlanMeals() {
    const requestUrl = this.baseUrl + '/meal_plan_meal';

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);

    const mealPlanMealsData = await response.json();
    return mealPlanMealsData;
  }
  async getSpecificMealPlanMeals(mealPlanId) {
    const requestUrl =
      this.baseUrl + `/meal_plan_meal?meal_plan_id=${mealPlanId}`;

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const mealPlanMealsData = await response.json();
    return mealPlanMealsData;
  }
  async updateRecipeIngredientNutrients(recipeIngredients) {
    console.log('recipeIngredients', recipeIngredients);
    const requestUrl = this.baseUrl + '/recipe_ingredient_nutrient';
    const requestParams = {
      method: 'PUT',
      body: JSON.stringify(recipeIngredients),
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }
  async updateRecipeIngredients(recipeIngredients) {
    const requestUrl = this.baseUrl + '/recipe_ingredient';
    const requestParams = {
      method: 'PUT',
      body: JSON.stringify(recipeIngredients),
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }

  async getNutrients() {
    const requestUrl = this.baseUrl + '/nutrient';

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const nutrientsData = await response.json();
    return nutrientsData;
  }
  async getExtendedUSDAIngredients() {
    const requestUrl = this.baseUrl + '/extended_usda_ingredient';

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);

    const usdaIngredientsData = await response.json();

    return usdaIngredientsData;
  }
  async createRecipeIngredientNutrients(recipeIngredients) {
    const requestUrl = this.baseUrl + '/recipe_ingredient_nutrient';

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'POST',
      body: JSON.stringify(recipeIngredients),
      mode: this.mode,
      cache: 'default',
    };
    await this.fetchWrapper(request, requestParams);
    return;
  }
  async getRecipeIngredients() {
    const requestUrl = this.baseUrl + '/recipe_ingredient';

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);

    const recipeIngredientsData = await response.json();
    return recipeIngredientsData;
  }
  async getUSDAIngredientPortions() {
    const requestUrl = this.baseUrl + '/usda_ingredient_portion';

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);

    const usdaIngredientPortionsData = await response.json();
    return usdaIngredientPortionsData;
  }
  async getUSDAIngredientNutrients() {
    const requestUrl = this.baseUrl + '/usda_ingredient_nutrient';

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);

    const usdaIngredientNutrientsData = await response.json();
    return usdaIngredientNutrientsData;
  }

  async getRecipeIngredientNutrients() {
    const requestUrl = this.baseUrl + '/recipe_ingredient_nutrient';

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);

    const recipeIngredientNutrientsData = await response.json();
    return recipeIngredientNutrientsData;
  }
  async getStripePriceId() {
    const requestUrl = this.baseUrl + '/stripe/price_id';
    const response = await this.fetchWrapper(requestUrl);

    const data = await response.json();
    return data.stripe_price_id;
  }
  async getClientExtendedOrderMeals(mealSubscriptionId) {
    const requestUrl =
      this.baseUrl +
      `/extended_order_meal?meal_subscription_id=${mealSubscriptionId}`;
    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const responseData = await response.json();
    return responseData;
  }
  async getClientOrderMeals(mealSubscriptionId) {
    const requestUrl = `${this.baseUrl}/order_meal?meal_subscription_id=${mealSubscriptionId}`;

    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };

    const response = await this.fetchWrapper(requestUrl, requestParams);

    const orderMealsData = await response.json();

    return orderMealsData;
  }
  async getDietaryRestrictions() {
    const requestUrl = `${this.baseUrl}/dietary_restriction`;

    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };

    const response = await this.fetchWrapper(requestUrl, requestParams);
    console.log('response', response);
    const dietaryRestrictionData = await response.json();
    return dietaryRestrictionData;
  }
  async getMealPrice() {
    const requestUrl = this.baseUrl + '/meal_price';
    const request = new Request(requestUrl);

    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    console.log('response', response);
    const mealPrice = await response.json();
    return mealPrice;
  }
  async getShippingCost(state) {
    const requestUrl = this.baseUrl + '/shipping_cost';
    const request = new Request(requestUrl);

    const requestHeaders = new Headers();
    requestHeaders.set('state', state);

    const requestParams = {
      method: 'GET',
      headers: requestHeaders,
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const shippingCost = await response.json();
    return shippingCost;
  }
  async getSalesTax(state) {
    const requestUrl = this.baseUrl + '/sales_tax';
    const request = new Request(requestUrl);

    const requestHeaders = new Headers();
    requestHeaders.set('state', state);

    const requestParams = {
      method: 'GET',
      headers: requestHeaders,
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const salesTax = await response.json();
    return salesTax;
  }
  async verifyDiscount(discountCode) {
    const requestUrl = this.baseUrl + '/discount';
    const request = new Request(requestUrl);

    const requestHeaders = new Headers();
    requestHeaders.set('discount', discountCode);

    const requestParams = {
      method: 'GET',
      headers: requestHeaders,
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    if (response.status === 200) {
      const discountJSON = await response.json();
      return discountJSON;
    } else {
      return false;
    }
  }
  async createPaymentIntent(numMeals, staged_client_id, discountCode) {
    const requestUrl = this.baseUrl + '/stripe/payment_intent';
    const request = new Request(requestUrl);

    const requestHeaders = new Headers();
    requestHeaders.set('number_of_meals', numMeals);
    requestHeaders.set('staged_client_id', staged_client_id);
    requestHeaders.set('discount_code', !discountCode ? '' : discountCode);
    const requestParams = {
      method: 'POST',
      headers: requestHeaders,
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const paymentIntentDataJSON = await response.json();
    return paymentIntentDataJSON;
  }
}
let API = new APIClient();
export default API;
