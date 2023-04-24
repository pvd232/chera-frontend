import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import bannerImage from '../../../static/images/woman_on_phone.png';
import tableOfContentsImage from '../../../static/images/woman_browsing.jpg';
import ResourceCategory from './ResourceCategory';
const TableOfContents = (props) => {
  const customTheme = useTheme();
  return (
    <Grid container justifyContent={'center'}>
      <Grid
        container
        xs={12}
        marginBottom={customTheme.largerScreen() ? '10vh' : '2vh'}
      >
        <img
          src={bannerImage}
          alt="woman on phone"
          style={{
            height: 'auto',
            maxHeight: '50vh',
            width: '100%',
            objectFit: 'cover',
          }}
        ></img>
        <Grid
          sx={
            customTheme.largerScreen()
              ? {
                  position: 'absolute',
                  top: '36%',
                  transform: 'translateY(-30%)',
                  left: '2%',
                  width: 'max-content',
                  height: 'max-content',
                  backgroundColor: customTheme.palette.olive.quaternary,
                  paddingTop: '2vh',
                  paddingBottom: '2vh',
                  paddingRight: '3vw',
                  paddingLeft: '3vw',
                }
              : {
                  width: 'max-content',
                  height: 'max-content',
                  backgroundColor: customTheme.palette.olive.quaternary,
                  paddingTop: '3vh',
                  paddingBottom: '3vh',
                  paddingRight: '3vw',
                  paddingLeft: '3vw',
                }
          }
        >
          <Typography
            sx={{
              fontSize: customTheme.pages.resources.fontSize.header,
              textAlign: 'center',
            }}
          >
            Resources For Your Nutrition Journey
          </Typography>
          {
            <Typography
              sx={{
                fontSize: customTheme.pages.resources.fontSize.subHeader,
                textAlign: 'center',
                marginTop: customTheme.smallerScreen() ? '2vh' : '',
              }}
              color={customTheme.palette.black.main}
            >
              Find the support you need
            </Typography>
          }
        </Grid>
      </Grid>
      <Grid container lg={4.5} md={6} xs={12} justifyContent="center">
        {/* controls size of table of content rows */}
        <Grid
          container
          position={customTheme.largerScreen() ? 'relative' : ''}
          left={customTheme.largerScreen() ? '35%' : ''}
          bottom={customTheme.largerScreen() ? '5%' : ''}
          xs={12}
          zIndex={1}
          justifyContent={customTheme.smallerScreen() ? 'center' : ''}
        >
          <Grid
            container
            lg={10}
            paddingRight={'1vw'}
            paddingLeft={'1vw'}
            alignSelf="flex-end"
            marginBottom={'2vh'}
            justifyContent={customTheme.smallerScreen() ? 'center' : ''}
          >
            <Typography
              fontSize={customTheme.fontEqualizer(20)}
              color={customTheme.palette.black.main}
              textAlign={customTheme.smallerScreen() ? 'center' : ''}
            >
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
