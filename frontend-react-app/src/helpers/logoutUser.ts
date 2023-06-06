import NewLocalStorageManager from './NewLocalStorageManager';

// AUTH
// Anywhere this function is called in the app, the user will be logged out. Just search in your IDE for logoutUser and you'll see all the places it's called
export default function logoutUser() {
  window.location.assign('/');
  NewLocalStorageManager.shared.logoutUser();
}
