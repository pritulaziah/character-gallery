import React, { ButtonHTMLAttributes } from "react";
import styled from "@emotion/styled/macro";

const StyledPaginationButton = styled("button")<{ active: boolean }>`
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border: none;
  outline: none;
  cursor: pointer;
  transition: color 0.3s, backgound-color 0.3s;
  background-color: inherit;
  padding: 6px;
  min-width: 36px;
  min-height: 36px;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: ${(props) => (props.active ? `#165DFF` : `#4E5969`)};
  background-color: ${(props) => (props.active ? `#E8F3FF` : `transparent`)};

  ${(props) =>
    !props.active &&
    `
      &:hover {
        background-color: #F2F3F5;
        color: #4E5969;
      }
    `};
`;

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active?: boolean;
}

const PaginationButton = ({ children, active, ...other }: IProps) => {
  return (
    <StyledPaginationButton {...other} active={!!active}>
      {children}
    </StyledPaginationButton>
  );
};

export default PaginationButton;
