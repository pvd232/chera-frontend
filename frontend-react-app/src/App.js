import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Main from './Main.js';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import customTheme from './customTheme';
let stripePromise;

if (window.location.host === 'localhost:3000') {
  stripePromise = loadStripe(
    'pk_test_51I0xFxFseFjpsgWvepMo3sJRNB4CCbFPhkxj2gEKgHUhIGBnciTqNVzjz1wz68Btbd5zAb2KC9eXpYaiOwLDA5QH00SZhtKPLT'
  );
} else {
  stripePromise = loadStripe(
    'pk_live_51I0xFxFseFjpsgWvD9dTResiaTt2yDWUuPNR6aVq4mJ1XIG6TLpKHVT9BxmezxcytTugPEkzs0wCSJ6VV74Pb1VJ00Flau56PH'
  );
}

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Main stripePromise={stripePromise} />
    </ThemeProvider>
  );
};
export default App;
