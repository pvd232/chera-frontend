import CircularProgressPage from '../../shared_components/CircularProgressPage';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import LocalStorageManager from '../../../helpers/LocalStorageManager';
import APIClient from '../../../helpers/APIClient';
import DietitianDTO from '../../../data_models/dto/DietitianDTO';
import Dietitian from '../../../data_models/model/Dietitian';
import Client from '../../../data_models/model/Client';
import ClientDTO from '../../../data_models/dto/ClientDTO';

const LoadingPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isAuthenticated) {
      const email = user.email;

      APIClient.getClient(email).then((clientJSON) => {
        if (clientJSON) {
          const clientDTO = new ClientDTO(clientJSON);
          const client = new Client(clientDTO);
          LocalStorageManager.shared.client = client;
          navigate('/home');
        } else {
          APIClient.getStagedClient(email).then((stagedUserData) => {
            if (stagedUserData) {
              navigate('/'); //need to redirect to client sign up page instead!
            } else {
              APIClient.getDietitian(email).then((dietitianData) => {
                if (!dietitianData) {
                  navigate('/dietitian-sign-up');
                } else {
                  const dietitianDTO = new DietitianDTO(dietitianData);
                  const dietitian = new Dietitian(dietitianDTO);
                  LocalStorageManager.shared.homeUrl = '/d-home';
                  LocalStorageManager.shared.dietitian = dietitian;
                  navigate('/d-home');
                }
              });
            }
          });
        }
      });
    }
  }, [user, isAuthenticated, navigate]);

  return <CircularProgressPage />;
};

export default LoadingPage;
