import NewFormattedLink from './NewFormattedLink';
// import NewMenuListComposition from '../NewMenuListComposition';
import { Grid } from '@mui/material';
const NewClientLinks = () => (
  <Grid container>
    <NewFormattedLink
      id={'client-home-link'}
      url={'/home'}
      text={'My Schedule'}
      // customTheme={props.customTheme}
    />
    <NewFormattedLink
      id={'client-prev-deliveries-link'}
      url={'/previous-deliveries'}
      text={'Previous Deliveries'}
      // customTheme={props.customTheme}
    />
    {/* <NewMenuListComposition firstName={'admin'}  /> */}
  </Grid>
);
export default NewClientLinks;
