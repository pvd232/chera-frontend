import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
const CustomTextField = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: theme.palette.fucia2.solid,
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.fucia2.solid,
    },
  },
}));
export default CustomTextField;
