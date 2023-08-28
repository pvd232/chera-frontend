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
    props.errorText
  </FormHelperText>
);
export default ErrorMessage;
