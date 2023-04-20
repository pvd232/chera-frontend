import Grid from '@mui/material/Grid';
import OrbContainer from './OrbContainer';
import './styles.css';

const BenditoIntroNew = (props) => (
  <Grid
    item
    container
    justifyContent={'center'}
    sx={{
      backgroundColor: props.customTheme.palette.white1.main,
      paddingTop: '10vh',
    }}
  >
    <OrbContainer />

    <div className="overlay">
      <div className="overlay__inner">
        <h1 className="overlay__title">
          Hey, would you like to learn how to create a
          <span className="text-gradient">generative</span> UI just like this?
        </h1>
        <p className="overlay__description">
          In this tutorial we will be creating a generative “orb” animation
          using pixi.js, picking some lovely random colors and pulling it all
          together in a nice frosty UI.
          <strong>We're gonna talk accessibility, too.</strong>
        </p>
        <div className="overlay__btns">
          <button className="overlay__btn overlay__btn--transparent">
            <a
              href="https://georgefrancis.dev/writing/create-a-generative-landing-page-and-webgl-powered-background/"
              target="_blank"
            >
              View Tutorial
            </a>
          </button>

          <button className="overlay__btn overlay__btn--colors">
            <span>Randomise Colors</span>
            <span className="overlay__btn-emoji">🎨</span>
          </button>
        </div>
      </div>
    </div>
  </Grid>
);
export default BenditoIntroNew;
