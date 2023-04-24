import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import ReasonBullet from './ReasonBullet';

const ListOfReasons = (props) => {
  const customTheme = useTheme();
  return (
    <Grid item container>
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: customTheme.palette.white1.main,
          borderRadius: '10px',
          paddingLeft: '10px',
          paddingRight: '10px',
        }}
      >
        {/* first reason bullet */}
        <ReasonBullet
          customTheme={customTheme}
          reasonOpen={props.reasonOpen.first}
          setReasonOpen={() => props.setReasonOpen('first')}
          bulletPrimaryText={'Personalized Meals'}
          bulletSecondaryText={
            'Unlike other "one size fits all" meal delivery services, we fine tune our meal serving sizes according to the precise nutritional needs of your clients.'
          }
          icon={'tune'}
        ></ReasonBullet>
        <ReasonBullet
          customTheme={customTheme}
          reasonOpen={props.reasonOpen.second}
          setReasonOpen={() => props.setReasonOpen('second')}
          bulletPrimaryText={'Thoughtful Labeling '}
          bulletSecondaryText={
            "We don't place nutrition labels on our meals, easing meal time stress, and use discreet packaging when shipping your clients their weekly Chera Box."
          }
          icon={'redeem'}
        ></ReasonBullet>
        <ReasonBullet
          customTheme={customTheme}
          reasonOpen={props.reasonOpen.third}
          setReasonOpen={() => props.setReasonOpen('third')}
          bulletPrimaryText={'Client Recovery Tracking'}
          bulletSecondaryText={
            "Our platform provides an easy-to-use dashboard to manage your client's meal plan, view your client's meals, and comprehensively monitor their nutritional intake using the 25+ nutrient daily values we track."
          }
          icon={'monitor_heart'}
        ></ReasonBullet>
        <ReasonBullet
          customTheme={customTheme}
          reasonOpen={props.reasonOpen.fourth}
          setReasonOpen={() => props.setReasonOpen('fourth')}
          bulletPrimaryText={'Trusted Nutrition Credentials'}
          bulletSecondaryText={
            'All our meals are all dietitian approved, and were served to hundreds of nutritional experts at FNCE 2022.'
          }
          icon={'verified'}
        ></ReasonBullet>
        <ReasonBullet
          customTheme={customTheme}
          reasonOpen={props.reasonOpen.fifth}
          setReasonOpen={() => props.setReasonOpen('fifth')}
          bulletPrimaryText={'Fully Prepared Meals'}
          bulletSecondaryText={
            'Our meals come fully prepared and are freezer friendly – maximizing convenience and removing barriers to meal compliance!'
          }
          icon={'dinner_dining'}
        ></ReasonBullet>
      </Grid>
    </Grid>
  );
};
export default ListOfReasons;
