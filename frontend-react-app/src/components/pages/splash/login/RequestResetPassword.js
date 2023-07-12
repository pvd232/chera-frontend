import { useState } from "react";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControl from '@mui/material/FormControl';
import CustomTextField from "../../../shared_components/CustomTextField";
import CircularProgress from "@mui/material/CircularProgress";
import BlackButton from "../../../shared_components/BlackButton.ts";
import APIClient from "../../../../helpers/APIClient.js";
import styles from "./scss/Login.module.scss";

const RequestResetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetpasswordError, setResetPasswordError] = useState(false);
  const [showText, setShowText] = useState(false);

  const validate = (form) => {
    return form.checkValidity();
  };
  // input handlers
  const handleButtonClick = () => {
    if (!loading) {
      setLoading(true);
      if (props.domain === "dietitian") {
        APIClient.requestResetDietitianPassword(email).then((value) => {
          setLoading(false);
          if (value) {
            setShowText(true);
          } else {
            setResetPasswordError(true);
          }
        });
      } else {
        APIClient.requestResetClientPassword(email).then((value) => {
          setLoading(false);

          if (value) {
            setShowText(true);
          } else {
            setResetPasswordError(true);
          }
        });
      }
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    // check that all required values have been populated before triggering button click
    if (validate(form)) {
      handleButtonClick();
    }
  };
  return (
    <Grid container className={styles.loginPageContainer}>
      <Grid item lg={4} md={6} xs={10}>
        <CardContent>
          <Typography className={styles.header}>Reset your password</Typography>
          <form onSubmit={handleSubmit} autoComplete="new-password">
            <FormGroup>
                <Stack className={styles.stack}>
                  <FormControl variant="filled">
                    <FormHelperText
                      hidden={!resetpasswordError}
                      error={true}
                      className={styles.formError}
                    >
                      Your email is incorrect
                    </FormHelperText>
                    <CustomTextField
                      required
                      fullWidth
                      label={"Email"}
                      id="id"
                      sx={{
                        marginTop: "2vh"         
                      }}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      value={email}
                      className={styles.formRow}
                    />
                  </FormControl>
                  <BlackButton
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      fontSize: ".75rem",
                      paddingBottom: "1vh",
                      marginBottom: "5vh",
                    }}
                    className={styles.submitButton}
                  >
                    {loading ? (
                      <CircularProgress size={24} />
                    ) : (
                      "Send Password Reset Email"
                    )}
                  </BlackButton>

                  <Typography
                    sx={{
                      opacity: showText ? 1 : 0,
                      marginBottom: "5vh",
                    }}
                  >
                    A link to reset your password has been sent to your email.
                  </Typography>
                </Stack>
            </FormGroup>
          </form>
        </CardContent>
      </Grid>
    </Grid>
  );
};
export default RequestResetPassword;
