import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import "./css/Footer.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  const customTheme = useTheme();
  return (
    <Grid
      container
      item
      justifyContent={"center"}
      sx={{
        backgroundColor: "#8B0054",
      }}
      height="20vh"
      alignItems={"center"}
      fontSize={customTheme.pages.splash.fontSize.subheader}
    >
      <Grid container item lg={10}>
        <Grid container item lg={3} justifyContent={"center"}>
          <Grid item></Grid>
          <Grid
            container
            item
            flexDirection={"column"}
            alignItems={"left"}
            justifyContent={"space-around"}
            rowSpacing={"1vh"}
            color={"white"}
          >
            <Grid item>
              <Typography id="footerTextLeft" fontWeight="bold">
                Questions?
              </Typography>
            </Grid>
            <Grid item>
              <Link to="/FAQs">
                <Typography>FAQs</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Typography>contact@bendito.io</Typography>
            </Grid>
          </Grid>
        </Grid>
        {/*Column 2*/}
        <Grid container item lg={3} justifyContent={"center"}>
          <Grid item></Grid>
          <Grid container item justifyContent={"center"}>
            <Grid
              container
              flexDirection={"column"}
              alignItems={"left"}
              justifyContent={"space-around"}
              rowSpacing={"1vh"}
              color={"white"}
            >
              <Grid item>
                <Typography fontWeight={"bold"}>Get Started</Typography>
              </Grid>
              <Grid item>
                <Link to="/FAQs">
                  <Typography>FAQs</Typography>
                </Link>
              </Grid>
              <Grid item>
                <Typography>contact@bendito.io</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/*Column 3*/}
        <Grid container item lg={3} justifyContent={"center"}>
          <Grid item></Grid>
          <Grid
            container
            item
            flexDirection={"column"}
            alignItems={"left"}
            justifyContent={"space-around"}
            rowSpacing={"1vh"}
            color={"white"}
          >
            <Grid item>
              <Typography fontWeight={"bold"}>Get Started</Typography>
            </Grid>
            <Grid item>
              <Link to="/FAQs">
                <Typography>FAQs</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Typography>contact@bendito.io</Typography>
            </Grid>
          </Grid>
        </Grid>
        {/*Column 4*/}
        <Grid container item lg={3} justifyContent={"center"}>
          <Grid item>
            <Grid
              container
              item
              flexDirection={"column"}
              alignItems={"left"}
              rowSpacing={"1vh"}
              color={"white"}
              justifyContent={"space-around"}
            >
              <Grid
                item
                className="social-media-icons-white"
                justifyContent={"space-evenly"}
              >
                <Typography fontWeight={"bold"}>
                  Catch us on Social Media
                </Typography>
                <a href="https://www.facebook.com">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="https://www.instagram.com">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://www.twitter.com">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
