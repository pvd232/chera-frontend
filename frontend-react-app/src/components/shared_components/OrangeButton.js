import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const OrangeButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.fucia.main,
  color: theme.palette.fucia.main,
  '&:hover': {
    borderColor: theme.palette.fucia.main,
  },
}));
export default OrangeButton;
