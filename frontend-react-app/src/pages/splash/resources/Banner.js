import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import bannerImage from '../../../static/images/woman_on_phone.png';
import tableOfContentsImage from '../../../static/images/woman_browsing.jpg';
import ResourceCategory from './ResourceCategory';
import tableOfContents from './scss/TableOfContents.module.scss';
import resources from './scss/Resources.module.scss';

const Banner = () => (
  <Grid container xs={12} className={tableOfContents.bannerContainer}>
    <img
      src={bannerImage}
      alt="woman on phone"
      className={tableOfContents.bannerImage}
    ></img>
    <Grid className={tableOfContents.bannerTextItem}>
      <Typography className={tableOfContents.bannerHeader}>
        Resources For ED Recovery
      </Typography>
    </Grid>
  </Grid>
);
export default Banner;
