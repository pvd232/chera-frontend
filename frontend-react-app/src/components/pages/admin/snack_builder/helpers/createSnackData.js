import SnackDTO from '../../../../../data_models/dto/SnackDTO';

export default function createSnackData(
  snackId,
  snackName,
  snackDescription,
  imageUrl
) {
  const newSnack = new SnackDTO({
    id: snackId,
    name: snackName,
    description: snackDescription,
    image_url: imageUrl,
    active: true,
  });
  return newSnack;
}
