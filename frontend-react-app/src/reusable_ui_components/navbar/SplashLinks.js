import FormattedLink from './FormattedLink';
const SplashLinks = (props) => (
  <>
    <FormattedLink
      url={'/splash-menu'}
      text={'Menu'}
      customTheme={props.customTheme}
    />

    <FormattedLink
      url={'/contact-us'}
      text={'Contact Us'}
      customTheme={props.customTheme}
    />
    <FormattedLink
      url={'/resources'}
      text={'Resources'}
      customTheme={props.customTheme}
    />
    <FormattedLink
      url={'/login-sign-up-choice'}
      text={'Log in'}
      customTheme={props.customTheme}
    />
  </>
);
export default SplashLinks;
