import FormattedLink from './FormattedLink';
import MenuListComposition from './MenuListComposition';

const ClientLinks = (props) => (
  <>
    <FormattedLink
      url={'/home'}
      text={'My Schedule'}
      customTheme={props.customTheme}
    />
    <FormattedLink
      url={'/previous-deliveries'}
      text={'Previous Deliveries'}
      customTheme={props.customTheme}
    />
    <MenuListComposition
      firstName={props.firstName}
      logoutUser={props.logoutUser}
    />
  </>
);
export default ClientLinks;
