import { useState, useEffect } from 'react';
export const useSample = () => {
  const [sample, setSample] = useState(false);
  useEffect(() => {
    if (window.location.href.includes('sample=true')) {
      setSample(true);
    }
  }, []);
  return [sample, setSample];
};
