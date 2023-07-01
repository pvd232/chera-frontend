class APIClient {
  env: string;
  baseUrl: any;
  frontEndBaseUrl: any;
  mode: string;
  googleMapsAPIKey: string;
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
      this.env = 'staging';
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


  async getClientPaymentMethod(clientID: string): Promise<any> {
    const requestUrl = this.baseUrl + `/stripe/payment_method/${clientID}` ;
  
    const request = new Request(requestUrl);
    const requestParams: RequestInit = {
      method: 'GET',
      mode: this.mode as RequestMode,
      cache: 'default',
    };
  
    const response = await this.fetchWrapper(request, requestParams);
    console.log(response);
    if (response instanceof Response) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Invalid response');
    }
  }

  async updateClientPaymentMethod(clientID: string, subscriptionID: string, newCardToken: string): Promise<any> {
    const requestUrl = this.baseUrl + `/stripe/update_payment_method/${clientID}/${subscriptionID}/${newCardToken}` ;
  
    const request = new Request(requestUrl);
    const requestParams: RequestInit = {
      method: 'POST',
      mode: this.mode as RequestMode,
      cache: 'default',
    };
  
    const response = await this.fetchWrapper(request, requestParams);
    console.log(response);
    if (response instanceof Response) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Invalid response');
    }
  }
  

  async fetchWrapper(request: RequestInfo | URL, requestParams: RequestInit | undefined) {
    const response = await fetch(request, requestParams).catch((error) => {
      if (this.env === 'debug' || this.env === 'staging') {
        if (typeof error.json === 'function') {
          error
            .json()
            .then((jsonError: string | undefined) => {
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
            .then((jsonError: any) => {
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
}

type GetBaseURL = (service: string) => string;

const getBaseURL: GetBaseURL = (service: string) => {
  if (service === 'api') {
    // Host name will be localhost not localhost:3000 in jest environment
    if (
      window.location.host === 'localhost:3000' ||
      window.location.host === 'localhost'
    ) {
      return 'http://localhost:4000/api';
    } else if (window.location.host === 'staging.cherahealth.com') {
      return `https://${window.location.host}/api`;
    } else {
      return `https://${window.location.host}/api`;
    }
  } else {
    if (
      window.location.host === 'localhost:3000' ||
      window.location.host === 'localhost'
    ) {
      return 'http://localhost:3000';
    } else if (window.location.host === 'staging.cherahealth.com') {
      return `https://${window.location.host}`;
    } else {
      return `https://${window.location.host}`;
    }
  }
}

  

let API = new APIClient();
export default API;
