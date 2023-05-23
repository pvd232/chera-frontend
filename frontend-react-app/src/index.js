import React from 'react';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import './static/scss/index.scss';
import * as ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { Auth0ProviderWithNavigate } from './auth0-provider-with-navigate';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

window.React = React;
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const container = document.getElementById('root');
const root = ReactDOM.createRoot(
    container,
); // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
