import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ReasonFAQ from './ReasonFAQ';
import clientFAQsArray from './client_faqs_array';

const ListOfClientFAQs = (props) => {
  return (
    <Grid item container>
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: props.customTheme.palette.white1.main,
          borderRadius: '10px',
          paddingLeft: '10px',
          paddingRight: '10px',
        }}
      >
        {/* first reason bullet */}
        <Stack rowGap={2} margin={3}>
          {clientFAQsArray().map((faq, i) => (
            <ReasonFAQ
              customTheme={props.customTheme}
              reasonOpen={props.reasonOpen[`reason-${i}`]}
              setReasonOpen={() => props.setReasonOpen(`reason-${i}`)}
              question={faq.question}
              answer={faq.answer}
              key={i}
            ></ReasonFAQ>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};
export default ListOfClientFAQs;
