import { useState, useEffect } from 'react';
import { getExtendedClients } from '../helpers/getExtendedClients';
import LocalStorageManager from '../../../../helpers/LocalStorageManager';
export const useClients = () => {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    getExtendedClients(LocalStorageManager.shared.dietitian.id).then(
      (clientData) => {
        setClients(clientData);
      }
    );
  }, []);
  return [clients, setClients];
};
