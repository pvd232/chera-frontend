import { Buffer } from 'buffer';
import getBaseURL from './getBaseURL';
class APIClient {
  constructor() {
    // Host name will be localhost when running async tests in jest
    if (
      window.location.host === 'localhost:3000' ||
      window.location.host === 'localhost'
    ) {
      this.env = 'debug';
      this.baseUrl = getBaseURL('api');
      this.frontEndBaseUrl = getBaseURL('frontend');
      this.mode = 'cors';
    } else if (window.location.host === 'staging.cherahealth.com') {
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
    this.googleMapsAPIKey = 'AIzaSyDEckd6s43C-VnYFY1sAwFtUKqeHJm1fw4';
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

  async getSpecificExtendedMealPlanMeals(mealPlanId) {
    const requestUrl =
      this.baseUrl + `/extended_meal_plan_meal?meal_plan_id=${mealPlanId}`;

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

  async getSpecificExtendedMealPlanSnacks(mealPlanId) {
    const requestUrl =
      this.baseUrl + `/extended_meal_plan_snack?meal_plan_id=${mealPlanId}`;

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const mealPlanSnacksData = await response.json();
    return mealPlanSnacksData;
  }

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

  async deleteMeal(mealId) {
    const requestUrl = this.baseUrl + `/meal/${mealId}`;

    const requestParams = {
      method: 'DELETE',
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }

  async createSnack(snack) {
    const requestUrl = this.baseUrl + '/snack';

    const requestParams = {
      method: 'POST',
      body: JSON.stringify(snack),
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }

  async deleteSnack(snackId) {
    const requestUrl = this.baseUrl + `/snack/${snackId}`;

    const requestParams = {
      method: 'DELETE',
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }

  async createMealPlanSnack(mealPlanSnack) {
    const requestUrl = this.baseUrl + '/meal_plan_snack';

    const requestParams = {
      method: 'POST',
      body: JSON.stringify(mealPlanSnack),
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

  // Dietitian methods
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

  async updateStagedClient(clientData) {
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
  }

  async createDietitianPrePayment(
    numMeals,
    numSnacks,
    stagedClientId,
    dietitianId,
    stripePaymentIntentId,
    discountCode = false
  ) {
    const requestUrl = this.baseUrl + '/dietitian_prepayment';
    const requestData = {
      num_meals: numMeals,
      num_snacks: numSnacks,
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
  }

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

  async authenticateDietitian(credentials) {
    const requestUrl = this.baseUrl + `/dietitian/authenticate`;
    const requestHeaders = new Headers();
    requestHeaders.set(
      'Authorization',
      'Basic ' +
        Buffer.from(`${credentials.username}:${credentials.password}`).toString(
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

  async getExtendedStagedClients(dietitianId) {
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
  }

  async getStagedClient(stagedClientId) {
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
  }

  async sendReminderEmail(stagedClientId) {
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
  }

  async createStagedClient(stagedClient) {
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
  }

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
  async createMealSubscription(mealSubscription) {
    const requestUrl = this.baseUrl + '/meal_subscription';

    const requestParams = {
      method: 'POST',
      body: JSON.stringify(mealSubscription),
      mode: this.mode,
      cache: 'default',
    };

    const response = await this.fetchWrapper(requestUrl, requestParams);
    const returnedMealSubscriptionData = await response.json();

    return returnedMealSubscriptionData;
  }
  async deactivateMealSubscription(mealSubscriptionId) {
    const requestUrl =
      this.baseUrl + `/meal_subscription/${mealSubscriptionId}`;

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
  async createOrderDiscount(orderDiscount) {
    const requestUrl = this.baseUrl + '/order_discount';
    const requestParams = {
      method: 'POST',
      body: JSON.stringify(orderDiscount),
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
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
  async updateStripeSubscription(
    mealSubscriptionId,
    numberOfMeals,
    numberOfSnacks
  ) {
    const requestUrl =
      this.baseUrl +
      `/stripe/subscription?meal_subscription_id=${mealSubscriptionId}`;

    const requestHeaders = new Headers();
    requestHeaders.set('number-of-meals', numberOfMeals);
    requestHeaders.set('number-of-snacks', numberOfSnacks);

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
  async deleteStripeCustomer(stripeCustomerId) {
    const requestUrl = this.baseUrl + `/stripe/customer/${stripeCustomerId}`;

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'DELETE',
      mode: this.mode,
      cache: 'default',
    };
    await this.fetchWrapper(request, requestParams);
    return;
  }
  async createStripeSubscription(
    numberOfMeals,
    numberOfSnacks,
    clientId,
    discountCode,
    prepaid
  ) {
    const requestUrl = this.baseUrl + '/stripe/subscription';

    const requestBody = {
      client_id: clientId,
      number_of_meals: numberOfMeals,
      number_of_snacks: numberOfSnacks,
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
  async deleteStripeSubscription(stripeSubscriptionId) {
    const requestUrl =
      this.baseUrl + `/stripe/subscription/${stripeSubscriptionId}`;

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'DELETE',
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
        Buffer.from(`${credentials.username}:${credentials.password}`).toString(
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
  async checkIfFirstWeek(mealSubscriptionId) {
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
  }

  async skipWeek(mealSubscriptionId, stripeSubscriptionId, deliveryDate) {
    const requestUrl = this.baseUrl + '/meal_subscription/skip_week';
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
  }
  async unskipWeek(mealSubscriptionId, stripeSubscriptionId, deliveryDate) {
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
  async createClient(clientData) {
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
  }
  async deactivateClient(clientId) {
    const requestUrl = this.baseUrl + `/client/${clientId}`;

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'PUT',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const clientJSON = await response.json();
    return clientJSON;
  }
  async updateClient(clientData) {
    const requestUrl = this.baseUrl + '/client';

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'PUT',
      body: JSON.stringify(clientData),
      mode: this.mode,
      cache: 'default',
    };
    await this.fetchWrapper(request, requestParams);
    return;
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

  async createMealSubscriptionInvoice(
    mealSubscriptionInvoice,
    discountCode = false
  ) {
    const requestHeaders = new Headers();

    if (discountCode) {
      requestHeaders.set('discount-code', discountCode);
    }

    const requestUrl = this.baseUrl + '/meal_subscription_invoice';
    const requestParams = {
      method: 'POST',
      headers: requestHeaders,
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

  async getSnacks() {
    const requestUrl = this.baseUrl + '/snack';

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);

    const snacksData = await response.json();

    return snacksData;
  }
  async getExtendedScheduledOrderSnacks(mealSubscriptionId) {
    const requestUrl =
      this.baseUrl +
      `/extended_scheduled_order_snack?meal_subscription_id=${mealSubscriptionId}`;

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
  async createScheduleSnacks(scheduleSnacks) {
    const requestUrl = this.baseUrl + '/schedule_snack';
    const requestParams = {
      method: 'POST',
      body: JSON.stringify(scheduleSnacks),
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }

  async createScheduledOrderSnacks(scheduledOrderSnacks) {
    const requestUrl = this.baseUrl + '/scheduled_order_snack';
    const requestParams = {
      method: 'POST',
      body: JSON.stringify(scheduledOrderSnacks),
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }

  async createOrderSnacks(orderSnacks) {
    const requestUrl = this.baseUrl + '/order_snack';
    const requestParams = {
      method: 'POST',
      body: JSON.stringify(orderSnacks),
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }
  async deleteScheduledOrderSnacks(mealSubscriptionId) {
    const requestUrl =
      this.baseUrl +
      `/scheduled_order_snack?meal_subscription_id=${mealSubscriptionId}`;

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
  // Handle changes to scheduled order meals on home page
  async updateScheduledOrderSnacks(updatedScheduledOrderSnacks) {
    const requestUrl = this.baseUrl + '/scheduled_order_snack';
    const requestHeaders = new Headers();

    requestHeaders.set('deactivate', 'no');

    const requestParams = {
      method: 'PUT',
      headers: requestHeaders,
      body: JSON.stringify(updatedScheduledOrderSnacks),
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }
  async unpauseScheduledOrderSnacks(mealSubscriptionId) {
    const requestUrl =
      this.baseUrl +
      `/scheduled_order_snack?meal_subscription_id=${mealSubscriptionId}`;

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

  async pauseScheduledOrderSnacks(mealSubscriptionId) {
    const requestUrl =
      this.baseUrl +
      `/scheduled_order_snack?meal_subscription_id=${mealSubscriptionId}`;

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
  async deleteScheduleSnacks(mealSubscriptionId) {
    const requestUrl =
      this.baseUrl +
      `/schedule_snack?meal_subscription_id=${mealSubscriptionId}`;

    const requestParams = {
      method: 'DELETE',
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }
  async getExtendedStagedScheduleSnacks(stagedClientId) {
    const requestUrl = `${this.baseUrl}/extended_staged_schedule_snack?staged_client_id=${stagedClientId}`;

    const request = new Request(requestUrl);
    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const extendedStagedScheduleSnackObjects = await response.json();
    return extendedStagedScheduleSnackObjects;
  }
  async createStagedScheduleSnacks(stagedScheduleSnacks) {
    const requestUrl = this.baseUrl + '/staged_schedule_snack';
    const requestParams = {
      method: 'POST',
      body: JSON.stringify(stagedScheduleSnacks),
      mode: this.mode,
      cache: 'default',
    };

    await this.fetchWrapper(requestUrl, requestParams);
    return;
  }

  getClientHomeUrl() {
    if (this.env === 'debug') {
      return this.frontEndBaseUrl + '/home';
    } else {
      return this.baseUrl + '/home';
    }
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
    const mealPrice = await response.json();
    return mealPrice;
  }

  async getSnackPrice() {
    const requestUrl = this.baseUrl + '/snack_price';
    const request = new Request(requestUrl);

    const requestParams = {
      method: 'GET',
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const snackPrice = await response.json();
    return snackPrice;
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

  async createPaymentIntent(
    numMeals,
    numSnacks,
    staged_client_id,
    discountCode
  ) {
    const requestUrl = this.baseUrl + '/stripe/payment_intent';
    const request = new Request(requestUrl);

    const requestHeaders = new Headers();
    requestHeaders.set('number_of_meals', numMeals);
    requestHeaders.set('number_of_snacks', numSnacks);
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
  async checkDieteticRegistrationNumber(dieteticRegistrationNumber) {
    if (this.env === 'debug') {
      return true;
    }
    const requestUrl = this.baseUrl + '/test_dietetic';
    const request = new Request(requestUrl);

    const requestParams = {
      method: 'POST',
      body: JSON.stringify(dieteticRegistrationNumber),
      mode: this.mode,
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  }
  async validateAddress(address) {
    const requestUrl = `https://addressvalidation.googleapis.com/v1:validateAddress?key=${this.googleMapsAPIKey}`;
    const request = new Request(requestUrl);
    const requestHeaders = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    const addressLines = (() => {
      if (address.suite) {
        return address.street.split(' ').concat(address.suite).join(' ');
      } else {
        return address.street;
      }
    })();
    const requestBody = {
      address: {
        regionCode: 'US',
        locality: address.city,
        administrativeArea: address.state,
        postalCode: String(address.zipcode),
        addressLines: [addressLines],
      },
      enableUspsCass: true,
    };
    const requestParams = {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(requestBody),
      mode: 'cors',
      cache: 'default',
    };
    const response = await this.fetchWrapper(request, requestParams);
    const responseJSON = await response.json();
    const addressResult = responseJSON.result;
    const addressIsComplete =
      responseJSON.result.verdict.hasOwnProperty('addressComplete');

    const addressHasIncorrectData = addressResult.verdict.hasOwnProperty(
      'hasUnconfirmedComponents'
    );
    const addressHasIncorrectSuite =
      addressResult.address.unconfirmedComponentTypes?.includes('subpremise');
    const addressRequiresSuite =
      addressResult.address.missingComponentTypes?.includes('subpremise') ??
      false;

    if (addressIsComplete && !addressHasIncorrectData) {
      return {
        addressStatus: 'valid',
        addressResult: addressResult,
        uspsAddress: addressResult.uspsData,
      };
    } else if (addressHasIncorrectData) {
      if (addressHasIncorrectSuite) {
        return {
          addressStatus: 'invalidSuite',
          addressResult: addressResult,
          uspsAddress: addressResult.uspsData,
        };
      } else {
        return {
          addressStatus: 'invalid',
          addressResult: addressResult,
          uspsAddress: addressResult.uspsData,
        };
      }
    } else if (addressRequiresSuite) {
      return {
        addressStatus: 'missingSuite',
        addressResult: addressResult,
        uspsAddress: addressResult.uspsData,
      };
    }
  }
}

let API = new APIClient();
export default API;
