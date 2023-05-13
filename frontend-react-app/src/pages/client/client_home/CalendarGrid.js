import { styled } from '@mui/system';
import Grid from '@mui/material/Grid';

const CalendarGrid = styled(Grid)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    borderBottom: `${`solid 2px ${theme.palette.orange.main}`}`,
    '&>div': {
      color: theme.palette.orange.main,
      fontWeight: 'bold',
      letterSpacing: '0.03em',
      textAlign: 'center',
    },
  },
}));
export default CalendarGrid;
