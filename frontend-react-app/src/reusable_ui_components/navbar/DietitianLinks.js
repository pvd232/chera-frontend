import FormattedLink from "./FormattedLink";
import NewMenuListComposition from "./NewMenuListComposition";

function dummyFunction() {
  return;
}
const DietitianLinks = (props) => (
  <>
    <FormattedLink
      url={"/client-meals"}
      text={props.customTheme.smallerScreen() ? "Meals" : "Client Meals"}
      customTheme={props.customTheme}
    />

    <FormattedLink
      url={"/meal-plans"}
      text={"Meal Plans"}
      customTheme={props.customTheme}
    />
    <FormattedLink
      url={"/dietitian-menu"}
      text={"Menu"}
      customTheme={props.customTheme}
    />
    <NewMenuListComposition
      firstName={"admin"}
      logoutUser={dummyFunction}
    />
  </>
);
export default DietitianLinks;
