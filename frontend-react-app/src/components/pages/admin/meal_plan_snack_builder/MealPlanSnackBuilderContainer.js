import { useEffect, useState, cloneElement } from 'react';
import APIClient from '../../../../helpers/APIClient';
import MealPlanDTO from '../../../../data_models/dto/MealPlanDTO';
import MealPlan from '../../../../data_models/model/MealPlan';
import SnackDTO from '../../../../data_models/dto/SnackDTO';
import Snack from '../../../../data_models/model/Snack';
import CircularProgressPage from '../../../shared_components/CircularProgressPage';
import useAuthHeader from "../../../../helpers/useAuthHeader";
const MealPlanSnackBuilderContainer = (props) => {
  const [mealPlans, setMealPlans] = useState(false);
  const [snacks, setSnacks] = useState(false);
  const authHeader = useAuthHeader();
  useEffect(() => {
    let mounted = true;
    if(authHeader){
      APIClient.getSnacks(authHeader).then((snacksData) => {
        if (mounted) {
          const snackDTOs = snacksData.map(
            (snacksData) => new SnackDTO(snacksData)
          );
          const snacks = snackDTOs.map((snackDTO) => new Snack(snackDTO));
          setSnacks(snacks);
        }
      });
      APIClient.getMealPlans(authHeader).then((mealPlansData) => {
        if (mounted) {
          const mealPlanDTOs = mealPlansData.map(
            (mealPlanData) => new MealPlanDTO(mealPlanData)
          );
          const mealPlans = mealPlanDTOs.map(
            (mealPlanDTO) => new MealPlan(mealPlanDTO)
          );
          setMealPlans(mealPlans);
        }
      });
    }
    return () => (mounted = false);
  }, [authHeader]);

  if (mealPlans && snacks) {
    const dataProps = {
      mealPlans: mealPlans,
      snacks: snacks,
    };
    // Pass the dataProps to the child component
    return cloneElement(props.childComponent, { ...dataProps });
  } else {
    return <CircularProgressPage />;
  }
};
export default MealPlanSnackBuilderContainer;
