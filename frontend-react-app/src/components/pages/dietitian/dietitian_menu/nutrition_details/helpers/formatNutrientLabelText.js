const formatNutrientLabelText = (arg) => {
  const argAsPercent = Math.round(arg.value * 100);
  return `${argAsPercent}%`;
};
export default formatNutrientLabelText;
