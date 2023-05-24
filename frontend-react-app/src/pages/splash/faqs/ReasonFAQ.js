import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import CardContent from '@mui/material/CardContent';
import styles from './scss/ReasonFAQ.module.scss';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
const ReasonFAQ = (props) => (
  <Grid
    container
    item
    onClick={props.setReasonOpen}
    className={styles.reasonFAQContainer}
  >
    <Grid container item className={styles.questionContainer}>
      <Grid item>
        <Typography className={styles.questionText}>
          {props.question}
        </Typography>
      </Grid>
      <Grid item>
        <Icon
          sx={{
            transform: `scale(1.3)`,
          }}
        >
          arrow_drop_down
        </Icon>
      </Grid>
    </Grid>
    <Grid container item>
      <CardContent
        className={
          props.reasonOpen ? styles.answerTextOpen : styles.answerTextClosed
        }
      >
        <Grid container className={styles.answerTextContainer}>
          <Grid item>
            <SubdirectoryArrowRightIcon />
          </Grid>
          <Grid item>
            <Typography className={styles.answerText}>
              {props.answer}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Grid>
  </Grid>
);
export default ReasonFAQ;
