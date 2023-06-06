import { ReactElement, ReactNode } from 'react';
export interface NavbarProps {
  childComponent: ReactNode;
  links: ReactElement;
  homeUrl: string;
}
