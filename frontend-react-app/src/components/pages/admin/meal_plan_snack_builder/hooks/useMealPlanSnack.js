import { useState, useEffect } from 'react';
import { getMealPlanSnack } from '../helpers/getMealPlanSnack';
export const useMealPlanSnack = (mealPlanId, mealId) => {
  const [mealPlanSnack, setMealPlanSnack] = useState(false);
  useEffect(() => {
    let mounted = true;
    getMealPlanSnack(mealPlanId, mealId).then((mealPlanSnack) => {
      if (mounted) {
        setMealPlanSnack(mealPlanSnack);
      }
      return () => (mounted = false);
    });
  }, [mealPlanId, mealId]);
  return [mealPlanSnack, setMealPlanSnack];
};
