import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const OrangeButtonWhiteText = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.olive.main,
  borderColor: theme.palette.olive.main,
  color: theme.palette.white1.main,
  fontWeight: 'bold',
  '&:hover': {
    borderColor: theme.palette.olive.main,
  },
}));

export default OrangeButtonWhiteText;
