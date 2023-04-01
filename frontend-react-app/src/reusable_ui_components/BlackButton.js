import Button from '@mui/material/Button';
import { styled } from '@mui/system';
const BlackButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.black.main,
}));
export default BlackButton;
