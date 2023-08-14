import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useReducer } from 'react';
import { useTheme } from '@mui/material/styles';
import dietitianFAQsArray from './dietitian_faqs_array';
import clientFAQsArray from './client_faqs_array';
import ListOfFAQs from './ListOfFAQs';
import styles from './scss/FAQs.module.scss';
const FAQs = () => {
  const customTheme = useTheme();
  const reasonOpenObject = {};
  const combinedListOfFAQS = [...clientFAQsArray, ...dietitianFAQsArray];
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
    <Grid container item className={styles.FAQsPageContainer}>
      <Grid container item xs={10} className={styles.childContainer}>
        <Grid container item lg={5} xs={10} className={styles.LHS}>
          <Grid item>
            <Typography className={styles.header}>FAQs</Typography>
          </Grid>
          <Grid item>
            <Typography className={styles.subheader}>
              If you have more questions, please reach out!
            </Typography>
          </Grid>

          <a className={styles.emailLink} href="mailto:contact@cherahealth.com">
            contact@cherahealth.com
          </a>
        </Grid>
        <Grid item container lg={7} xs={11} className={styles.RHS}>
          <Grid container item className={styles.segmentContainer}>
            <Grid item>
              <Typography className={styles.header}>
                For people seeking support
              </Typography>
            </Grid>
            <ListOfFAQs
              faqs={clientFAQsArray}
              customTheme={customTheme}
              reasonOpen={reasonOpen}
              setReasonOpen={(reason) => handleSetReasonOpen(reason)}
              startingIndex={0}
            />
          </Grid>
          <Grid container item className={styles.segmentContainer}>
            <Grid item>
              <Typography className={styles.header}>
                For dietitians interested in providing support
              </Typography>
            </Grid>
            <ListOfFAQs
              faqs={dietitianFAQsArray}
              customTheme={customTheme}
              reasonOpen={reasonOpen}
              setReasonOpen={(reason) => handleSetReasonOpen(reason)}
              startingIndex={clientFAQsArray.length}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default FAQs;
