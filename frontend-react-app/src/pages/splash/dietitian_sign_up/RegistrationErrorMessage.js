import FormHelperText from '@mui/material/FormHelperText';

const RegistrationErrorMessage = (props) => (
  <FormHelperText
    hidden={!props.error}
    error={true}
    sx={{
      pb: 2,
      fontWeight: 'bold',
    }}
  >
    The dietetic registration number you entered is invalid. Please double check
    your dietetic registration number, or email us at contact@cherahealth.com
    for assistance.
  </FormHelperText>
);
export default RegistrationErrorMessage;
