import FormattedLink from './LegacyFormattedLink';
import NewMenuListComposition from '../AboutDropDown';

function dummyFunction() {
  return;
}
const ClientLinks = (props) => (
  <>
    <FormattedLink
      id={'client-home-link'}
      url={'/home'}
      text={'My Schedule'}
      customTheme={props.customTheme}
    />
    <FormattedLink
      id={'client-prev-deliveries-link'}
      url={'/previous-deliveries'}
      text={'Previous Deliveries'}
      customTheme={props.customTheme}
    />
    <NewMenuListComposition firstName={'admin'} logoutUser={dummyFunction} />
  </>
);
export default ClientLinks;
