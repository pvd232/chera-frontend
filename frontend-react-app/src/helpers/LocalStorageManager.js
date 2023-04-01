class LocalStorageManager {
  static shared = (() => {
    if (LocalStorageManager._instance) {
      return LocalStorageManager.instance;
    } else {
      return new LocalStorageManager();
    }
  })();
  constructor() {
    this.storage = window.localStorage;
  }

  getRawItem(key) {
    return this.storage.getItem(key);
  }
  setRawItem(key, object) {
    this.storage.setItem(key, object);
  }

  getItem(key) {
    const itemJSON = this.getRawItem(key);

    if (itemJSON) {
      return JSON.parse(this.getRawItem(key));
    } else {
      return false;
    }
  }
  setItem(key, object) {
    if (object) {
      this.setRawItem(key, JSON.stringify(object));
    }
  }
  removeItem(key) {
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
  get stripePriceId() {
    return this.getItem('stripe_price_id');
  }

  set stripePriceId(stripePriceId) {
    this.setItem('stripe_price_id', stripePriceId);
  }
  get client() {
    if (this.getItem('client')) {
      return this.getItem('client');
    } else {
      return false;
    }
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
  logoutUser = () => {
    localStorage.clear();
  };
}
export default LocalStorageManager;
