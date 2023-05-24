import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ReasonFAQ from './ReasonFAQ';
import styles from './scss/FAQs.module.scss';
const ListOfFAQs = (props) => {
  return (
    <Grid container item className={styles.listOfFAQsContainer}>
      {/* first reason bullet */}
      <Stack className={styles.stack}>
        {props.faqs.map((faq, i) => (
          <ReasonFAQ
            customTheme={props.customTheme}
            reasonOpen={props.reasonOpen[`reason-${i + props.startingIndex}`]}
            setReasonOpen={() =>
              props.setReasonOpen(`reason-${i + props.startingIndex}`)
            }
            question={faq.question}
            answer={faq.answer}
            key={i + props.startingIndex}
          ></ReasonFAQ>
        ))}
      </Stack>
    </Grid>
  );
};
export default ListOfFAQs;
