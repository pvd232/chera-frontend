import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
const CustomTextField = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: theme.palette.fucia.main,
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.fucia.main,
    },
    // antiqueWhite in index.scss
    backgroundColor: '#fcfcfb',
  },
}));
export default CustomTextField;
