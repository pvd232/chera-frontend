import ClientItem from '../../../ui_data_containers/ClientItem';
export const getClientItems = (clientArray) => {
  return clientArray.map((client) => new ClientItem(client, false));
};
