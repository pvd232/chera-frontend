import SnackDTO from '../../dto/SnackDTO';

export default class SnackDTOFactory {
  injectInstance(snackJSON) {
    return new SnackDTO(snackJSON);
  }
}
