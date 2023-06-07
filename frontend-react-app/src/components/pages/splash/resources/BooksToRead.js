import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import BookToRead from './BookToRead';
const BooksToRead = () => {
  const customTheme = useTheme();
  return (
    <Grid
      container
      lg={8}
      md={10}
      xs={10}
      columnGap={5}
      justifyContent="space-evenly"
    >
      <Grid lg={12} md={12} marginBottom="1vh">
        <Typography fontSize={customTheme.pages.resources.fontSize.header}>
          Books
        </Typography>
      </Grid>
      <BookToRead
        customTheme={customTheme}
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
        customTheme={customTheme}
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
        customTheme={customTheme}
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
};
export default BooksToRead;
