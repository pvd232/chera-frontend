import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import tableOfContentsImage from '../../../static/images/woman_browsing.jpg';
import ResourceCategory from './ResourceCategory';
import tableOfContents from './scss/TableOfContents.module.scss';

const TableOfContents = (props) => {
  const customTheme = useTheme();
  return (
    <Grid container justifyContent={'center'}>
      <Grid container lg={4.5} md={6} xs={12} justifyContent="center">
        <Grid container className={tableOfContents.categoriesContainer}>
          <Grid container className={tableOfContents.header}>
            <Typography className={tableOfContents.text}>
              BROWSE BY CATEGORY
            </Typography>
          </Grid>
          <Grid
            container
            lg={12}
            md={12}
            xs={10}
            rowGap={3}
            justifyContent={customTheme.smallerScreen() ? 'center' : ''}
          >
            <ResourceCategory
              text={'Sites We Keep Bookmarked'}
              icon={'tab_icon'}
              executeScroll={props.executeBookmarkRefScroll}
            />
            <ResourceCategory
              text={'Apps to Download'}
              icon={'get_app'}
              executeScroll={props.executeAppsRefScroll}
            />
            <ResourceCategory
              text={'Our Favorite Reads'}
              icon={'local_library'}
              executeScroll={props.executeBookRefScroll}
            />
          </Grid>
        </Grid>
      </Grid>

      {customTheme.largerScreen() ? (
        <Grid
          container
          lg={4}
          md={6}
          xs={10}
          position={'relative'}
          right={'6%'}
        >
          <img
            src={tableOfContentsImage}
            alt="woman browsing on computer"
            style={{ objectFit: 'cover', width: '100%' }}
          ></img>
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  );
};
export default TableOfContents;
