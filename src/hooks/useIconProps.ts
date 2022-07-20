import { SVGAttributes } from "react";

export interface UseIconProps extends SVGAttributes<HTMLOrSVGElement> {
  color?: string;
  size?: string;
}

const useIconProps = ({
  color = "currentColor",
  size = "24px",
  ...other
}: UseIconProps) => {
  return {
    ...other,
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    fill: color,
    xmlns: "http://www.w3.org/2000/svg"
  };
};

export default useIconProps;
