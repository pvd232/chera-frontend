import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToFNCEApprovedRef = (ref, hash) => {
  const location = useLocation();
  useEffect(() => {
    if (location.hash === hash) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [ref, hash, location.hash]);
};
