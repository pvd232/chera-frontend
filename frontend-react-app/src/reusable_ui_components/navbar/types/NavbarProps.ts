import { ReactElement } from 'react';
export interface NavbarProps {
  childComponent: React.FC;
  links: ReactElement;
  homeUrl: string;
}
