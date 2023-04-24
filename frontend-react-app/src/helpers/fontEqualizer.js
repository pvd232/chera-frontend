const fontEqualizer = (fontSize, isGoogleSlidesFont = false) => {
  if (isGoogleSlidesFont === true) {
    fontSize = fontSize * 2.6667;
  }
  if (window.innerWidth < 450) {
    const newFontSize = (() => {
      const ratio = window.innerWidth / fontSize;
      const desiredRatio = (() => {
        if (fontSize <= 28) {
          return 470 / fontSize;
        } else {
          return 550 / fontSize;
        }
      })();

      const differenceInRatios = ratio / desiredRatio;
      return fontSize * differenceInRatios;
    })();
    return newFontSize;
  } else {
    return fontSize;
  }
};
export default fontEqualizer;
