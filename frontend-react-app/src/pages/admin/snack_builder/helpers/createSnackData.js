import SnackDTO from '../../../../data_models/dto/SnackDTO';

export default function createSnackData(
  snackId,
  snackName,
  snackPrice,
  snackDescription,
  imageUrl
) {
  const newSnack = new SnackDTO({
    id: snackId,
    name: snackName,
    price: snackPrice,
    description: snackDescription,
    image_url: imageUrl,
    active: true,
  });
  return newSnack;
}
