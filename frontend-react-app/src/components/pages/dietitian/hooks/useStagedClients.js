import { useState, useEffect } from 'react';
import { getExtendedStagedClients } from '../helpers/getExtendedStagedClients';
import LocalStorageManager from '../../../../helpers/LocalStorageManager';
import useAuthHeader from '../../../../helpers/useAuthHeader';
export const useStagedClients = () => {
  const [stagedclients, setStagedClients] = useState([]);
  const authHeader = useAuthHeader();
  useEffect(() => {
    if (authHeader){
      getExtendedStagedClients(LocalStorageManager.shared.dietitian.id, authHeader).then(
        (clientData) => {
          setStagedClients(clientData);
        }
      );
    }
  }, [authHeader]);
  return [stagedclients, setStagedClients];
};
