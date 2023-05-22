import LocalStorageManager from './LocalStorageManager';

// AUTH
// Anywhere this function is called in the app, the user will be logged out. Just search in your IDE for logoutUser and you'll see all the places it's called
export default function logoutUser() {
  LocalStorageManager.shared.logoutUser();
  window.location.assign('/');
}
