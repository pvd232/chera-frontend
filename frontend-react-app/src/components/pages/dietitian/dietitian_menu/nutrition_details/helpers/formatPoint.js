const formatPoint = (arg) => {
  if (arg.data.id === 'fat') {
    return { color: '#FF0800' };
  } else if (arg.data.id === 'protein') {
    return { color: '#FF9F00' };
  } else if (arg.data.id === 'carb') {
    return { color: '#FF5E0E' };
  }
};
export default formatPoint;
