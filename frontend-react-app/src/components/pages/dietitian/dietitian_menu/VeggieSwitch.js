import { styled } from '@mui/system';
import Switch from '@mui/material/Switch';

const VeggieSwitch = styled(Switch)(({ theme }) => ({
  '.MuiSwitch-switchBase': {
    color: '#a5d6a7',
    '&.Mui-checked': {
      color: '#4caf50',
      '&.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#4caf50',
      },
      '.MuiSwitch-thumb': {
        width: '20px',
        height: '20px',
        borderRadius: '0',
        backgroundColor: '#4caf50',
        position: 'relative',
        '&::before': {
          content: '"\u2713"',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          color: 'white',
          fontSize: '1em',
        },
      },
    },
  },
}));

export default VeggieSwitch;
