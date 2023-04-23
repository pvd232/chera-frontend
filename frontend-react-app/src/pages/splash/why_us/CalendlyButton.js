import { useState } from 'react';
import { PopupModal } from 'react-calendly';
import { useTheme } from '@mui/material/styles';
import BlackButton from '../../../reusable_ui_components/BlackButton';
const CalendlyButton = () => {
  const customTheme = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <BlackButton
        variant="contained"
        sx={{
          paddingLeft: '2vw',
          paddingRight: '2vw',
          width: 'fit-content',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '0vh',
          fontSize: customTheme.fontEqualizer(16),
        }}
        onClick={() => setOpen(true)}
      >
        Meet with us
      </BlackButton>

      <PopupModal
        url="https://calendly.com/peterdriscoll27/discovery-call"
        onModalClose={() => setOpen(false)}
        open={open}
        rootElement={document.getElementById('root')}
      />
    </div>
  );
};
export default CalendlyButton;
