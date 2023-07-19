import CircularProgressPage from "../../shared_components/CircularProgressPage";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import LocalStorageManager from "../../../helpers/LocalStorageManager";
import APIClient from "../../../helpers/APIClient";

const LoadingPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [dietitianExists, setDietitianExists] = useState(false);

  useEffect(() => {
    if (user && isAuthenticated) {
      const email = user.email;
      APIClient.getDietitian(email)
        .then((dietitianExists) => {
          setDietitianExists(dietitianExists);
          if (dietitianExists === false) {
            navigate("/dietitian-sign-up");
          } else if (dietitianExists === true) {
            if (!LocalStorageManager.shared.dietitian) {
              APIClient.getDietitianDetails(email).then((dietitianData) => {
                LocalStorageManager.shared.homeUrl = "/d-home";
                LocalStorageManager.shared.dietitian = dietitianData;
                navigate("/d-home");
              });
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching dietitian:", error);
        });
    }
  }, [user, isAuthenticated, navigate]);

  if (dietitianExists === true && LocalStorageManager.shared.dietitian){
    navigate("/d-home");
  }

  return <CircularProgressPage />;
};

export default LoadingPage;
