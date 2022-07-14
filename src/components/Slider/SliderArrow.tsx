import styled from '@emotion/styled/macro'
import React from "react";
import { Dir } from './Slider'

interface IProps {
  dir: Dir;
  onChangeSlide: (dir: Dir) => void;
}

const icons = {
  prev: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
    </svg>
  ),
  next: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
    </svg>
  ),
};

export const Arrow = styled("div")<{ dir: Dir }>`
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

const ArrowIcon = styled("span")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  font-size: 22px;
  fill: #fff;
`;

const SliderArrow = ({ dir, onChangeSlide }: IProps) => {
  const onClick = (event: React.MouseEvent<HTMLElement>) => onChangeSlide(dir);

  return (
    <Arrow onClick={onClick} dir={dir}>
      <ArrowIcon>{icons[dir]}</ArrowIcon>
    </Arrow>
  );
};

export default SliderArrow;
