import { styled } from '@mui/system';
import Button from '@mui/material/Button';
const ModalButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.olive.main,
  color: theme.palette.white1.main,
  backgroundColor: theme.palette.olive.main,
  fontWeight: 'bold',
  fontSize: theme.fontEqualizer(14),
  '&:hover': {
    borderColor: theme.palette.olive.main,
  },
}));
export default ModalButton;
