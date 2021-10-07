import React, { useEffect, MutableRefObject } from 'react';

interface ClickCallback {
  (e: Event): any;
}

interface ClickOutsideHook {
  (ref: MutableRefObject<HTMLElement>, callback: ClickCallback): void;
}

const useClickOutside: ClickOutsideHook = (ref, callback) => {
  useEffect(() => {
    const listener: EventListener = (e) => {
      if (!ref || ref.current.contains(e.target as Node)) {
        return;
      }

      callback(e);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback]);
};

export default useClickOutside;
