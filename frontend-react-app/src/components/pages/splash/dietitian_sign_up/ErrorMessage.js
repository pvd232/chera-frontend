import FormHelperText from '@mui/material/FormHelperText';

const ErrorMessage = (props) => (
  <FormHelperText
    hidden={!props.error}
    error={true}
    sx={{
      pb: 2,
      fontWeight: 'bold',
    }}
  >
    The email you entered is already taken.
  </FormHelperText>
);
export default ErrorMessage;
