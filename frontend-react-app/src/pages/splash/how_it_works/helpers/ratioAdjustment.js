const ratioAdjustment = (customTheme) => {
  // for smaller screen size the logos appear way too small
  if (customTheme.extraSmallScreen() || customTheme.extraExtraSmallScreen()) {
    return window.innerWidth / 170;
  } else if (customTheme.smallScreen()) {
    return window.innerWidth / 310;
  } else if (customTheme.mediumScreen()) {
    return window.innerWidth / 350;
  } else if (customTheme.largeScreen()) {
    return window.innerWidth / 500;
  } else if (customTheme.extraLargeScreen()) {
    return window.innerWidth / 600;
  }
};
export default ratioAdjustment;
