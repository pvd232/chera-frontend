export default function getBaseURL(service) {
  if (service === 'api') {
    // Host name will be localhost not localhost:3000 in jest environment
    if (
      window.location.host === 'localhost:3000' ||
      window.location.host === 'localhost'
    ) {
      return 'http://localhost:4000/api';
    } else if (window.location.host === 'staging.cherahealth.com') {
      return `https://${window.location.host}/api`;
    } else {
      return `https://${window.location.host}/api`;
    }
  } else {
    if (
      window.location.host === 'localhost:3000' ||
      window.location.host === 'localhost'
    ) {
      return 'http://localhost:3000';
    } else if (window.location.host === 'staging.cherahealth.com') {
      return `https://${window.location.host}`;
    } else {
      return `https://${window.location.host}`;
    }
  }
}
