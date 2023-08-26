import Grid from '@mui/material/Grid';
import ReasonBullet from './ReasonBullet';
import styles from './scss/WhyUs.module.scss';

const ListOfReasons = (props) => (
  <Grid item xs={12} className={styles.listOfReasonsContainer}>
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
      reasonOpen={props.reasonOpen.sixth}
      setReasonOpen={() => props.setReasonOpen('sixth')}
      bulletPrimaryText={
        props.xsScreen
          ? 'Gourmet Prepared Food'
          : 'Gourmet, Fully Prepared Meals & Snacks'
      }
      bulletSecondaryText={
        'All our food is homemade, gourmet, and fully prepared + freezer friendly.'
      }
      icon={'dinner_dining'}
    />
    <ReasonBullet
      reasonOpen={props.reasonOpen.first}
      setReasonOpen={() => props.setReasonOpen('first')}
      bulletPrimaryText={
        props.xsScreen
          ? 'Collaborative Meal Planning'
          : 'Collaborative Meal Planning & Delivery'
      }
      bulletSecondaryText={
        'By making it easier for dietitians and clients to collaboratively build meal plans, we aim to support recovery and impede relapse.'
      }
      icon={'checklist'}
    />
    <ReasonBullet
      reasonOpen={props.reasonOpen.third}
      setReasonOpen={() => props.setReasonOpen('third')}
      bulletPrimaryText={'Personalized Portion Sizes'}
      bulletSecondaryText={
        'We fine tune our meal portion sizes to your precise nutritional needs.'
      }
      icon={'tune'}
    />

    <ReasonBullet
      reasonOpen={props.reasonOpen.fourth}
      setReasonOpen={() => props.setReasonOpen('fourth')}
      bulletPrimaryText={'Client Journey Tracking'}
      bulletSecondaryText={
        'We provide a simple dashboard for dietitians to manage clients and comprehensively monitor their nutritional intake.'
      }
      icon={'monitor_heart'}
    />
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
    />
  </Grid>
);
export default ListOfReasons;
