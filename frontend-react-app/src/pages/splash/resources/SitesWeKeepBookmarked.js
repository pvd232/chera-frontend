import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import eatRightLogo from '../../../static/images/eat_right_bookmark.png';
import BookedmarkedSite from './BookmarkedSite';
import resources from './scss/Resources.module.scss';
const SitesWeKeepBookmarked = () => {
  const customTheme = useTheme();
  return (
    <>
      <Grid lg={8} md={8}>
        <Typography className={resources.resourcesHeader}>
          Trusted Experts
        </Typography>
      </Grid>
      <Grid
        container
        lg={8}
        md={8}
        columnGap={5}
        rowGap={5}
        justifyContent={customTheme.largerScreen() ? 'space-evenly' : 'center'}
      >
        <BookedmarkedSite
          customTheme={customTheme}
          imgHref={'https://www.nationaleatingdisorders.org/help-support'}
          imgSrc={
            'https://www.nationaleatingdisorders.org/sites/all/themes/neda3/images/logo_main.png'
          }
          resourceDescription={
            'The National Eating Disorders Association (NEDA) is the largest nonprofit organization dedicated to supporting individuals and families affected by eating disorders.'
          }
        />
        <BookedmarkedSite
          customTheme={customTheme}
          imgHref={'https://www.eatright.org/find-a-nutrition-expert'}
          imgSrc={eatRightLogo}
          resourceDescription={
            'The Academy of Nutrition and Dietetics offers information on nutrition and health, from meal planning and prep to choices that can help prevent or manage health conditions.'
          }
        />
        <BookedmarkedSite
          customTheme={customTheme}
          imgHref={'https://anad.org/'}
          imgSrc={
            'https://anad.org/wp-content/uploads/2020/10/ANAD-Logo-2020-Black-Larger-Flame.png'
          }
          resourceDescription={
            'ANAD is the leading nonprofit in the U.S. that provides free, peer support services to anyone struggling with an eating disorder, regardless of age, race, gender identity, sexual orientation, or background.'
          }
        />
      </Grid>
    </>
  );
};
export default SitesWeKeepBookmarked;
