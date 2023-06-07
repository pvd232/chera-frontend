import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import styles from './scss/ResourceCategory.module.scss';
const ResourceCategory = (props) => {
  const customTheme = useTheme();
  return (
    <Grid
      container
      lg={9}
      md={10}
      xs={11}
      className={styles.resourceCategoryContainer}
      onClick={props.executeScroll}
    >
      <Grid>
        <Icon
          sx={{
            fontSize: '2.5rem',
          }}
        >
          {props.icon}
        </Icon>
      </Grid>
      <Grid>
        <Typography
          sx={{
            fontSize: customTheme.fontEqualizer(20),
            textAlign: 'center',
          }}
          color={customTheme.palette.black.main}
        >
          {props.text}
        </Typography>
      </Grid>
    </Grid>
  );
};
export default ResourceCategory;
