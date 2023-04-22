import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useReducer } from 'react';
import dietitianFAQsArray from './dietitian_faqs_array';
import clientFAQsArray from './client_faqs_array';
import ListOfClientFAQs from './ListOfClientFAQs';
import ListOfDietitianFAQs from './ListOfDietitianFAQs';
import { useTheme } from '@mui/material/styles';

const FAQs = (props) => {
  const customTheme = useTheme();
  const reasonOpenObject = {};
  const combinedListOfFAQS = [...clientFAQsArray(), ...dietitianFAQsArray()];
  combinedListOfFAQS.forEach(
    (_, i) => (reasonOpenObject[`reason-${i}`] = false)
  );
  const [reasonOpen, setReasonOpen] = useReducer((state, name) => {
    const newState = { ...state };
    const newStateValue = !state[name];
    newState[name] = newStateValue;
    return { ...state, ...newState };
  }, reasonOpenObject);

  const handleSetReasonOpen = (reasonNumber) => {
    setReasonOpen(reasonNumber);
  };

  return (
    <Grid container item justifyContent={'center'} rowSpacing={4}>
      <Grid item xs={12}>
        <Typography
          sx={{
            fontSize: customTheme.fontEqualizer(48),

            fontWeight: '500',
            textAlign: 'center',
            marginBottom: '3vh',
          }}
          color={customTheme.palette.black.main}
        >
          Frequently Asked Questions
        </Typography>
        <Typography
          sx={{
            fontSize: customTheme.fontEqualizer(28),

            textAlign: 'center',
            fontStyle: 'italic',
          }}
          color={customTheme.palette.black.main}
        >
          (For Clients)
        </Typography>
      </Grid>
      <Grid item xl={8} lg={6} xs={11}>
        <ListOfClientFAQs
          customTheme={customTheme}
          reasonOpen={reasonOpen}
          setReasonOpen={(reason) => handleSetReasonOpen(reason)}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography
          sx={{
            fontSize: customTheme.fontEqualizer(28),

            textAlign: 'center',
            paddingTop: '2vh',
            fontStyle: 'italic',
          }}
          color={customTheme.palette.black.main}
        >
          (For Dietitians)
        </Typography>
      </Grid>
      <Grid item xl={8} lg={6} xs={11}>
        <ListOfDietitianFAQs
          customTheme={customTheme}
          reasonOpen={reasonOpen}
          setReasonOpen={(reason) => handleSetReasonOpen(reason)}
        ></ListOfDietitianFAQs>
      </Grid>
    </Grid>
  );
};
export default FAQs;
