export const getAddressObject = (address) => {
  const addressObject = {};
  addressObject.address = address;
  const addressArray = address.split(',');
  addressObject.street = addressArray[0].trim();
  addressObject.city = addressArray[1].trim();
  const stateZipcodeArray = addressArray[2].split(' ');
  addressObject.state = stateZipcodeArray[1];
  addressObject.zipcode = stateZipcodeArray[2];
  if (
    !addressObject.address ||
    !addressObject.city ||
    !addressObject.state ||
    !addressObject.street ||
    !addressObject.zipcode
  ) {
    return false;
  }
  return addressObject;
};
