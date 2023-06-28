import Grid from '@mui/material/Grid';
import ReasonBullet from './ReasonBullet';
import styles from './scss/WhyUs.module.scss';

const ListOfReasons = (props) => (
  <Grid item xs={12} className={styles.listOfReasonsContainer}>
    <ReasonBullet
      reasonOpen={props.reasonOpen.first}
      setReasonOpen={() => props.setReasonOpen('first')}
      bulletPrimaryText={'Simplified Meal Planning & Delivery'}
      bulletSecondaryText={
        'By making meal planning easier for dietitians and their clients, we aim to support recovery and impede relapse.'
      }
      icon={'checklist'}
    ></ReasonBullet>
    <ReasonBullet
      reasonOpen={props.reasonOpen.second}
      setReasonOpen={() => props.setReasonOpen('second')}
      bulletPrimaryText={'Thoughtful Labeling '}
      bulletSecondaryText={
        "We don't place nutrition labels on our meals, and prioritize neutral language around food."
      }
      icon={'redeem'}
    ></ReasonBullet>
    <ReasonBullet
      reasonOpen={props.reasonOpen.third}
      setReasonOpen={() => props.setReasonOpen('third')}
      bulletPrimaryText={'Personalized Meals'}
      bulletSecondaryText={
        'We fine tune our meal and snack serving sizes according to the precise nutritional needs of our clients.'
      }
      icon={'tune'}
    ></ReasonBullet>

    <ReasonBullet
      reasonOpen={props.reasonOpen.fourth}
      setReasonOpen={() => props.setReasonOpen('fourth')}
      bulletPrimaryText={'Client Journey Tracking'}
      bulletSecondaryText={
        'Our platform provides an easy-to-use dashboard to manage client meal plans, view client meals and snacks, and comprehensively monitor nutritional intake.'
      }
      icon={'monitor_heart'}
    ></ReasonBullet>
    <ReasonBullet
      reasonOpen={props.reasonOpen.fifth}
      setReasonOpen={() => props.setReasonOpen('fifth')}
      bulletPrimaryText={
        props.xsScreen
          ? 'Trusted Nutrition Creds'
          : 'Trusted Nutrition Credentials'
      }
      bulletSecondaryText={
        'All our meals and snacks are all dietitian approved, and were served to hundreds of nutritional experts at FNCE 2022.'
      }
      icon={'verified'}
    ></ReasonBullet>
    <ReasonBullet
      reasonOpen={props.reasonOpen.sixth}
      setReasonOpen={() => props.setReasonOpen('sixth')}
      bulletPrimaryText={'Fully Prepared Meals & Snacks'}
      bulletSecondaryText={
        'Our meals and snacks come fully prepared and are freezer friendly.'
      }
      icon={'dinner_dining'}
    ></ReasonBullet>
  </Grid>
);
export default ListOfReasons;
