import { useRef, useState } from 'react';

function useDebouncedState<T>(initialValue: T, delay: number): [T, (value: T) => void] {
  const [state, setState] = useState<T>(initialValue);
  const timeoutRef = useRef<number | null>(null);
  const setDebouncedState = (value: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setState(value);
    }, delay);
  };
  return [state, setDebouncedState];
}

export { useDebouncedState };
