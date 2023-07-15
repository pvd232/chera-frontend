import { useState, useEffect, cloneElement, useReducer } from 'react';
import APIClient from '../../../../helpers/APIClient';
import CacheManager from '../../../../helpers/CacheManager';
import MealPlanDTO from '../../../../data_models/dto/MealPlanDTO';
import MealPlan from '../../../../data_models/model/MealPlan';
import MealDietaryRestrictionDTOFactory from '../../../../data_models/factories/dto/MealDietaryRestrictionDTOFactory';
import MealDietaryRestrictionFactory from '../../../../data_models/factories/model/MealDietaryRestrictionFactory';
import ExtendedMeal from '../../../../data_models/model/ExtendedMeal';
import ExtendedMealDTO from '../../../../data_models/dto/ExtendedMealDTO';
import CircularProgressPage from '../../../shared_components/CircularProgressPage';
import { mapExtendedMealPlanMealData } from './helpers/mapExtendedMealPlanMealData';
import { mapExtendedMealPlanSnackData } from './helpers/mapExtendedMealPlanSnackData';

const DietitianMenuContainer = (props) => {
  const [mealPlans, setMealPlans] = useState(false);
  const [extendedMeals, setExtendedMeals] = useState(false);
  const [specificMealPlanMeals, setSpecificMealPlanMeals] = useState(false);
  const [specificMealPlanSnacks, setSpecificMealPlanSnacks] = useState(false);

  const [unspecificFood, setUnspecificFood] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      // if the client secret exists then this page is being rerendered and all of these values have been inputted

      mealPlanMeals: false,
      mealPlanSnacks: false,
    }
  );
  useEffect(() => {
    let mounted = true;
    APIClient.getExtendedMeals().then((extendedMealData) => {
      if (mounted) {
        const extendedMealDTOs = extendedMealData.map(
          (extendedMealData) =>
            new ExtendedMealDTO(
              extendedMealData,
              new MealDietaryRestrictionDTOFactory()
            )
        );
        const extendedMeals = extendedMealDTOs.map(
          (extendedMealDTO) =>
            new ExtendedMeal(
              extendedMealDTO,
              new MealDietaryRestrictionFactory()
            )
        );
        setExtendedMeals(extendedMeals);
      }
    });
    APIClient.getMealPlans().then((mealPlansData) => {
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
    APIClient.getSpecificExtendedMealPlanSnacks(false, 5).then(
      (mealPlanSnacksData) => {
        if (mounted) {
          const extendedMealPlanSnackDTOs =
            mapExtendedMealPlanSnackData(mealPlanSnacksData);
          setSpecificMealPlanSnacks(extendedMealPlanSnackDTOs);
        }
      }
    );
    APIClient.getSpecificExtendedMealPlanMeals(false, 5).then(
      (mealPlanMealsData) => {
        if (mounted) {
          const extendedMealPlanMealDTOs =
            mapExtendedMealPlanMealData(mealPlanMealsData);
          setSpecificMealPlanMeals(extendedMealPlanMealDTOs);
        }
      }
    );
    const mealPlanSnacksPromise = CacheManager.shared.mealPlanSnacks;
    const mealPlanMealsPromise = CacheManager.shared.mealPlanMeals;
    Promise.all([mealPlanSnacksPromise, mealPlanMealsPromise]).then(
      (responses) => {
        const mealPlanSnacksData = responses[0];
        const mealPlanMealsData = responses[1];
        if (mounted) {
          const extendedMealPlanSnackDTOs =
            mapExtendedMealPlanSnackData(mealPlanSnacksData);
          const extendedMealPlanMealDTOs =
            mapExtendedMealPlanMealData(mealPlanMealsData);
          setUnspecificFood({
            unspecificMealPlanSnacks: extendedMealPlanSnackDTOs,
            unspecificMealPlanMeals: extendedMealPlanMealDTOs,
          });
        }
      }
    );

    return () => (mounted = false);
  }, []);

  if (
    (mealPlans &&
      extendedMeals &&
      specificMealPlanMeals &&
      !specificMealPlanSnacks &&
      !unspecificFood.mealPlanMeals) ||
    (mealPlans &&
      extendedMeals &&
      specificMealPlanMeals &&
      specificMealPlanSnacks &&
      !unspecificFood.mealPlanMeals)
  ) {
    const dataProps = {
      mealPlans: mealPlans,
      mealPlanMeals: specificMealPlanMeals,
      mealPlanSnacks: specificMealPlanSnacks,
      extendedMeals: extendedMeals,
    };
    return cloneElement(props.childComponent, { ...dataProps });
  } else if (
    mealPlans &&
    extendedMeals &&
    unspecificFood.mealPlanMeals &&
    unspecificFood.mealPlanSnacks
  ) {
    const dataProps = {
      mealPlans: mealPlans,
      mealPlanMeals: unspecificFood.mealPlanMeals,
      mealPlanSnacks: unspecificFood.mealPlanSnacks,
      extendedMeals: extendedMeals,
    };
    return cloneElement(props.childComponent, { ...dataProps });
  } else {
    return <CircularProgressPage />;
  }
};
export default DietitianMenuContainer;
