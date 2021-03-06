import styled from "@emotion/styled/macro";
import LeftIcon from "components/Icons/Left";
import RightIcon from "components/Icons/Right";
import React from "react";
import { Dir } from "./Slider";

interface IProps {
  dir: Dir;
  onChangeSlide: (dir: Dir) => void;
}

export const StyledSliderArrow = styled("div")<{ dir: Dir }>`
  position: absolute;
  opacity: 0;
  padding: 0 15px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  transition: opacity 0.25s;
  z-index: 40;
  ${(props) => (props.dir === "prev" ? `left: 0` : `right: 0`)};
`;

const StyledSliderArrowIcon = styled("span")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SliderArrow = ({ dir, onChangeSlide }: IProps) => {
  const onClick = (event: React.MouseEvent<HTMLElement>) => onChangeSlide(dir);

  return (
    <StyledSliderArrow onClick={onClick} dir={dir}>
      <StyledSliderArrowIcon>
        {dir === "next" ? <RightIcon /> : <LeftIcon />}
      </StyledSliderArrowIcon>
    </StyledSliderArrow>
  );
};

export default SliderArrow;
