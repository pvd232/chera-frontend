import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import bannerImage from '../../../../static/images/woman_on_phone.png';
import ScreenSize from '../../../../types/enums/ScreenSize';
import { useWindowWidth } from '../../../hooks/useWindowWidth';
import banner from './scss/Banner.module.scss';

// import ScreenSize
const Banner = () => {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < ScreenSize.xs;
  return (
    <Grid container item className={banner.bannerPageContainer}>
      <img src={bannerImage} alt="woman on phone" className={banner.img}></img>
      <Grid className={banner.textItem}>
        {!isMobile ? (
          <Typography className={banner.header}>
            Resources For ED Recovery
          </Typography>
        ) : (
          <>
            <Typography className={banner.header}>Resources For</Typography>
            <Typography className={banner.header}>ED Recovery</Typography>
          </>
        )}
      </Grid>
    </Grid>
  );
};
export default Banner;
