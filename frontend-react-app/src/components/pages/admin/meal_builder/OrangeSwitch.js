import Switch from '@mui/material/Switch';
import { styled } from '@mui/system';
import { alpha } from '@mui/system';

const OrangeSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: theme.palette.olive.main,
    '&:hover': {
      backgroundColor: alpha(
        theme.palette.olive.main,
        theme.palette.action.hoverOpacity
      ),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: theme.palette.olive.main,
  },
}));
export default OrangeSwitch;
