export function capitalizeWords(string) {
  let words = string.split(' ');
  words = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return words.join(' ');
}
