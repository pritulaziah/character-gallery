import { useState, useEffect, useRef, ImgHTMLAttributes } from "react";

interface IProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  lazy: boolean;
  altSrc?: string;
  loadImage: (image: HTMLImageElement) => void;
  errorImage: (image: HTMLImageElement) => void;
  offset?: number;
}

const Img = ({
  src,
  alt = "",
  lazy,
  altSrc,
  loadImage,
  errorImage,
  offset,
  ...restProps
}: IProps) => {
  const [visible, setVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!lazy) {
      // Ругается и падает, если возращать что-то отличное от undefined or nothing.
      return undefined;
    }

    let observer: IntersectionObserver;
    let didCancel = false;
    const { current } = imageRef;

    if (current && !visible) {
      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(
          ([img]) => {
            if (
              !didCancel &&
              (img.intersectionRatio > 0 || img.isIntersecting)
            ) {
              setVisible(true);
              observer.unobserve(current);
            }
          },
          { rootMargin: `${offset || window.innerHeight}px 0px 0px 0px` }
        );
        observer.observe(current);
      } else {
        // Old browsers fallback: https://caniuse.com/#search=IntersectionObserver
        setVisible(true);
      }
    }

    return () => {
      didCancel = true;
      // on component cleanup, we remove the listner
      if (observer?.unobserve && current) {
        observer.unobserve(current);
      }
    };
  }, [lazy, visible, offset]);

  const onLoad = () => {
    loadImage && imageRef.current && loadImage(imageRef.current);
  };

  const onError = () => {
    altSrc && setHasError(true);
    errorImage && imageRef.current && errorImage(imageRef.current);
  };

  const isShow = visible || !lazy;
  const isAlt = hasError && altSrc;

  return (
    <img
      {...restProps}
      style={{
        ...restProps.style,
        visibility: isAlt || isShow ? "visible" : "hidden",
      }}
      ref={imageRef}
      src={isAlt ? altSrc : isShow ? src : undefined}
      alt={alt}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default Img;
