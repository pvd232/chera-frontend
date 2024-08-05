import { useEffect, useState } from 'react';
import { useWindowWidth } from './useWindowWidth';
import { useWindowHeight } from './useWindowHeight';

export const useWindowLandscape = (): boolean => {
  const windowWidth = useWindowWidth();
  const windowHeight = useWindowHeight();
  const [landscape, setLandscape] = useState(windowWidth > windowHeight);
  useEffect(() => {
    setLandscape(windowWidth > windowHeight);
  }, [windowWidth, windowHeight]);
  return landscape;
};
