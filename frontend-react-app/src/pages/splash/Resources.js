import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import { useRef } from 'react';
import FAQs from './faqs/FAQs';
import bannerImage from '../../static/images/woman_on_phone.png';
import tableOfContentsImage from '../../static/images/woman_browsing.jpg';
import eatRightLogo from '../../static/images/eat_right_bookmark.png';
import recoveryRecord from '../../static/images/recovery_record_2.png';
import riseUp from '../../static/images/rise_up_recovery.png';
import mindShift from '../../static/images/mindshift_cbt.png';
import '../../static/css/Resources.css';
const Resources = () => {
  const customTheme = useTheme();

  const bookmarkRef = useRef();
  const executeBookmarkRefScroll = () => bookmarkRef.current.scrollIntoView();
  const appsRef = useRef();
  const executeAppsRefScroll = () => appsRef.current.scrollIntoView();
  const bookRef = useRef();
  const executeBookRefScroll = () => bookRef.current.scrollIntoView();
  const BookedmarkedSite = (props) => (
    <Grid
      container
      lg={3.7}
      md={5.5}
      xs={10}
      rowGap={2}
      padding={2}
      justifyContent="center"
      sx={{
        backgroundColor: customTheme.palette.white1.main,
      }}
    >
      <Grid
        container
        lg={10}
        md={10}
        xs={12}
        justifyContent="center"
        alignItems="flex-end"
        // border={"2px black solid"}
        height={
          customTheme.extraLargeScreen()
            ? '20vh'
            : customTheme.largeScreen()
            ? '15vh'
            : '15vh'
        }
        margin={2}
      >
        <a href={props.imgHref} className="hoverLink">
          <img
            src={props.imgSrc}
            alt=""
            style={{
              height: 'auto',
              width: '90%',
              padding: 3,
              margin: '5%',
            }}
          ></img>
        </a>
      </Grid>

      <Grid lg={11} md={12} xs={12} margin={2}>
        <Typography>{props.resourceDescription}</Typography>
      </Grid>
    </Grid>
  );
  const SitesWeKeepBookmarked = () => (
    <>
      <Grid lg={8} md={8}>
        <Typography
          fontSize={customTheme.fontEqualizer(48)}
          marginBottom={'2vh'}
        >
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
          imgHref={'https://www.nationaleatingdisorders.org/help-support'}
          imgSrc={
            'https://www.nationaleatingdisorders.org/sites/all/themes/neda3/images/logo_main.png'
          }
          resourceDescription={
            'The National Eating Disorders Association (NEDA) is the largest nonprofit organization dedicated to supporting individuals and families affected by eating disorders.'
          }
        />
        <BookedmarkedSite
          imgHref={'https://www.eatright.org/find-a-nutrition-expert'}
          imgSrc={eatRightLogo}
          resourceDescription={
            'The Academy of Nutrition and Dietetics offers information on nutrition and health, from meal planning and prep to choices that can help prevent or manage health conditions.'
          }
        />
        <BookedmarkedSite
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
  const AppToDownload = (props) => (
    <Grid
      container
      lg={3.7}
      md={3.7}
      xs={10}
      justifyContent="center"
      paddingTop={0}
      alignItems="flex-start"
      height={
        customTheme.extraLargeScreen()
          ? '35vh'
          : customTheme.largeScreen()
          ? '30vh'
          : '30vh'
      }
    >
      <Grid
        container
        item
        lg={12}
        xs={12}
        justifyContent="center"
        alignItems="center"
        height={
          customTheme.extraLargeScreen()
            ? '35vh'
            : customTheme.largeScreen()
            ? '30vh'
            : '30vh'
        }
        padding={5}
        sx={{
          backgroundColor: customTheme.palette.white1.main,
        }}
      >
        <img
          className="hoverLink"
          src={props.imgSrc}
          alt=""
          style={{
            height: customTheme.extraExtraSmallScreen()
              ? '17vh'
              : customTheme.smallerScreen()
              ? '17vh'
              : '20vh',
            margin: '5% 5% 5% 5%',
            marginRight: 'auto',
            marginLeft: 'auto',
            objectFit: 'cover',
          }}
          onClick={() => window.location.assign(props.imgHref)}
        ></img>

        <Grid
          container
          position={'relative'}
          xl={12}
          lg={12}
          md={12}
          xs={12}
          padding={3}
          justifyContent={'center'}
          alignItems="flex-start"
          left={'50%'}
          top={'5%'}
          sx={{
            backgroundColor: customTheme.palette.olive.main,
            transform: 'translate(-50%,0%)',
          }}
          rowGap={2}
        >
          <Typography
            fontSize={customTheme.fontEqualizer(16)}
            fontWeight={'bold'}
            sx={{
              letterSpacing: '1.5px',
              textDecoration: 'none',
            }}
            textAlign={customTheme.smallerScreen() ? 'center' : ''}
          >
            {props.resourceTitle}
          </Typography>
          <Typography fontSize={customTheme.fontEqualizer(12)}>
            {props.resourceDescription}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
  const AppsToDownload = () => (
    <>
      <Grid lg={8} md={10} marginBottom={'2vh'}>
        <Typography fontSize={customTheme.fontEqualizer(48)}>Apps</Typography>
      </Grid>
      <Grid
        container
        lg={8}
        md={10}
        rowGap={20}
        justifyContent={customTheme.largerScreen() ? 'space-between' : 'center'}
      >
        <AppToDownload
          imgHref={'https://www.recoveryrecord.com/'}
          imgSrc={recoveryRecord}
          resourceTitle={'RECOVERY RECORD'}
          resourceDescription={
            'RecoveryRecord is a smart companion for managing your recovery with your dietitian.'
          }
        />
        <AppToDownload
          imgHref={'https://www.riseuprecovery.org/'}
          imgSrc={riseUp}
          resourceTitle={'RISE UP RECOVERY'}
          resourceDescription={
            'Rise Up Recovery uses cognitive behavioral therapy to jumpstart recovery.'
          }
        />
        <AppToDownload
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

  const BookToRead = (props) => (
    <Grid
      container
      lg={3.7}
      md={3.7}
      rowGap={1}
      padding={2}
      justifyContent="center"
    >
      <Grid
        container
        lg={10}
        md={10}
        justifyContent="center"
        alignItems="flex-end"
        // border={"2px black solid"}
        height={'auto'}
        margin={0}
      >
        <img
          className="hoverLink"
          src={props.imgSrc}
          alt=""
          style={{
            height: '30vh',
            padding: 3,
            margin: '5%',
          }}
          onClick={() => window.location.assign(props.imgHref)}
        ></img>
      </Grid>
      <Grid lg={11} md={11} xs={12} textAlign="center">
        <Typography fontWeight={'bold'}>{props.bookTitle}</Typography>
      </Grid>
      <Grid
        lg={11}
        md={11}
        marginTop={1}
        padding={2}
        sx={{
          backgroundColor: customTheme.palette.olive.main,
        }}
      >
        <Typography fontSize={customTheme.fontEqualizer(14)}>
          {props.resourceDescription}
        </Typography>
      </Grid>
    </Grid>
  );
  const BooksToRead = () => (
    <Grid
      container
      lg={8}
      md={10}
      xs={10}
      // border={"2px black solid"}
      columnGap={5}
      justifyContent="space-evenly"
      sx={{
        backgroundColor: customTheme.palette.olive.quaternary,
      }}
    >
      <Grid lg={12} md={12} marginBottom="1vh">
        <Typography fontSize={customTheme.fontEqualizer(48)}>Books</Typography>
      </Grid>
      <BookToRead
        imgHref={
          'https://www.amazon.com/Anti-Diet-Reclaim-Well-Being-Happiness-Intuitive/dp/1529381177/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=1671546751&sr=8-1'
        }
        imgSrc={
          'https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41W+D2mJ6QL._SY344_BO1,204,203,200_.jpg'
        }
        resourceDescription={
          'Reclaim Your Time, Money, Well-Being, and Happiness through Intuitive Eating'
        }
        bookTitle={'Anti-Diet'}
      />
      <BookToRead
        truncate={true}
        imgHref={
          'https://www.amazon.com/Body-Kindness-Transform-Health-Out/dp/0761187294/ref=sr_1_1?crid=UFM97F9XGVT5&keywords=body+kindness&qid=1671546863&qu=eyJxc2MiOiIxLjY4IiwicXNhIjoiMS4zMCIsInFzcCI6IjEuNDQifQ%3D%3D&sprefix=body+kindness%2Caps%2C105&sr=8-1'
        }
        imgSrc={
          'https://m.media-amazon.com/images/I/51zOlAhdXTL._AC_SY780_.jpg'
        }
        bookTitle={'Body Kindness'}
        resourceDescription={
          'Transform your health from inside out – and never say diet again.'
        }
      />
      <BookToRead
        imgHref={
          'https://www.amazon.com/Intuitive-Eating-4th-Anti-Diet-Revolutionary/dp/1250255198/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=1671547326&sr=8-1'
        }
        imgSrc={
          'https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/51EXrXhh7BL._SX329_BO1,204,203,200_.jpg'
        }
        bookTitle={'Intuitive Eating'}
        resourceDescription={
          'Make peace with food. Free yourself from chronic dieting forever.'
        }
      />
    </Grid>
  );
  const ResourceCategory = (props) => (
    <Grid
      container
      lg={9}
      md={10}
      xs={11}
      sx={{ backgroundColor: customTheme.palette.oliveCompliment.tertiary }}
      alignItems={'center'}
      paddingBottom="1vh"
      paddingTop="1vh"
      paddingLeft={customTheme.smallerScreen() ? '5vw' : '2vw'}
      justifyContent={
        customTheme.largerScreen() ? 'space-evenly' : 'flex-start'
      }
      onClick={props.executeScroll}
      columnGap={customTheme.smallerScreen() ? '3vw' : ''}
      className="hoverLink"
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
      <Grid lg={9}>
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
  const TableOfContents = () => (
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
                  top: '30%',
                  transform: 'translateY(-30%)',
                  left: '2%',
                  width: 'max-content',
                  height: 'max-content',
                  backgroundColor: customTheme.palette.olive.quaternary,
                  paddingTop: '3vh',
                  paddingBottom: '3vh',
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
              fontSize: customTheme.fontEqualizer(48),
              textAlign: 'center',
            }}
          >
            Resources For Your Nutrition Journey
          </Typography>
          {
            <Typography
              sx={{
                fontSize: customTheme.fontEqualizer(20),
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
            item
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
              executeScroll={executeBookmarkRefScroll}
            />
            <ResourceCategory
              text={'Apps to Download'}
              icon={'get_app'}
              executeScroll={executeAppsRefScroll}
            />
            <ResourceCategory
              text={'Our Favorite Reads'}
              icon={'local_library'}
              executeScroll={executeBookRefScroll}
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
  return (
    <Grid
      container
      justifyContent={'center'}
      paddingBottom={'5vh'}
      rowGap={10}
      backgroundColor={customTheme.palette.olive.quaternary}
      alignItems={'flex-start'}
    >
      <TableOfContents />
      <Grid container ref={bookmarkRef} justifyContent="center">
        <SitesWeKeepBookmarked></SitesWeKeepBookmarked>
      </Grid>
      <Grid container lg={12} ref={appsRef} justifyContent="center">
        <AppsToDownload></AppsToDownload>
      </Grid>
      <Grid container ref={bookRef} justifyContent="center" marginTop={'20vh'}>
        <BooksToRead></BooksToRead>
      </Grid>
      <Grid container>
        <FAQs></FAQs>
      </Grid>
    </Grid>
  );
};
export default Resources;
