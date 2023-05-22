import FormattedLink from './FormattedLink';
import NewMenuListComposition from './NewMenuListComposition';
const SplashLinks = (props) => (
  <>
    <FormattedLink
      url={'/FAQs'}
      text={'faqs'}
      customTheme={props.customTheme}
    />

    <FormattedLink
      url={'/d-home'}
      text={'For Dieticians'}
      customTheme={props.customTheme}
    />
    {/* <FormattedLink
      url={"/about-chera"}
      text={"About Chera"}
      customTheme={props.customTheme}
    /> */}
    <FormattedLink
      url={'/dietitian-login'}
      text={'Dietician login'}
      customTheme={props.customTheme}
    />
    {/* <FormattedLink
      url={"/dietitian-sign-up"}
      text={"Dietician sign up"}
      customTheme={props.customTheme}
    /> */}
  </>
);
export default SplashLinks;
