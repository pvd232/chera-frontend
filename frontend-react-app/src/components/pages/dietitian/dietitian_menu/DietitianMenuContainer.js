import { useState, useEffect, cloneElement } from 'react';
import APIClient from '../../../../helpers/APIClient';
import CacheManager from '../../../../helpers/CacheManager';
import MealPlanDTO from '../../../../data_models/dto/MealPlanDTO';
import MealPlan from '../../../../data_models/model/MealPlan';
import MealDietaryRestrictionDTOFactory from '../../../../data_models/factories/dto/MealDietaryRestrictionDTOFactory';
import MealDietaryRestrictionFactory from '../../../../data_models/factories/model/MealDietaryRestrictionFactory';
import ExtendedMeal from '../../../../data_models/model/ExtendedMeal';
import ExtendedMealDTO from '../../../../data_models/dto/ExtendedMealDTO';
import CircularProgressPage from '../../../shared_components/CircularProgressPage';
import { mapMealNutrientStatsData } from './helpers/mapMealNutrientStatsData';
import { mapSnackNutrientStatsData } from './helpers/mapSnackNutrientStatsData';

const DietitianMenuContainer = (props) => {
  const [mealPlans, setMealPlans] = useState(false);
  const [extendedMeals, setExtendedMeals] = useState(false);
  const [specificMealNutrientStats, setSpecificMealNutrientStats] =
    useState(false);
  const [mealNutrientStats, setMealNutrientStats] = useState(false);
  const [snackNutrientStats, setSnackNutrientStats] = useState(false);

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

    APIClient.getSpecificMealNutrientStatsObjects(false, 5).then(
      (mealPlanMealsData) => {
        if (mounted) {
          const extendedMealPlanMealDTOs =
            mapMealNutrientStatsData(mealPlanMealsData);
          setSpecificMealNutrientStats(extendedMealPlanMealDTOs);
        }
      }
    );

    const mealNutrientStatsPromise = CacheManager.shared.mealNutrientStats;
    Promise.resolve(mealNutrientStatsPromise).then((mealNutrientStatsData) => {
      if (mounted) {
        const mealNutrientStatsDTOs = mapMealNutrientStatsData(
          mealNutrientStatsData
        );
        setMealNutrientStats(mealNutrientStatsDTOs);
      }
    });
    const snackNutrientStatsPromise = CacheManager.shared.snackNutrientStats;
    Promise.resolve(snackNutrientStatsPromise).then(
      (snackNutrientStatsData) => {
        if (mounted) {
          const snackNutrientStatsDTOs = mapSnackNutrientStatsData(
            snackNutrientStatsData
          );
          setSnackNutrientStats(snackNutrientStatsDTOs);
        }
      }
    );
    return () => (mounted = false);
  }, []);

  if (
    mealPlans &&
    extendedMeals &&
    specificMealNutrientStats &&
    !mealNutrientStats &&
    snackNutrientStats
  ) {
    const updatedMealNutrientStats = mapMealNutrientStatsData(specificMealNutrientStats, extendedMeals)
    const dataProps = {
      mealPlans: mealPlans,
      mealPlanMeals: updatedMealNutrientStats,
      mealPlanSnacks: snackNutrientStats,
      extendedMeals: extendedMeals,
    };
    return cloneElement(props.childComponent, { ...dataProps });
  } else if (
    mealPlans &&
    extendedMeals &&
    mealNutrientStats &&
    snackNutrientStats
  ) {
    const updatedMealNutrientStats = mapMealNutrientStatsData(mealNutrientStats, extendedMeals)

    const dataProps = {
      mealPlans: mealPlans,
      mealPlanMeals: updatedMealNutrientStats,
      mealPlanSnacks: snackNutrientStats,
      extendedMeals: extendedMeals,
      
    };
    return cloneElement(props.childComponent, { ...dataProps });
  } else {
    return <CircularProgressPage />;
  }
};
export default DietitianMenuContainer;
