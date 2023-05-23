import FormattedLink from './FormattedLink';
import NewMenuListComposition from './NewMenuListComposition';
import { LoginButton } from '../../components/buttons/login-button';
import { LogoutButton } from '../../components/buttons/logout-button';
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
    <h1> Dietician Login</h1>
    <LoginButton />
    <LogoutButton />
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
