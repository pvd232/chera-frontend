import CircularProgressPage from "../../shared_components/CircularProgressPage";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import LocalStorageManager from "../../../helpers/LocalStorageManager";
import APIClient from "../../../helpers/APIClient";
import DietitianDTO from "../../../data_models/dto/DietitianDTO";
import Dietitian from "../../../data_models/model/Dietitian";
import Client from '../../../data_models/model/Client';
import ClientDTO from '../../../data_models/dto/ClientDTO';
import useAuthHeader from '../../../helpers/useAuthHeader';

const LoadingPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [clientData, setClientData] = useState(false);
  const [stagedClientData, setStagedClientData] = useState(false);
  const [dietitianData, setdietitianData] = useState(false);
  const authHeader = useAuthHeader();

  useEffect(() => {
    if (user && isAuthenticated && authHeader) {
      const email = user.email;

      APIClient.getClient(email, authHeader).then((clientData) => {
        setClientData(clientData);
        if (clientData) {
          if (!LocalStorageManager.shared.client) {
            const clientDTO = new ClientDTO(clientData);
            const client = new Client(clientDTO);
            LocalStorageManager.shared.client = client;
            navigate("/home");
          }
        } else {
          APIClient.getStagedClient(email, authHeader).then((stagedUserData) => {
            setStagedClientData(stagedUserData);
            if (stagedUserData) {
              navigate("/"); //need to redirect to client sign up page instead!
            } else {
              APIClient.getDietitian(email, authHeader)
                .then((dietitianData) => {
                  setdietitianData(dietitianData);
                  if (dietitianData === false) {
                    navigate("/dietitian-sign-up");
                  } else if (dietitianData) {
                    if (!LocalStorageManager.shared.dietitian) {
                      const dietitianDTO = new DietitianDTO(dietitianData);
                      const dietitian = new Dietitian(dietitianDTO);
                      LocalStorageManager.shared.homeUrl = "/d-home";
                      LocalStorageManager.shared.dietitian = dietitian;
                      navigate("/d-home");
                    }
                  }
                })
                .catch((error) => {
                  console.error("Error fetching dietitian:", error);
                });
            }
          });
        }
      });
    }
  }, [user, isAuthenticated, navigate, authHeader]);

  if (clientData && LocalStorageManager.shared.client){
    navigate("/home");
  }else if (dietitianData && LocalStorageManager.shared.dietitian) {
    navigate("/d-home");
  }

  return <CircularProgressPage />;
};

export default LoadingPage;
