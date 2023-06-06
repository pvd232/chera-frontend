import Button from '@mui/material/Button';
import { styled } from '@mui/system';
const BlackButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.black.main,
  color: theme.palette.white1.main,
  textTransform: 'none',
}));
export default BlackButton;
