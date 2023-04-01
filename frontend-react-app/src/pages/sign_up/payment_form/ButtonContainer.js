import BlackButton from '../../../reusable_ui_components/BlackButton';
import BlueCircularProgress from '../../../reusable_ui_components/BlueCircularProgress';
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
