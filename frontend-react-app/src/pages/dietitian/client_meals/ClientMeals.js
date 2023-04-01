import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import ClientMealsTable from './ClientMealsTable';
import createScheduleMealCardItems from './helpers/createScheduleMealCardItems';
const ClientMeals = (props) => {
  const customTheme = useTheme();
  const [filterClient, setFilterClient] = useState('all');
  const [scheduleMealCardItems, setScheduleMealCardItems] = useState(
    createScheduleMealCardItems(props.dataProps.scheduleMeals)
  );
  const scheduleMealsByMealSubscriptionMap = (() => {
    const map = new Map();
    props.dataProps.scheduleMeals.forEach((extendedScheduleMeal) => {
      if (map.has(extendedScheduleMeal.mealSubscriptionId)) {
        map
          .get(extendedScheduleMeal.mealSubscriptionId)
          .push(extendedScheduleMeal);
      } else {
        map.set(extendedScheduleMeal.mealSubscriptionId, [
          extendedScheduleMeal,
        ]);
      }
    });
    return map;
  })();
  const mealSubscriptionsByClientIdMap = (() => {
    const map = new Map();
    props.dataProps.mealSubscriptions.forEach((mealSubscription) => {
      map.set(mealSubscription.clientId, mealSubscription);
    });
    return map;
  })();
  const handleFilterChange = (event) => {
    // nesting the dependent state object' setState function works! nesting is based on dependency order ie., everything is dependent on client filter, which filters meals that are entered into mealSubscription filter which filters schedule meals
    setFilterClient(event.target.value);
    setScheduleMealCardItems(() => {
      if (event.target.value !== 'all') {
        const client = props.dataProps.clients.clientMap.get(
          event.target.value
        );
        const mealSubscription = mealSubscriptionsByClientIdMap.get(client.id);

        return createScheduleMealCardItems(
          scheduleMealsByMealSubscriptionMap.get(mealSubscription.id)
        );
      } else {
        return createScheduleMealCardItems(props.dataProps.scheduleMeals);
      }
    });
  };

  return (
    <Grid
      container
      justifyContent={'center'}
      paddingLeft={'2vw'}
      paddingRight={'2vw'}
    >
      <ClientMealsTable
        customTheme={customTheme}
        clients={props.dataProps.clients}
        filterClient={filterClient}
        scheduleMealCardItems={Array.from(scheduleMealCardItems)}
        handleFilterChange={(e) => handleFilterChange(e)}
      />
    </Grid>
  );
};
export default ClientMeals;
