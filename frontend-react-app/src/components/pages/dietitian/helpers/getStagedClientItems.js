import ClientItem from '../../../ui_data_containers/ClientItem';
export const getStagedClientItems = (stagedClientArray) => {
  return stagedClientArray.map(
    (stagedClient) => new ClientItem(stagedClient, true)
  );
};
