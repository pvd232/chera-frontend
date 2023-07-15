export default function getBaseURL(service) {
  if (service === 'api') {
    if (window.location.origin.includes('localhost')) {
      return 'http://localhost:4000/api';
    } else {
      return `${window.location.origin}/api`;
    }
  } else {
    return `${window.location.origin}`;
  }
}
