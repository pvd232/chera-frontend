import Snack from '../../model/Snack';

export default class SnackFactory {
  injectInstance(snackJSON) {
    return new Snack(snackJSON);
  }
}
