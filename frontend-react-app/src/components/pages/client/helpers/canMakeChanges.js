import DeliveryDateUtility from '../../../../helpers/DeliveryDateUtility';
const canMakeChanges = (selectedDeliveryIndex) => {
  const today = new Date();
  if (
    today >= DeliveryDateUtility.getCutoffDateFromIndex(selectedDeliveryIndex)
  ) {
    return false;
  } else {
    return true;
  }
};
export default canMakeChanges;
