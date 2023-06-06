import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import tableOfContentsImage from '../../../../static/images/woman_browsing.jpg';
import ResourceCategory from './ResourceCategory';
import styles from './scss/TableOfContents.module.scss';

const TableOfContents = (props) => (
  <Grid container className={styles.pageContainer}>
    <Grid container lg={4.5} md={6} xs={12} className={styles.pageContainer}>
      <Grid container className={styles.categoriesContainer}>
        <Grid container className={styles.header}>
          <Typography className={styles.text}>Browse by category</Typography>
        </Grid>
        <Grid
          container
          lg={12}
          xs={10}
          className={styles.resourceCategoriesContainer}
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

    <Grid
      container
      lg={4}
      md={6}
      xs={10}
      className={styles.tableOfContentsImgContainer}
    >
      <img
        src={tableOfContentsImage}
        alt="woman browsing on computer"
        className={styles.img}
      />
    </Grid>
  </Grid>
);

export default TableOfContents;
