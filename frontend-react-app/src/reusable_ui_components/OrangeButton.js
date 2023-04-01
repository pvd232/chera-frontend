import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const OrangeButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.olive.main,
  color: theme.palette.olive.main,
  '&:hover': {
    borderColor: theme.palette.olive.main,
  },
}));
export default OrangeButton;
