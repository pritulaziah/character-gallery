import React, { ButtonHTMLAttributes } from "react";
import styled from "@emotion/styled/macro";

const PaginationButtonStyled = styled("button")<{ active: boolean }>`
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border: none;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
  background-color: inherit;
  padding: 12px 16px;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => (props.active ? `#333333` : `#268CC7`)};

  &:focus {
    outline: none;
  }

  ${(props) =>
    !props.active &&
    `
      &:hover {
        color: #F15044;
      }
    `};

  &:active {
    color: #333333;
  }
`;

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active: boolean;
}

const PaginationButton = ({ children, active, ...other }: IProps) => {
  return (
    <li>
      <PaginationButtonStyled {...other} active={active}>
        {children}
      </PaginationButtonStyled>
    </li>
  );
};

export default PaginationButton;
