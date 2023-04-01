import { styled } from '@mui/system';
import Button from '@mui/material/Button';
const GreenFilledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.olive.main,
  borderColor: theme.palette.olive.main,
  color: theme.palette.white1.main,
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: theme.palette.olive.main,
    borderColor: theme.palette.olive.main,
    color: theme.palette.white1.main,
  },
}));

export default GreenFilledButton;
