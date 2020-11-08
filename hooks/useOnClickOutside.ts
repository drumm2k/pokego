import { RefObject, useEffect } from 'react';

// Listen for outside clicks
export function useOnClickOutside<T extends HTMLElement = HTMLDivElement>(
  ref: RefObject<T>,
  ref2: RefObject<T>,
  handler: (event: Event) => void
) {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      const el2 = ref2?.current;
      // Do nothing if clicking ref's element or descendent elements
      if (
        !el ||
        el.contains((event?.target as Node) || null) ||
        !el2 ||
        el2.contains((event?.target as Node) || null)
      ) {
        return;
      }
      handler(event);
    };
    document.addEventListener(`mousedown`, listener);
    document.addEventListener(`touchstart`, listener);
    return () => {
      document.removeEventListener(`mousedown`, listener);
      document.removeEventListener(`touchstart`, listener);
    };
    // Reload only if ref or handler changes
  }, [handler, ref, ref2]);
}
