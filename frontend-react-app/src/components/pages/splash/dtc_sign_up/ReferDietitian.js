import {
  Button,
  FormControl,
  Grid,
  Typography,
} from '@mui/material';
import styles from './scss/ReferDietitian.module.scss';
import CustomTextField from '../../../shared_components/CustomTextField';
import { useState } from 'react';

export const ReferDietitian = () => {
  const [dietitianEmail, setDietitianEmail] = useState('');
  const handleInput = (event) => {
    const value = event.currentTarget.value;
    setDietitianEmail(value);
  };
  const validate = (form) => {
    return form.checkValidity();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    if (validate(form)) {
      //   trigger the api call and set dietitian email in local storage
    } else {
      return false;
    }
  };
  return (
    <Grid container item className={styles.pageContainer}>
      <Grid container item xs={10} className={styles.contentContainer}>
        <Grid item>
          <Typography className={styles.header}>Link your dietitian</Typography>
        </Grid>
        <Grid container item lg={3} className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <Grid container item className={styles.inputs}>
              <Grid item>
                <FormControl variant="filled" fullWidth>
                  <CustomTextField
                    required
                    fullWidth
                    label="Your Dietitian's Email"
                    id="dietitianEmail"
                    onChange={handleInput}
                    value={dietitianEmail}
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  type="submit"
                  className={styles.button}
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};
