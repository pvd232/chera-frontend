import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useReducer } from 'react';
import { useTheme } from '@mui/material/styles';
import dietitianFAQsArray from './dietitian_faqs_array';
import clientFAQsArray from './client_faqs_array';
import ListOfClientFAQs from './ListOfClientFAQs';
import ListOfDietitianFAQs from './ListOfDietitianFAQs';
import '../scss/Splash.scss';
const FAQs = () => {
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
    <Grid container item className="splash-page-container" paddingTop={'20vh'}>
      <Grid container item xs={10}>
        <Grid container item flexDirection={'column'} lg={6} xs={10}>
          <Grid item>
            <Typography
              className="splash-page-header"
              textAlign={'left !important'}
            >
              Frequently Asked Questions
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              className="splash-page-subheader"
              color={customTheme.palette.black.main}
            >
              If you have more questions, you can always reach out to us!
            </Typography>
          </Grid>
          <Typography color={customTheme.palette.black.main}>
            contact@cherahealth.com
          </Typography>
        </Grid>
        <Grid item xl={8} lg={6} xs={11} rowSpacing={'3vh'}>
          <Typography
            sx={{
              fontSize: customTheme.fontEqualizer(28),

              textAlign: 'center',
              fontStyle: 'italic',
            }}
            color={customTheme.palette.black.main}
          >
            For people seeking support
          </Typography>
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
            For dietitians interested in providing support
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
    </Grid>
  );
};
export default FAQs;
