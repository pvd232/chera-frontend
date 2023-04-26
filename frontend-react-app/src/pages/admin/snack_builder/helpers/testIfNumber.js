export default function testIfNumber(number) {
  return /^[0-9]+(\.)?[0-9]*$/.test(number);
}
