import React, { ReactElement, SVGAttributes } from "react";

export interface IconWrapperProps extends SVGAttributes<HTMLOrSVGElement> {
  color?: string;
  size?: string;
}

const IconWrapper = ({
  color = "currentColor",
  size = "24px",
  children,
  ...other
}: IconWrapperProps & { children: ReactElement }) =>
  React.cloneElement(children, {
    ...other,
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    fill: color,
  });

export default IconWrapper;
