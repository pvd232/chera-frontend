import { useState, useEffect } from 'react';
import { getExtendedClients } from '../helpers/getExtendedClients';
import LocalStorageManager from '../../../../helpers/LocalStorageManager';
import useAuthHeader from '../../../../helpers/useAuthHeader';
export const useClients = () => {
  const [clients, setClients] = useState([]);
  const authHeader = useAuthHeader();
  useEffect(() => {
    if(authHeader){
      getExtendedClients(LocalStorageManager.shared.dietitian.id, authHeader).then(
        (clientData) => {
          setClients(clientData);
        }
      );
    }
  }, [authHeader]);
  return [clients, setClients];
};
