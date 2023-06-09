export const getReminderLoading = (stagedClients) => {
  const valueTOReturn = stagedClients.map((stagedClient) => ({
    id: stagedClient.id,
    isLoading: false,
  }));
  return valueTOReturn;
};
