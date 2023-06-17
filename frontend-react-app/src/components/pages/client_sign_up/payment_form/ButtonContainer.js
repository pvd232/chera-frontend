import BlackButton from '../../../shared_components/BlackButton.ts';
import BlueCircularProgress from '../../../shared_components/BlueCircularProgress';
import { useState } from 'react';

const ButtonContainer = (props) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    await props.handleSubmit();
    setLoading(false);
  };
  return (
    <BlackButton
      id="submit-order-button"
      onClick={() => handleSubmit()}
      disabled={loading}
      variant="contained"
      sx={{
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingTop: '1vh',
        paddingBottom: '1vh',
        paddingLeft: '2vw',
        paddingRight: '2vw',
        marginTop: '2vh',
        marginBottom: '2vh',
      }}
    >
      {loading ? <BlueCircularProgress /> : 'Submit order'}
    </BlackButton>
  );
};
export default ButtonContainer;
