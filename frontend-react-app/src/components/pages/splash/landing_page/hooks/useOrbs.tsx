import { useState, useEffect } from 'react';
import Orb from '../Orb';
import { randomColor } from '../helpers/randomColor';
export default function useOrbs() {
  const [orbs, setOrbs] = useState<React.ReactElement[]>([]);
  useEffect(() => {
    const orbArray: JSX.Element[] = [];
    for (let i = 0; i < 10; i++) {
      orbArray.push(<Orb key={i} fill={randomColor()} />);
    }
    setOrbs(orbArray);
  }, []);
  return orbs;
}
