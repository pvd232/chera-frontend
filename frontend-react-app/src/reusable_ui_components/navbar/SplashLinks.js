import FormattedLink from './FormattedLink';
const SplashLinks = (props) => (
  <>
    <FormattedLink
      url={'/FAQs'}
      text={'faqs'}
      customTheme={props.customTheme}
    />

    <FormattedLink
      url={'/contact'}
      text={'Contact'}
      customTheme={props.customTheme}
    />
    <FormattedLink
      url={'/resources'}
      text={'Resources'}
      customTheme={props.customTheme}
    />
    <FormattedLink
      url={'/login-sign-up-choice'}
      text={'Login'}
      customTheme={props.customTheme}
    />
  </>
);
export default SplashLinks;
