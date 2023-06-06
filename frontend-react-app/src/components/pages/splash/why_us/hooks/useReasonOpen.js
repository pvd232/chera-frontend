import { useReducer } from 'react';
export const useReasonOpen = () => {
  const [reasonOpen, setReasonOpen] = useReducer(
    (state, name) => {
      const newState = { ...state };
      const newStateValue = !state[name];
      newState[name] = newStateValue;
      return { ...state, ...newState };
    },
    {
      first: false,
      second: false,
      third: false,
      fourth: false,
      fifth: false,
    }
  );
  const handleSetReasonOpen = (reasonNumber) => {
    setReasonOpen(reasonNumber);
  };
  return [reasonOpen, handleSetReasonOpen];
};
