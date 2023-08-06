import ClientItem from '../../../ui_data_containers/ClientItem';
export const getStagedClientItems = (stagedClientArray) => {
  return stagedClientArray
    .filter((stagedClient) => !stagedClient.accountCreated)
    .map((stagedClient) => new ClientItem(stagedClient, true));
};
