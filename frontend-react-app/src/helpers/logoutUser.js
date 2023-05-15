import LocalStorageManager from './LocalStorageManager';
export default function logoutUser() {
  LocalStorageManager.shared.logoutUser();
  window.location.assign('/');
}
