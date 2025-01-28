// src/hooks/use-intersection-observer.ts
import { RefObject, useEffect, useState } from 'react';

interface UseIntersectionObserverProps {
  ref: RefObject<Element | null>;
  options?: IntersectionObserverInit;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver({
  ref,
  options = {},
  freezeOnceVisible = false
}: UseIntersectionObserverProps): boolean {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const element = ref?.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);

      if (entry.isIntersecting && freezeOnceVisible) {
        observer.unobserve(element);
      }
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options, freezeOnceVisible]);

  return isIntersecting;
}