const formatNutrientLabelText = (arg) => {
  const argAsPercent = Math.round(arg.value * 100);
  // Show <1% if the value is less than 1%, otherwise the value will be rounded to 0%
  if (argAsPercent === 0) {
    return '<1%';
  } else {
    return `${argAsPercent}%`;
  }
};
export default formatNutrientLabelText;
