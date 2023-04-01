import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ReasonFAQ from './ReasonFAQ';
import clientFAQsArray from './client_faqs_array';
import dietitianFAQsArray from './dietitian_faqs_array';
const ListOfDietitianFAQs = (props) => {
  const lengthOfClientFAQs = clientFAQsArray().length;
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
          {dietitianFAQsArray().map((faq, i) => (
            <ReasonFAQ
              customTheme={props.customTheme}
              reasonOpen={props.reasonOpen[`reason-${i + lengthOfClientFAQs}`]}
              setReasonOpen={() =>
                props.setReasonOpen(`reason-${i + lengthOfClientFAQs}`)
              }
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
export default ListOfDietitianFAQs;
