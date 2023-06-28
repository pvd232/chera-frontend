import testIfNumber from './testIfNumber';
export const validateZipcode = (zipcode) => {
  if (zipcode.length < 5) {
    return false;
  } else {
    const zipcodeChars = zipcode.split('');
    for (let i = 0; i < zipcodeChars.length; i++) {
      if (!testIfNumber(zipcodeChars[i])) {
        return false;
      }
    }
  }

  return true;
};
