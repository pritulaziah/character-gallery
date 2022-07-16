import React, { ButtonHTMLAttributes } from "react";
import styled from "@emotion/styled/macro";

const ButtonStyled = styled("button")`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s;
  background: #2f80ed;
  border-radius: 8px;
  padding: 14px 24px;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;

  &:hover {
    background: #4d99ff;
  }

  &:focus {
    outline: none;
  }
`;

type ButtonVariant = "primary" | "secondary";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
}

const Button = React.forwardRef<HTMLButtonElement, IProps>(
  ({ children, variant, ...other }, ref) => {
    return (
      <ButtonStyled {...other} ref={ref}>
        {children}
      </ButtonStyled>
    );
  }
);

export default Button;
