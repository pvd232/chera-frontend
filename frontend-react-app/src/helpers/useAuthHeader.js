import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const useAuthHeader = () => {
  const [authHeader, setAuthHeader] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
      try {
        getAccessTokenSilently().then(
          (accessToken) => {
            const header = {
              Authorization: `Bearer ${accessToken}`
            };
    
            const requestHeaders = new Headers(header);
            setAuthHeader(requestHeaders);
          });
        } catch (error) {
          setAuthHeader(false);
          throw new Error(error);
        }
        
  }, [getAccessTokenSilently]);

  return authHeader;
};

export default useAuthHeader;
