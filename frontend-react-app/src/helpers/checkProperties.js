export default function checkProperties(instance) {
  for (const [key, value] of Object.entries(instance)) {
    if (value === undefined || value === null) {
      const errorMessage = `Undefined key: ${key}`;
      console.error(errorMessage);
      throw Error(errorMessage);
    }
  }
  return true;
}
