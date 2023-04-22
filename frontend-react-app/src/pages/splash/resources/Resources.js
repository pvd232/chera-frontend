import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import { useRef } from 'react';
import FAQs from '../faqs/FAQs';
import TableOfContents from './TableOfContents';
import SitesWeKeepBookmarked from './SitesWeKeepBookmarked';
import AppsToDownload from './AppsToDownload';
import BooksToRead from './BooksToRead';

const Resources = () => {
  const customTheme = useTheme();

  const bookmarkRef = useRef();
  const executeBookmarkRefScroll = () => bookmarkRef.current.scrollIntoView();
  const appsRef = useRef();
  const executeAppsRefScroll = () => appsRef.current.scrollIntoView();
  const bookRef = useRef();
  const executeBookRefScroll = () => bookRef.current.scrollIntoView();

  return (
    <Grid
      container
      justifyContent={'center'}
      paddingBottom={'5vh'}
      rowGap={10}
      backgroundColor={customTheme.palette.olive.quaternary}
      alignItems={'flex-start'}
    >
      <TableOfContents
        executeAppsRefScroll={executeAppsRefScroll}
        executeBookmarkRefScroll={executeBookmarkRefScroll}
        executeBookRefScroll={executeBookRefScroll}
      />
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
