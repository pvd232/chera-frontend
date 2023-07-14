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
  const [mealPlanMeals, setMealPlanMeals] = useState(false);
  const [mealPlanSnacks, setMealPlanSnacks] = useState(false);
  const [mealPlans, setMealPlans] = useState(false);
  const [extendedMeals, setExtendedMeals] = useState(false);
  const [specificFood, setSpecificFood] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      // if the client secret exists then this page is being rerendered and all of these values have been inputted

      specificMealPlanMeals: false,
      specificMealPlanSnacks: false,
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
    const specificSnacksPromise = APIClient.getSpecificExtendedMealPlanSnacks(
      false,
      5
    );
    const specificMealsPromise = APIClient.getSpecificExtendedMealPlanMeals(
      false,
      5
    );
    Promise.all([specificSnacksPromise, specificMealsPromise]).then(
      (responses) => {
        const mealPlanSnacksData = responses[0];
        console.log('mealPlanSnacksData', mealPlanSnacksData);
        const mealPlanMealsData = responses[1];
        console.log('mealPlanMealsData', mealPlanMealsData);
        if (mounted) {
          const extendedMealPlanSnackDTOs =
            mapExtendedMealPlanSnackData(mealPlanSnacksData);
          const extendedMealPlanMealDTOs =
            mapExtendedMealPlanMealData(mealPlanMealsData);
          setSpecificFood({
            specificMealPlanSnacks: extendedMealPlanSnackDTOs,
            specificMealPlanMeals: extendedMealPlanMealDTOs,
          });
        }
      }
    );
    Promise.resolve(CacheManager.shared.mealPlanSnacks).then((values) => {
      if (mounted) {
        const extendedMealPlanSnackDTOs = mapExtendedMealPlanSnackData(values);
        setMealPlanSnacks(extendedMealPlanSnackDTOs);
      }
    });
    Promise.resolve(CacheManager.shared.mealPlanMeals).then((values) => {
      if (mounted) {
        const extendedMealPlanMealDTOs = mapExtendedMealPlanMealData(values);
        setMealPlanMeals(extendedMealPlanMealDTOs);
      }
    });

    return () => (mounted = false);
  }, []);

  if (
    mealPlans &&
    extendedMeals &&
    specificFood.specificMealPlanSnacks &&
    specificFood.specificMealPlanMeals &&
    !mealPlanMeals
  ) {
    const dataProps = {
      mealPlans: mealPlans,
      mealPlanMeals: specificFood.specificMealPlanMeals,
      mealPlanSnacks: specificFood.specificMealPlanSnacks,
      extendedMeals: extendedMeals,
    };
    return cloneElement(props.childComponent, { ...dataProps });
  } else if (mealPlans && extendedMeals && mealPlanMeals && mealPlanSnacks) {
    const dataProps = {
      mealPlans: mealPlans,
      mealPlanMeals: mealPlanMeals,
      mealPlanSnacks: mealPlanSnacks,
      extendedMeals: extendedMeals,
    };
    return cloneElement(props.childComponent, { ...dataProps });
  } else {
    return <CircularProgressPage />;
  }
};
export default DietitianMenuContainer;
