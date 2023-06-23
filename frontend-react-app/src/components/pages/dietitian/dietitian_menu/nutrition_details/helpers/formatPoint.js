const formatPoint = (arg) => {
  if (arg.data.id === 'fat') {
    return { color: '#8b0054' };
  } else if (arg.data.id === 'protein') {
    return { color: '#d4218d' };
  } else if (arg.data.id === 'carb') {
    return { color: '#ffceec' };
  }
};
export default formatPoint;
