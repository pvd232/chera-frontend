import { styled } from '@mui/system';
import Button from '@mui/material/Button';
const GreenButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.olive.main,
  color: theme.palette.olive.main,
  '&:hover': {
    borderColor: theme.palette.olive.main,
    color: theme.palette.olive.main,
  },
}));
export default GreenButton;
