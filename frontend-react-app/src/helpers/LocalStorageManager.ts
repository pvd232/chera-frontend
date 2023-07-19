class LocalStorageManager {
  private static instance: LocalStorageManager;
  private storage: Storage;
  static shared = (() => {
    if (LocalStorageManager.instance) {
      return LocalStorageManager.instance;
    } else {
      return new LocalStorageManager();
    }
  })();
  constructor() {
    this.storage = window.localStorage;
  }

  getRawItem(key: string) {
    return this.storage.getItem(key);
  }
  setRawItem(key: string, object: string) {
    this.storage.setItem(key, object);
  }

  getItem(key: string) {
    const itemJSON = this.getRawItem(key);

    if (itemJSON) {
      return JSON.parse(itemJSON);
    } else {
      return false;
    }
  }
  setItem(key: string, object: any) {
    if (object) {
      this.setRawItem(key, JSON.stringify(object));
    }
  }
  removeItem(key: string) {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
    }
  }

  get upcomingDeliveryDates() {
    return this.getItem('upcoming_delivery_dates');
  }
  set upcomingDeliveryDates(newDeliveryDate) {
    this.setItem('upcoming_delivery_dates', newDeliveryDate);
  }
  get upcomingCutoffDates() {
    return this.getItem('upcoming_cutoff_dates');
  }
  set upcomingCutoffDates(newCutoffDate) {
    this.setItem('upcoming_cutoff_dates', newCutoffDate);
  }
  get homeUrl() {
    if (this.getItem('home_url')) {
      return this.getItem('home_url');
    } else {
      this.setItem('home_url', '/');
      return '/';
    }
  }

  set homeUrl(newHomeUrl) {
    this.setItem('home_url', newHomeUrl);
  }

  // Dietitian properties
  get dietitian() {
    return this.getItem('dietitian');
  }
  set dietitian(newDietitian) {
    this.setItem('dietitian', newDietitian);
  }

  // Client properties
  get client() {
    return this.getItem('client');
  }
  set client(newClient) {
    this.setItem('client', newClient);
  }

  get clientMealSubscription() {
    return this.getItem('client_meal_subscription');
  }
  set clientMealSubscription(newMealSubscription) {
    this.setItem('client_meal_subscription', newMealSubscription);
  }
  get mealTimes() {
    return ['breakfast', 'lunch', 'dinner'];
  }

  get imperialUnits() {
    return [
      { id: 'teaspoon', ounces: 0.166667 },
      {
        id: 'tablespoon',
        ounces: 0.5,
      },
      { ounces: 8.0, id: 'cup' },
      { id: 'oz', ounces: 1.0 },
    ];
  }

  get savedMealBuilderMeal() {
    return this.getItem('saved_meal_builder_meal');
  }
  set savedMealBuilderMeal(newMeal) {
    this.setItem('saved_meal_builder_meal', newMeal);
  }
  deleteSavedMealBuilderMeal() {
    this.removeItem('saved_meal_builder_meal');
  }

  get savedMealBuilderSnack() {
    return this.getItem('saved_meal_builder_snack');
  }
  set savedMealBuilderSnack(newSnack) {
    this.setItem('saved_meal_builder_snack', newSnack);
  }
  deleteSavedMealBuilderSnack() {
    this.removeItem('saved_meal_builder_snack');
  }
  // AUTH
  // Clear the browser's local storage, which will remove all information about the user
  logoutUser = () => {
    localStorage.clear();
  };
}
export default LocalStorageManager;
