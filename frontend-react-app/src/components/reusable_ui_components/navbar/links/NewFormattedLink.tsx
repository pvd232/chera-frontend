import { Link as RRLink } from 'react-router-dom';
import { FormattedLinkProps } from '../types/FormattedLinkProps';
const NewFormattedLink = (props: FormattedLinkProps): JSX.Element => (
  <RRLink
    id={props.id}
    to={props.url}
    style={{
      textDecoration: 'none',
      color: 'black',
    }}
  >
    {props.text}
  </RRLink>
);
export default NewFormattedLink;
