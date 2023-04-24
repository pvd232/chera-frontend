import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import recoveryRecord from '../../../static/images/recovery_record_2.png';
import riseUp from '../../../static/images/rise_up_recovery.png';
import mindShift from '../../../static/images/mindshift_cbt.png';
import AppToDownload from './AppToDownload';
const AppsToDownload = () => {
  const customTheme = useTheme();
  return (
    <>
      <Grid lg={8} md={10} marginBottom={'2vh'}>
        <Typography fontSize={customTheme.pages.resources.fontSize.header}>
          Apps
        </Typography>
      </Grid>
      <Grid
        container
        lg={8}
        md={10}
        rowGap={20}
        justifyContent={customTheme.largerScreen() ? 'space-between' : 'center'}
      >
        <AppToDownload
          customTheme={customTheme}
          imgHref={'https://www.recoveryrecord.com/'}
          imgSrc={recoveryRecord}
          resourceTitle={'RECOVERY RECORD'}
          resourceDescription={
            'RecoveryRecord is a smart companion for managing your recovery with your dietitian.'
          }
        />
        <AppToDownload
          customTheme={customTheme}
          imgHref={'https://www.riseuprecovery.org/'}
          imgSrc={riseUp}
          resourceTitle={'RISE UP RECOVERY'}
          resourceDescription={
            'Rise Up Recovery uses cognitive behavioral therapy to jumpstart recovery.'
          }
        />
        <AppToDownload
          customTheme={customTheme}
          imgHref={'https://www.anxietycanada.com/resources/mindshift-cbt/'}
          imgSrc={mindShift}
          resourceTitle={'MINDSHIFT CBT'}
          resourceDescription={
            'MindShift helps manage anxiety using self-homework to give you back control.'
          }
        />
      </Grid>
    </>
  );
};
export default AppsToDownload;
