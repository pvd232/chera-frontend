import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const OrangeButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.black.main,
  color: theme.palette.black.main,
  '&:hover': {
    borderColor: theme.palette.black.main,
  },
}));
export default OrangeButton;
