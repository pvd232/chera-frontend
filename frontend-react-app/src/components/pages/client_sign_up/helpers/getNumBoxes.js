export const getNumBoxes = (numMeals, numSnacks) => {
  const totalNum = numMeals + numSnacks / 2;
  const numberOfTimes = Math.floor(totalNum / 8);
  const remainder = totalNum % 8;
  if (remainder === 0) {
    return numberOfTimes;
  } else {
    return numberOfTimes + 1;
  }
};
