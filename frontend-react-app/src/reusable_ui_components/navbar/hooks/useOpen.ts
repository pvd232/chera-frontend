import { useEffect, useRef, useState } from 'react';

export const useOpen = (
  anchorRef: React.RefObject<HTMLElement>
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [open, setOpen] = useState(false);
  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false && anchorRef.current) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open, anchorRef]);
  return [open, setOpen];
};
