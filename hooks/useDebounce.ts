import { useCallback, useRef } from 'react';

interface DebounceHook {
  <A extends any[]>(callback: (...args: A) => void, delay: number): (
    ...args: A
  ) => void;
}

const useDebounce: DebounceHook = (callback, delay) => {
  const timeout = useRef<any>();

  const handleChange: ReturnType<DebounceHook> = useCallback(
    (...args) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => {
        callback(...(args as any));
      }, delay);
    },
    [callback]
  );

  return handleChange;
};

export default useDebounce;
