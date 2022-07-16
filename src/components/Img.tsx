import { useState, useRef, ImgHTMLAttributes } from "react";
import useIntersection from "../hooks/useIntersection";

interface IProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  lazy?: boolean;
  altSrc?: string;
  loadImage?: (image: HTMLImageElement) => void;
  errorImage?: (image: HTMLImageElement) => void;
  offset?: number;
}

const Img = ({
  src,
  alt = "",
  lazy = true,
  altSrc,
  loadImage,
  errorImage,
  offset,
  ...restProps
}: IProps) => {
  const [hasError, setHasError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const inView = useIntersection(imageRef, {
    defaultInView: !lazy,
  });

  const onLoad = () => {
    loadImage && imageRef.current && loadImage(imageRef.current);
  };

  const onError = () => {
    altSrc && setHasError(true);
    errorImage && imageRef.current && errorImage(imageRef.current);
  };

  const isAlt = hasError && altSrc;

  return (
    <img
      {...restProps}
      style={{
        ...restProps.style,
        visibility: isAlt || inView ? "visible" : "hidden",
      }}
      ref={imageRef}
      src={isAlt ? altSrc : inView ? src : undefined}
      alt={alt}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default Img;
