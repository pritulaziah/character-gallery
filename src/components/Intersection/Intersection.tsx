import React, { ElementType, HTMLAttributes, useRef } from 'react';
import useIntersection, { IntersectionOptions } from 'hooks/useIntersection';

interface IProps extends HTMLAttributes<HTMLElement>{
  children: React.ReactNode
  options?: IntersectionOptions
  as?: ElementType
}

const Intersection = ({
  as: Component = 'div',
  children,
  options,
  ...restProps
}: IProps) => {
  const intersectionRef = useRef(null);
  const inView = useIntersection(intersectionRef, options);

  return (
    <Component ref={intersectionRef} {...restProps}>
      {inView
        ? children
        : null}
    </Component>
  );
};

export default Intersection;
