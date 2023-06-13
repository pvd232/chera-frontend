import DeliveryDateUtility from '../../../../../helpers/DeliveryDateUtility.ts';
export const pastCutoffDate = (selectedDeliveryIndex: number) => {
  const today = new Date();
  if (
    today >= DeliveryDateUtility.getCutoffDateFromIndex(selectedDeliveryIndex)
  ) {
    return true;
  } else {
    return false;
  }
};
