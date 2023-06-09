import { useState, useEffect } from 'react';
import { getExtendedStagedClients } from '../helpers/getExtendedStagedClients';
import LocalStorageManager from '../../../../helpers/LocalStorageManager';
export const useStagedClients = () => {
  const [stagedclients, setStagedClients] = useState([]);
  useEffect(() => {
    getExtendedStagedClients(LocalStorageManager.shared.dietitian.id).then(
      (clientData) => {
        setStagedClients(clientData);
      }
    );
  }, []);
  return [stagedclients, setStagedClients];
};
