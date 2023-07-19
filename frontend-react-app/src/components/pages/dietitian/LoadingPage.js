import CircularProgressPage from '../../shared_components/CircularProgressPage';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import LocalStorageManager from '../../../helpers/LocalStorageManager';
import APIClient from '../../../helpers/APIClient';
import DietitianDTO from '../../../data_models/dto/DietitianDTO';
import Dietitian from '../../../data_models/model/Dietitian';

const LoadingPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isAuthenticated) {
      const email = user.email;
      APIClient.getDietitian(email)
        .then((dietitianExists) => {
          if (!dietitianExists) {
            navigate('/dietitian-sign-up');
          } else {
            if (!LocalStorageManager.shared.dietitian) {
              APIClient.getDietitianDetails(email).then((dietitianData) => {
                const dietitianDTO = new DietitianDTO(dietitianData);
                const dietitian = new Dietitian(dietitianDTO);
                LocalStorageManager.shared.homeUrl = '/d-home';
                LocalStorageManager.shared.dietitian = dietitian;
                navigate('/d-home');
              });
            }
          }
        })
        .catch((error) => {
          console.error('Error fetching dietitian:', error);
        });
    }
  }, [user, isAuthenticated, navigate]);

  return <CircularProgressPage />;
};

export default LoadingPage;
