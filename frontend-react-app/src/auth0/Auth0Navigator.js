import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Auth0Navigator = ({ children }) => {
  const navigate = useNavigate();
  const env = (() => {
    if (window.location.origin === 'http://localhost:3000') {
      return 'development';
    } else if (window.location.origin === 'https://staging.cherahealth.com') {
      return 'staging';
    } else {
      return 'production';
    }
  })();
  const domain =
    process.env.REACT_APP_AUTH0_DOMAIN ?? `${env}-chera.us.auth0.com`;

  const clientId = (() => {
    if (env === 'development') {
      return process.env.REACT_APP_AUTH0_CLIENT_ID;
    } else if (env === 'staging') {
      return 'RRSlRkh1xGcfv69g1xACq1RRgA9jevda';
    } else {
      return '';
    }
  })();

  const redirectUri = window.location.origin + '/callback';

  const audience = (() => {
    if (env === 'development') {
      return process.env.REACT_APP_AUTH0_AUDIENCE;
    } else {
      return window.location.origin + '/api';
    }
  })();

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri && audience)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience: audience,
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
