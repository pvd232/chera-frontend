import FormattedLink from './FormattedLink';
import MenuListComposition from './MenuListComposition';
const DietitianLinks = (props) => (
  <>
    <FormattedLink
      url={'/client-meals'}
      text={props.customTheme.smallerScreen() ? 'Meals' : 'Client Meals'}
      customTheme={props.customTheme}
    />

    <FormattedLink
      url={'/meal-plans'}
      text={'Meal Plans'}
      customTheme={props.customTheme}
    />
    <FormattedLink
      url={'/dietitian-menu'}
      text={'Menu'}
      customTheme={props.customTheme}
    />
    <MenuListComposition
      firstName={props.firstName}
      logoutUser={props.logoutUser}
    />
  </>
);
export default DietitianLinks;
