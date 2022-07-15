import { useEffect, useState } from "react";
import "intersection-observer";

export interface IntersectionOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Document | Element | null;
  defaultInView?: boolean;
}

const useIntersection = (
  ref: React.RefObject<HTMLElement>,
  {
    threshold = 0,
    rootMargin,
    root,
    defaultInView = false,
  }: IntersectionOptions = {}
) => {
  const [inView, setInView] = useState(defaultInView);

  useEffect(() => {
    if (!inView && ref?.current) {
      let didCancel = false;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!didCancel) {
            if (entry.intersectionRatio > 0 || entry.isIntersecting) {
              setInView(true);
              observer.disconnect();
            }
          }
        },
        { threshold, root, rootMargin }
      );

      observer.observe(ref.current);

      return () => {
        didCancel = true;

        observer.disconnect();
      };
    }

    return undefined;
  }, [ref, inView]);

  return inView;
};

export default useIntersection;
