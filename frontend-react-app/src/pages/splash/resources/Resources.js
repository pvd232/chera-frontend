import Grid from '@mui/material/Unstable_Grid2';
import { useRef } from 'react';
import TableOfContents from './TableOfContents';
import SitesWeKeepBookmarked from './SitesWeKeepBookmarked';
import AppsToDownload from './AppsToDownload';
import BooksToRead from './BooksToRead';
import Banner from './Banner';
import resources from './scss/Resources.module.scss';

const Resources = () => {
  const bookmarkRef = useRef();
  const executeBookmarkRefScroll = () => bookmarkRef.current.scrollIntoView();
  const appsRef = useRef();
  const executeAppsRefScroll = () => appsRef.current.scrollIntoView();
  const bookRef = useRef();
  const executeBookRefScroll = () => bookRef.current.scrollIntoView();
  return (
    <Grid container className={resources.resourcesPageContainer}>
      <Banner />

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
    </Grid>
  );
};
export default Resources;
