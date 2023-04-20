// return a random number within a range
export default function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}
