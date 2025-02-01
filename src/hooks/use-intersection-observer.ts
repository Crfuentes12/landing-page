// hooks/use-intersection-observer.ts
import { useEffect, useState, RefObject } from 'react';

interface UseIntersectionObserverProps {
  ref: RefObject<HTMLElement | null>;
  options?: IntersectionObserverInit;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver({
  ref,
  options = {},
  freezeOnceVisible = true
}: UseIntersectionObserverProps): boolean {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const element = ref?.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      const isElementVisible = entry.isIntersecting;
      
      setIsVisible(prev => {
        if (freezeOnceVisible && prev) return true;
        return isElementVisible;
      });
    }, options);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, options, freezeOnceVisible]);

  return isVisible;
}