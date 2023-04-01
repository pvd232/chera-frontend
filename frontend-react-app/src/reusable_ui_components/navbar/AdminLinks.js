import Grid from '@mui/material/Grid';
import FormattedLink from './FormattedLink';
import MenuListComposition from './MenuListComposition';
const AdminLinks = (props) => (
  <>
    <FormattedLink
      url="/admin-client-meals"
      text="Client Meals"
    ></FormattedLink>
    <FormattedLink url="/admin-dietitians" text="Dietitians">
      Dietitians
    </FormattedLink>
    <FormattedLink url="/admin-meal-plans" text="Meal Plans"></FormattedLink>
    <Grid
      item
      position={props.customTheme.largerScreen() ? 'absolute' : ''}
      alignSelf={'flex-end'}
      right={'1vw'}
    >
      <MenuListComposition
        firstName={props.firstName}
        logoutUser={props.logoutUser}
      />
    </Grid>
  </>
);
export default AdminLinks;
