import { useState, useEffect } from 'react';
import { getMealPlanMeal } from '../helpers/getMealPlanMeal';
export const useMealPlanMeal = (mealPlanId, mealId) => {
  const [mealPlanMeal, setMealPlanMeal] = useState(false);
  useEffect(() => {
    let mounted = true;
    getMealPlanMeal(mealPlanId, mealId).then((mealPlanMeal) => {
      if (mounted) {
        setMealPlanMeal(mealPlanMeal);
      }
      return () => (mounted = false);
    });
  }, [mealPlanId, mealId]);
  return [mealPlanMeal, setMealPlanMeal];
};
