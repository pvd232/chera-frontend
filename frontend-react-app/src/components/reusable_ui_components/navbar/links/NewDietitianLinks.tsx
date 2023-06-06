import NewFormattedLink from './NewFormattedLink';
// import NewMenuListComposition from '../NewMenuListComposition';

const DietitianLinks = (): JSX.Element => (
  <>
    <NewFormattedLink
      id="client-meals-link"
      url={'/client-meals'}
      text={'Meals'}
    />

    <NewFormattedLink
      id="meal-plans-link"
      url={'/meal-plans'}
      text={'Meal Plans'}
    />
    <NewFormattedLink
      id="dietitian-menu"
      url={'/dietitian-menu'}
      text={'Menu'}
    />
  </>
);
export default DietitianLinks;
