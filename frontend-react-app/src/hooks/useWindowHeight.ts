import { useLayoutEffect, useState } from 'react';

export const useWindowHeight = (): number => {
  const [height, setHeight] = useState(window.innerHeight);
  useLayoutEffect(() => {
    function updateHeight() {
      setHeight(window.innerHeight);
    }
    window.addEventListener('resize', updateHeight);
    updateHeight();
    return () => window.removeEventListener('resize', updateHeight);
  }, []);
  return height;
};
